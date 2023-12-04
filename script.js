const filas = 10;
const columnas = 10;
const barcos = 5;
let turnoJugador = 1;
const tableroJugador1Array = Array.from({ length: filas }, () => Array(columnas).fill(0));
const tableroJugador2Array = Array.from({ length: filas }, () => Array(columnas).fill(0));

const tableroJugador1 = document.getElementById('tablero-jugador-1');
const tableroJugador2 = document.getElementById('tablero-jugador-2');

function crearTablero(tablero, esJugador1) {
  const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const casilla = document.createElement('div');
      casilla.classList.add('casilla');
      casilla.dataset.fila = i;
      casilla.dataset.columna = j;
      casilla.dataset.coordenadas = `${letras[i]}${j + 1}`; // Añadir coordenadas

      if (esJugador1) {
        casilla.addEventListener('click', function() {
          const fila = parseInt(this.dataset.fila);
          const columna = parseInt(this.dataset.columna);
          turnoDelJugador(fila, columna, tableroJugador1Array, tableroJugador2);
        });
      } else {
        casilla.addEventListener('click', function() {
          const fila = parseInt(this.dataset.fila);
          const columna = parseInt(this.dataset.columna);
          turnoDelJugador(fila, columna, tableroJugador2Array, tableroJugador1);
        });
      }

      tablero.appendChild(casilla);
    }
  }
}

function colocarBarcosEnTablero(tableroArray) {
  let barcosColocados = 0;
  while (barcosColocados < barcos) {
    const fila = Math.floor(Math.random() * filas);
    const columna = Math.floor(Math.random() * columnas);
    if (tableroArray[fila][columna] !== 1) {
      tableroArray[fila][columna] = 1;
      barcosColocados++;
    }
  }
}

function turnoDelJugador(fila, columna, tableroArray, tableroContrincante) {
  if (tableroArray[fila][columna] === 2 || tableroArray[fila][columna] === 3) return;

  const casilla = tableroContrincante.children[fila * columnas + columna];

  if (tableroArray[fila][columna] === 1) {
    casilla.style.backgroundColor = 'red';
    tableroArray[fila][columna] = 2;
    if (todosBarcosHundidos(tableroArray)) {
      alert(`¡Jugador ${turnoJugador} ha ganado!`);
      return;
    }
  } else {
    casilla.style.backgroundColor = 'blue';
  }

  turnoJugador = turnoJugador === 1 ? 2 : 1;
}

function todosBarcosHundidos(tablero) {
  return tablero.flat().every(casilla => casilla !== 1);
}

crearTablero(tableroJugador1, true);
crearTablero(tableroJugador2, false);

colocarBarcosEnTablero(tableroJugador1Array);
colocarBarcosEnTablero(tableroJugador2Array);
