let formChat = document.getElementById("messages");

// template para chat
let templateChat = `
    {{#each messages}}
    <b>{{this.email}}</b> <span class="time">{{this.time}} :</span> <span class="mensaje">{{this.message}}</span> </br>
    {{/each}}
`;

formChat.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = event.target[0].value;
  let message = event.target[1].value;

  let data = {
    email: email,
    message: message,
  };

  if (data.email == "" || !data.email.includes("@")) {
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
      const template = Handlebars.compile(templateChat);
      const html = template({ messages: json });
      document.getElementById("mensajes").innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
});
