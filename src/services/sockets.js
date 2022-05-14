import { Server } from "socket.io";
import fetch from "node-fetch";

let io;

const initSocket = (server) => {
  io = new Server(server);

  // inicialización del server socket
  io.on("connection", (socket) => {
    // cada vez que alguien se conecta, el servidor emite señal en el canal productos
    // y en el canal chat
    // para que al cliente directamente le aparezcan los productos
    // al conectarse por primera vez
    socket.emit("products", "actualizar");
    socket.emit("chat", "actualizar");
    // Aquí escucho el canal products, cuando un cliente emite, recibe el producto
    // el servidor se encarga de hacer el post a través del fetch utilizando el router
    socket.on("products", (data) => {
      fetch("https://eccomerce-coder.herokuapp.com/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          // Una vez se realiza el post, se emite el mensaje de respuesta
          // así se les actualiza la vista a los clientes
          io.sockets.emit("products", res);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    //Misma lógica para los mensajes
    socket.on("chat", (data) => {
      fetch("https://eccomerce-coder.herokuapp.com/mensajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          // Una vez se realiza el post, se emite el mensaje de respuesta
          // así se les actualiza la vista a los clientes
          io.sockets.emit("chat", res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  return io;
};

const getSocket = () => {
  return io;
};

export { initSocket, getSocket };
