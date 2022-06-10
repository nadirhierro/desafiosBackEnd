import * as fs from "node:fs";

// Clase fileContainer
export default class fileContainer {
  constructor(fileName) {
    this.fileName = fileName;
  }

  // Función escribir archivo
  async write(data) {
    try {
      return await fs.promises.writeFile(
        `${this.fileName}`,
        `${JSON.stringify(data, null, 2)}`
      );
    } catch (err) {
      return err;
    }
  }

  // Obtener toda la data
  async getAll() {
    try {
      let data = await fs.promises.readFile(`${this.fileName}`, "utf-8");
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (err) {
      return err;
    }
  }

  // Guardar nueva data
  async save(obj) {
    try {
      let data = await this.getAll();
      let id = 1;
      if (data.length > 0) {
        let ids = data.map((item) => item._id);
        id = Math.max.apply(null, ids) + 1;
      }
      let newObject = {
        _id: id,
        ...obj,
      };
      data.push(newObject);
      await this.write(data);
      return id;
    } catch (err) {
      return err;
    }
  }

  // Cambiar un elemento
  async change(obj) {
    try {
      let data = await this.getAll();
      let objInData = data.find((item) => item._id == obj._id);
      if (objInData) {
        let newObject = {
          ...obj,
        };
        data.splice(data.indexOf(objInData), 1, newObject);
        await this.write(data);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  }

  // Obtener por id
  async getById(id) {
    try {
      let data = await this.getAll();
      let element = data.find((item) => item._id == id);
      return element;
    } catch (err) {
      return err;
    }
  }

  // Eliminar elemento por id
  async deleteById(id) {
    try {
      let data = await this.getAll();
      if (data.find((item) => item._id == id)) {
        let newData = data.filter((data) => data._id != id);
        await this.write(newData);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  }

  // Eliminar todo
  async deleteAll() {
    try {
      await this.write([]);
      console.log(`Todos los productos fueron borrados`);
    } catch (err) {
      return err;
    }
  }
}
