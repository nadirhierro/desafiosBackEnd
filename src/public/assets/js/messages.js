let formChat = document.getElementById("messages");

// Llamado a normalizr y schemas
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity(
  "messages",
  { author: authorSchema },
  { idAttribute: "id" }
);
const posts = new schema.Entity("posts", {
  messages: [messageSchema],
});

// template para chat
let templateChat = `
    {{#each messages}}
    <div class="message">
    <b>{{this.author.alias}}</b> <span class="time">{{this.timestamp}} :</span> <span class="mensaje">{{this.message}}</span> </br></div>
    {{/each}}
`;

// Listener para el form
formChat.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = event.target[0].value;
  let alias = event.target[1].value;
  let name = event.target[2].value;
  let surname = event.target[3].value;
  let age = event.target[4].value;
  let avatar = event.target[5].value;
  let message = event.target[6].value;

  let data = {
    author: {
      email: email,
      alias: alias,
      name: name,
      surname: surname,
      age: age,
      avatar: avatar,
    },
    message: message,
  };

  if (
    data.author.id == "" ||
    data.author.alias == "" ||
    data.author.name == "" ||
    data.author.surname == "" ||
    data.author.age == "" ||
    data.author.avatar == "" ||
    data.message == "" ||
    !data.author.email.includes("@")
  ) {
    window.location.reload();
  } else {
    socket.emit("chat", data);
  }
});

socket.on("chat", (data) => {
  fetch("http://localhost:8080/mensajes")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // Desnormalizar
      const denormalizedJson = denormalize(json.result, posts, json.entities);

      // Tamaños
      let denormalizedSize = JSON.stringify(denormalizedJson).length;
      let normalizedSize = JSON.stringify(json).length;

      // Cálculo de porcentaje
      let percentage = (
        100 -
        (normalizedSize * 100) / denormalizedSize
      ).toFixed(2);

      // Template e inserción en html
      const template = Handlebars.compile(templateChat);
      const html = template({
        messages: denormalizedJson.messages,
      });
      document.getElementById("mensajes").innerHTML = html;
      document.getElementById(
        "percentage"
      ).innerHTML = `Porcentaje de compresión: ${percentage}%`;
    })
    .catch((err) => {
      console.log(err);
    });
});
