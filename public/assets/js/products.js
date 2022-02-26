let formProducts = document.getElementById("products");

// template de lista

let lista = `
{{#if products}}
<div class="col-4">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Foto</th>
      </tr>
    </thead>
    <tbody>
      {{#each products}}
        <tr>
          <th scope="row">{{this.title}}</th>
          <td>{{this.price}}</td>
          <td><img
              src="{{this.thumbnail}}"
              alt="{{this.title}} foto"
              class="img-fluid"
              style="width: 50px; height: 50px"
            /></td>
        </tr>
      {{/each}}
    </tbody>
  </table>
</div>
{{else}}
<div class="col-2 alert alert-dark mt-5" role="alert">
  No hay productos!
</div>
{{/if}}
`;

// eventListener para emitir el producto por el socket
formProducts.addEventListener("submit", (event) => {
  event.preventDefault();
  let title = event.target[0].value;
  let price = event.target[1].value;
  let thumbnail = event.target[2].value;

  let product = {
    title: title,
    price: Number(price),
    thumbnail: thumbnail,
  };
  socket.emit("products", product);
});

// Socket on escuchando la señal de que se actualizaron los productos, renderiza nuevamente
socket.on("products", (data) => {
  fetch("http://localhost:8080/productos")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const template = Handlebars.compile(lista);
      const html = template({ products: json });
      document.getElementById("lista").innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
});
