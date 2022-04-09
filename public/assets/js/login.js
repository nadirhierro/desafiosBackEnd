let loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = event.target[0].value;
  if (name == "") {
    window.location.reload();
  } else {
    window.location.replace(`http://localhost:8080/login?name=${name}`);
  }
});
