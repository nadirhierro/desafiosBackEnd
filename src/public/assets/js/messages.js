let formChat = document.getElementById("messages");

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
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      mutation {
        createMessage(data: {
          author: {
            email: "${email}",
            alias: "${alias}",
            name: "${name}",
            surname: "${surname}",
            age: ${age},
            avatar: "${avatar}"
          },
          message: "${message}"
        }){id}
      }
      `,
      }),
    })
      .then((res) => {
        // Una vez se realiza el post, se emite el mensaje de respuesta
        // así se les actualiza la vista a los clientes
        socket.emit("chat", "actualizar");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

socket.on("chat", (data) => {
  fetch(
    "http://localhost:8080/graphql?query=query{getMessages{id,timestamp,author{email,alias,name,surname,age,avatar},message}}"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json.data.getMessages);
      const template = Handlebars.compile(templateChat);
      const html = template({
        messages: json.data.getMessages,
      });
      document.getElementById("mensajes").innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
});
