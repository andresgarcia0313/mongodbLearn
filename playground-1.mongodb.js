use("database");
db.curso.insertOne({
  nombre: "Greta",
  edad: 23,
  pasatiempos: ["leer", "nadar", "bailar"],
  nacionalidad: "Mexicana",
});
/*
Se muestra:
{
  "acknowledged": true,
  "insertedId": {
    "$oid": "6744d918f313d12371f1ee3a"
  }
}
*/
db.curso.insertOne({
  nombre: "Miguel",
  edad: 33,
  pasatiempos: ["leer", "nadar"],
  nacionalidad: "Peruana",
});
/*
Se muestra:
{
    acknowledged: true,
    insertedId: ObjectId("63eacf280b7fe370554a13a7")
}
*/

db.curso.find();

db.curso.deleteOne({ nacionalidad: "Peruana" });
//Se muestra: { acknowledged: true, deletedCount: 1 }
db.curso.update({}, { $set: { edad: 24 } });
//Se muestra:  DeprecationWarning: Collection.update()
// is deprecated. Use updateOne, updateMany, or bulkWrite.


db.personas.insertMany([
  { nombre: "Jesús", edad: 30 },
  { nombre: "Juan", edad: 50 },
  { nombre: "María", edad: 25 },
]);
