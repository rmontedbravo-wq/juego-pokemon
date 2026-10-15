// app.js
let currentPokemonName = "";
let score = 0;

async function getRandomPokemon() {
  // 1. Generar ID aleatorio entre 1 y 151 (Primera generación)
  const randomId = Math.floor(Math.random() * 151) + 1;
  
  // 2. Hacer la petición a PokéAPI
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();

  // 3. Guardar nombre y actualizar la imagen en el DOM
  currentPokemonName = data.name.toLowerCase();
  
  const imgElement = document.getElementById('pokemon-img');
  imgElement.src = data.sprites.front_default;
  imgElement.classList.add('silhouette'); // Asegura que empiece como silueta
}

// Cargar el primer Pokémon al iniciar
getRandomPokemon();

//////ingreso el codigo 4
document.getElementById('submit-btn').addEventListener('click', checkGuess);


function checkGuess() {
  const userInput = document.getElementById('guess-input').value.toLowerCase().trim();
  const messageElement = document.getElementById('message');
  const imgElement = document.getElementById('pokemon-img');

  if (userInput === currentPokemonName) {
    messageElement.textContent = `¡Correcto! Es ${currentPokemonName.toUpperCase()}`;
    imgElement.classList.remove('silhouette'); // Revela al Pokémon
    score++;
    document.getElementById('score').textContent = score;

    // Cargar el siguiente Pokémon después de 2 segundos
    setTimeout(() => {
      document.getElementById('guess-input').value = "";
      messageElement.textContent = "";
      getRandomPokemon();
    }, 2000);
  } else {
    messageElement.textContent = "¡Incorrecto! Intenta de nuevo.";
  }
}
// Escuchar clic en "Adivinar"
document.getElementById('submit-btn').addEventListener('click', checkGuess);

// Escuchar la tecla "Enter"
document.getElementById('guess-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

// Escuchar clic en el botón "Siguiente"
document.getElementById('skip-btn').addEventListener('click', function() {
  document.getElementById('guess-input').value = "";
  document.getElementById('message').textContent = "";
  getRandomPokemon();
});

// Cargar el primer Pokémon
getRandomPokemon();