#!/bin/bash

# Script para configurar un cluster Sharded en MongoDB.
# Responsabilidad: Configurar entorno de servidores, config server, y shards.

# VARIABLES DE CONFIGURACIÓN
CONFIG_DB_PATH="/data/configdb"  # Ruta para los datos del Config Server.
SHARD1_PORT=27018               # Puerto para el Shard 1.
SHARD1_PATH="/data/shard1"      # Ruta para los datos del Shard 1.
SHARD2_PORT=27020               # Puerto para el Shard 2.
SHARD2_PATH="/data/shard2"      # Ruta para los datos del Shard 2.
CONFIG_PORT=27019               # Puerto para el Config Server.
MONGOS_PORT=27017               # Puerto para el Router (mongos).

# PASO 1: Crear las carpetas necesarias
echo "Creando carpetas de datos..."
mkdir -p $CONFIG_DB_PATH $SHARD1_PATH $SHARD2_PATH

# PASO 2: Iniciar el Config Server
echo "Iniciando Config Server..."
mongod --configsvr --replSet configReplSet --port $CONFIG_PORT --dbpath $CONFIG_DB_PATH --fork --logpath $CONFIG_DB_PATH/mongod.log

# PASO 3: Configurar el Replica Set para el Config Server
echo "Configurando el Replica Set para el Config Server..."
mongosh --port $CONFIG_PORT <<EOF
rs.initiate({
    _id: "configReplSet",
    configsvr: true,
    members: [{ _id: 0, host: "localhost:$CONFIG_PORT" }]
});
EOF

# PASO 4: Iniciar los Shards
echo "Iniciando Shard 1..."
mongod --shardsvr --replSet shardReplSet1 --port $SHARD1_PORT --dbpath $SHARD1_PATH --fork --logpath $SHARD1_PATH/mongod.log
echo "Iniciando Shard 2..."
mongod --shardsvr --replSet shardReplSet2 --port $SHARD2_PORT --dbpath $SHARD2_PATH --fork --logpath $SHARD2_PATH/mongod.log

# PASO 5: Configurar Replica Set para los Shards
echo "Configurando Replica Sets para los Shards..."
mongosh --port $SHARD1_PORT <<EOF
rs.initiate({
    _id: "shardReplSet1",
    members: [{ _id: 0, host: "localhost:$SHARD1_PORT" }]
});
EOF
mongosh --port $SHARD2_PORT <<EOF
rs.initiate({
    _id: "shardReplSet2",
    members: [{ _id: 0, host: "localhost:$SHARD2_PORT" }]
});
EOF

# PASO 6: Iniciar el Router Mongos
echo "Iniciando Mongos Router..."
mongos --configdb configReplSet/localhost:$CONFIG_PORT --port $MONGOS_PORT --fork --logpath /data/mongos.log

# PASO 7: Agregar Shards al Cluster
echo "Agregando Shards al Cluster..."
mongosh --port $MONGOS_PORT <<EOF
sh.addShard("shardReplSet1/localhost:$SHARD1_PORT");
sh.addShard("shardReplSet2/localhost:$SHARD2_PORT");
EOF

# MENSAJE FINAL
echo "Cluster configurado con éxito. Puedes conectarte al Mongos Router en el puerto $MONGOS_PORT."
