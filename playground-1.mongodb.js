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

/* // Select the database to use.
use('mongodbVSCodePlaygroundDB');

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
/*
[
  ({
    _id: ObjectId("63eacf0c0b7fe370554a13a6"),
    nombre: "Greta",
    edad: 23,
    pasatiempos: ["leer", "nadar", "bailar"],
    nacionalidad: "Mexicana",
  },
  {
    _id: ObjectId("63eacf280b7fe370554a13a7"),
    nombre: "Miguel",
    edad: 33,
    pasatiempos: ["leer", "nadar"],
    nacionalidad: "Peruana",
  })
];
*/
db.curso.deleteOne({ nacionalidad: "Peruana" });
//Se muestra: { acknowledged: true, deletedCount: 1 }
db.curso.update({}, { $set: { edad: 24 } });
//Se muestra:  DeprecationWarning: Collection.update()
// is deprecated. Use updateOne, updateMany, or bulkWrite.
/*
{
    acknowledged: true,
    insertedId: null,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0
}
*/

db.personas.insertMany([
  { nombre: "Jesús", edad: 30 },
  { nombre: "Juan", edad: 50 },
  { nombre: "María", edad: 25 },
]);
