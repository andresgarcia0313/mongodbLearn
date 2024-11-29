// Script para configurar el sharding en MongoDB.
// Responsabilidad: Configurar el sharding en la base de datos, habilitar sharding y distribuir datos.

// PASO 1: Habilitar el Sharding para una base de datos
sh.enableSharding("miBaseDeDatos");  // Habilita sharding para la base de datos 'miBaseDeDatos'

// PASO 2: Crear índice en el campo _id para usar como clave shard
// usamos _id como clave shard predeterminada
db.miBaseDeDatos.miColeccion.createIndex({ _id: 1 });  // Creamos un índice en _id

// PASO 3: Configurar la colección para sharding usando _id como clave shard
sh.shardCollection("miBaseDeDatos.miColeccion", { _id: 1 }); // Configura la colección para sharding

// PASO 4: Insertar documentos de prueba
db.miBaseDeDatos.miColeccion.insertMany([
    { _id: 1, nombre: "Cliente A" },
    { _id: 2, nombre: "Cliente B" },
    { _id: 3, nombre: "Cliente C" },
    { _id: 4, nombre: "Cliente D" }
]);

// PASO 5: Verificar el estado del Cluster
sh.status();  // Muestra cómo se distribuyen los datos entre los shards
