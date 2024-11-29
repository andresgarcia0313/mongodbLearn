# Script para configurar un cluster Sharded en MongoDB.
# Responsabilidad: Configurar entorno de servidores, config server, y shards.

# VARIABLES DE CONFIGURACIÓN
$CONFIG_DB_PATH = "/data/configdb" # Ruta para los datos del Config Server.
$SHARD1_PORT = 27018               # Puerto para el Shard 1.
$SHARD1_PATH = "/data/shard1"      # Ruta para los datos del Shard 1.
$SHARD2_PORT = 27020               # Puerto para el Shard 2.
$SHARD2_PATH = "/data/shard2"      # Ruta para los datos del Shard 2.
$CONFIG_PORT = 27019               # Puerto para el Config Server.
$MONGOS_PORT = 27017               # Puerto para el Router (mongos).

# PASO 1: Crear las carpetas necesarias
Write-Host "Creando carpetas de datos..."
New-Item -ItemType Directory -Force -Path $CONFIG_DB_PATH, $SHARD1_PATH, $SHARD2_PATH

# PASO 2: Iniciar el Config Server
Write-Host "Iniciando Config Server..."
Start-Process -NoNewWindow -FilePath "mongod" -ArgumentList "--configsvr --replSet configReplSet --port $CONFIG_PORT --dbpath $CONFIG_DB_PATH --fork --logpath $CONFIG_DB_PATH/mongod.log"

# PASO 3: Configurar el Replica Set para el Config Server
Write-Host "Configurando el Replica Set para el Config Server..."
$initConfig = @"
rs.initiate({
    _id: "configReplSet",
    configsvr: true,
    members: [{ _id: 0, host: "localhost:$CONFIG_PORT" }]
});
"@
echo $initConfig | mongosh --port $CONFIG_PORT

# PASO 4: Iniciar los Shards
Write-Host "Iniciando Shard 1..."
Start-Process -NoNewWindow -FilePath "mongod" -ArgumentList "--shardsvr --replSet shardReplSet1 --port $SHARD1_PORT --dbpath $SHARD1_PATH --fork --logpath $SHARD1_PATH/mongod.log"
Write-Host "Iniciando Shard 2..."
Start-Process -NoNewWindow -FilePath "mongod" -ArgumentList "--shardsvr --replSet shardReplSet2 --port $SHARD2_PORT --dbpath $SHARD2_PATH --fork --logpath $SHARD2_PATH/mongod.log"

# PASO 5: Configurar Replica Set para los Shards
Write-Host "Configurando Replica Sets para los Shards..."
$initShard1 = @"
rs.initiate({
    _id: "shardReplSet1",
    members: [{ _id: 0, host: "localhost:$SHARD1_PORT" }]
});
"@
echo $initShard1 | mongosh --port $SHARD1_PORT

$initShard2 = @"
rs.initiate({
    _id: "shardReplSet2",
    members: [{ _id: 0, host: "localhost:$SHARD2_PORT" }]
});
"@
echo $initShard2 | mongosh --port $SHARD2_PORT

# PASO 6: Iniciar el Router Mongos
Write-Host "Iniciando Mongos Router..."
Start-Process -NoNewWindow -FilePath "mongos" -ArgumentList "--configdb configReplSet/localhost:$CONFIG_PORT --port $MONGOS_PORT --fork --logpath /data/mongos.log"

# PASO 7: Agregar Shards al Cluster
Write-Host "Agregando Shards al Cluster..."
$addShards = @"
sh.addShard("shardReplSet1/localhost:$SHARD1_PORT");
sh.addShard("shardReplSet2/localhost:$SHARD2_PORT");
"@
echo $addShards | mongosh --port $MONGOS_PORT

# MENSAJE FINAL
Write-Host "Cluster configurado con éxito. Puedes conectarte al Mongos Router en el puerto $MONGOS_PORT."
