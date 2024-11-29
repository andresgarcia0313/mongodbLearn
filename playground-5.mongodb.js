// Clase para manejar las operaciones de la colección 'amigos'
class Collection {
  constructor(db, collectionName) {
      this.collection = db[collectionName]; // Accedemos directamente a la colección usando db[collectionName]
  }

  // Método para insertar datos en la colección
  save(data) {
      try {
          this.collection.insertMany(data); // Ahora insertamos correctamente en la colección
          console.log("Datos insertados correctamente.");
      } catch (error) {
          console.log(`Error al insertar los datos: ${error.message}`);
      }
  }

  // Método para obtener estadísticas de la colección
  getCollectionStats() {
      return this.collection.stats();
  }

  // Método para formatear tamaños de bytes a unidades legibles
  formatSize(sizeInBytes) {
      if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
      else if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
      else if (sizeInBytes < 1024 * 1024 * 1024) return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
      else return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  // Método para imprimir estadísticas de la colección de una forma legible
  printCollectionStats() {
      const stats = this.getCollectionStats();
      const statsInfo = {
          "Número de documentos": stats.count,
          "Tamaño total de los datos": this.formatSize(stats.size),
          "Tamaño de almacenamiento ocupado": this.formatSize(stats.storageSize),
          "Tamaño promedio de documento": this.formatSize(stats.avgObjSize),
          "Número de índices": stats.nindexes,
          "Fecha de creación": stats.created ? new Date(stats.created).toISOString() : "Fecha no disponible"
      };

      // Imprimimos en consola para la terminal de VSCode
      console.log(`\nInformación sobre la colección 'amigos':`);
      console.log(`------------------------------------------------`);
      for (const [key, value] of Object.entries(statsInfo)) {
          console.log(`${key}: ${value}`);
      }

      // Retornamos el objeto de estadísticas para mostrarlo en el Playground Result
      return statsInfo;
  }
}

// Función que crea una colección de ejemplo con datos ficticios
function createSampleData() {
  return [
      { name: "Carlos", age: 25, city: "Bogotá" },
      { name: "Ana", age: 30, city: "Medellín" },
      { name: "Pedro", age: 22, city: "Cali" },
      { name: "Laura", age: 28, city: "Barranquilla" },
      { name: "Sofía", age: 24, city: "Bucaramanga" }
  ];
}

// Verificar si la colección 'amigos' existe. Si no, crearla.
if (!db.amigos) {
  db.createCollection('amigos');
}

// Instanciamos la clase y trabajamos con la colección
const col = new Collection(db, 'amigos');

// Insertar datos de ejemplo en la colección
const sampleData = createSampleData();
col.save(sampleData);


// Esperar un momento para asegurarnos de que los datos están insertados
// Luego, obtenemos y mostramos las estadísticas de la colección
const stats = col.printCollectionStats();

// Mostramos las estadísticas en el Playground Result
stats
