import { Server } from "socket.io";

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
      io.sockets.emit("products", "actualizar");
    });

    //Misma lógica para los mensajes
    socket.on("chat", (data) => {
      io.sockets.emit("chat", "actualizar");
    });
  });

  return io;
};

const getSocket = () => {
  return io;
};

export { initSocket, getSocket };
