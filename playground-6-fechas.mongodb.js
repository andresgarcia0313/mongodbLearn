// 1. Crear la colección 'eventos' si no existe
if (!db.eventos) {
  db.createCollection("eventos");
}

// 2. Insertar documentos con fechas en formato ISO 8601
db.eventos.insertMany([
  {
    nombre: "Conferencia MongoDB",
    fecha: ISODate("2024-11-26T12:30:00Z"),
  },
  {
    nombre: "Workshop de Node.js",
    fecha: ISODate("2024-12-05T09:00:00Z"),
  },
  {
    nombre: "Seminario sobre bases de datos",
    fecha: ISODate("2024-12-10T14:00:00Z"),
  },
]);

// 3. Consultar documentos que ocurran después de una fecha específica
let eventosFuturos = db.eventos
  .find({
    fecha: { $gt: ISODate("2024-11-01T00:00:00Z") },
  })
  .toArray();

// 4. Mostrar los eventos futuros
print("Eventos futuros:");
eventosFuturos.forEach((evento) => {
  print(`Nombre: ${evento.nombre}, Fecha: ${evento.fecha.toISOString()}`);
});

// 5. Actualizar la fecha de un evento específico
db.eventos.updateOne(
  { nombre: "Conferencia MongoDB" },
  { $set: { fecha: ISODate("2024-11-27T16:00:00Z") } }
);

// 6. Consultar y mostrar el evento actualizado
let eventoActualizado = db.eventos
  .find({ nombre: "Conferencia MongoDB" })
  .toArray();
print("Evento actualizado:");
eventoActualizado.forEach((evento) => {
  print(`Nombre: ${evento.nombre}, Fecha: ${evento.fecha.toISOString()}`);
});
