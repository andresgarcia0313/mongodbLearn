//Ctrl Alt-r ejecutar seleccionado
//Ctrl Alt-s ejecutar seleccionado
use("Inventario")
db.coleccion.insertMany([
  { _id: 1, nombre: 'Nombre1', edad: 10 },
  { _id: 2, nombre: 'Nombre2', edad: 11 },
  { _id: 3, nombre: 'Nombre3', edad: 12 },
  { _id: 4, nombre: 'Nombre4', edad: 13 },
  { _id: 5, nombre: 'Nombre5', edad: 14 },
  { _id: 6, nombre: 'Nombre6', edad: 15 },
  { _id: 7, nombre: 'Nombre7', edad: 16 },
  { _id: 8, nombre: 'Nombre8', edad: 17 },
  { _id: 9, nombre: 'Nombre9', edad: 18 },
  { _id: 10, nombre: 'Nombre10', edad: 19 },
  { _id: 11, nombre: 'Nombre11', edad: 20 },
  { _id: 12, nombre: 'Nombre12', edad: 21 },
  { _id: 13, nombre: 'Nombre13', edad: 22 },
  { _id: 14, nombre: 'Nombre14', edad: 23 },
  { _id: 15, nombre: 'Nombre15', edad: 24 },
  { _id: 16, nombre: 'Nombre16', edad: 25 },
  { _id: 17, nombre: 'Nombre17', edad: 26 },
  { _id: 18, nombre: 'Nombre18', edad: 27 },
  { _id: 19, nombre: 'Nombre19', edad: 28 },
  { _id: 20, nombre: 'Nombre20', edad: 29 }
])
db.coleccion.insertMany([
  { _id: 21, nombre: 'Nombre21', edad: 30 },
  { _id: 22, nombre: 'Nombre22', edad: 31 },
  { _id: 23, nombre: 'Nombre23', edad: 32 },
  { _id: 24, nombre: 'Nombre24', edad: 33 },
  { _id: 25, nombre: 'Nombre25', edad: 34 },
  { _id: 26, nombre: 'Nombre26', edad: 35 },
  { _id: 27, nombre: 'Nombre27', edad: 36 },
  { _id: 28, nombre: 'Nombre28', edad: 37 },
  { _id: 29, nombre: 'Nombre29', edad: 38 },
  { _id: 30, nombre: 'Nombre30', edad: 39 }
])
db.coleccion.find()

// Limitar el número de documentos retornados a 5
db.coleccion.find().limit(5)

// Saltar los primeros 10 documentos y retornar los siguientes
db.coleccion.find().skip(10)

// Saltar los primeros 5 documentos y limitar el resultado a 5 documentos

db.coleccion.find().skip(5).limit(5)
use("Inventario")
// Convertir el cursor a un array
var resultArray = db.coleccion.find().toArray()

// Iterar sobre cada documento en la colección
db.coleccion.find().forEach(i => print(i.nombre))

// Iterar sobre cada documento en la colección haciendo un mapeado de datos
db.coleccion.find({}, { nombre: 1, _id: 0 }).map(doc => doc.nombre)

// Iterar sobre cada documento en la colección
db.coleccion.find().forEach(doc => {
    print(doc.nombre)
})

// Retornar los documentos en un formato legible
db.coleccion.find().pretty()


/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
/* use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]); */


