import memoryContainer from "../../memoryContainer.js";

// Instancia empieza en null
let instance = null;

// Clase messagesMemory extensión de memoryContainer
export default class messagesDaoMemory extends memoryContainer {
  constructor() {
    super();
    this.container = { id: "messages", messages: [] }; // Defino estructura del container para mensajes
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new messagesDaoMemory();
    }
    return instance;
  }

  // Método para guardar mensaje conservando estructura necesaria del conteiner
  save(obj) {
    let object = this.getAll();
    let data = object.messages;
    let id = 1;
    if (data.length > 0) {
      let ids = data.map((item) => item.id);
      id = Math.max.apply(null, ids) + 1;
    }
    let newObject = {
      id: id,
      timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
      ...obj,
    };
    this.container.messages.push(newObject);
    return id;
  }
}
