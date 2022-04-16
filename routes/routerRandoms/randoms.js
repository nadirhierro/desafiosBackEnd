// Función para obtener random
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Función para calcular cuántas veces cada número random entre 1 y 1000
function calcRandoms(cant) {
  let randoms = [];
  for (let i = 0; i < cant; i++) {
    let number = getRandomArbitrary(1, 1001);
    if (randoms.find((random) => random.number == number)) {
      let index = randoms.indexOf(
        randoms.find((random) => random.number == number)
      );
      randoms[index].quantity += 1;
    } else {
      randoms.push({ number: number, quantity: 1 });
    }
  }
  return randoms;
}

// Escucha de solicitud de cálculo y su envío
process.on("message", (cant) => {
  process.send(calcRandoms(Number(cant)));
  process.exit();
});
