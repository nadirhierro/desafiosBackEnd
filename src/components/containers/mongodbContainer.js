// Clase mongodbContainer
export default class mongodbContainer {
  // Constructor para definir el model
  constructor(model) {
    this.model = model;
  }

  // Obtener todos los elementos de la colección
  async getAll() {
    try {
      let all = await this.model.find({});
      return all;
    } catch (err) {
      console.log(err);
    }
  }

  // Guardar elemento en colección
  async save(obj) {
    try {
      let objModel = new this.model(obj);
      let saveObj = await objModel.save();
      return saveObj;
    } catch (err) {
      console.log(err);
    }
  }

  // Cambiar elemento de colección
  async change(obj) {
    try {
      const res = await this.model.updateOne({ _id: obj.id }, obj);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  // Obtener elemento de colección por id
  async getById(id) {
    try {
      let element = await this.model.find({ _id: id });
      return element[0];
    } catch (err) {
      console.log(err);
    }
  }

  // Eliminar elemento de colección por id
  async deleteById(id) {
    try {
      let deletedElement = await this.model.deleteOne({ _id: id });
      return id;
    } catch (err) {
      console.log(err);
    }
  }

  // Eliminar todos los elementos de la colección
  async deleteAll() {
    try {
      let deletedElement = await this.model.remove({});
      return deletedElement;
    } catch (err) {
      console.log(err);
    }
  }
}
