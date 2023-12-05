const filas = 10; // Filas del tablero 
const columnas = 10; // Columnas del tablero
const barcos = 5; // Barcos del tablero
let turnoJugador = 1; // Turno del jugador
const tableroJugador1Array = Array.from({ length: filas }, () => Array(columnas).fill(0)); // Tablero del jugador 1
const tableroJugador2Array = Array.from({ length: filas }, () => Array(columnas).fill(0)); // Tablero del jugador 2

const tableroJugador1 = document.getElementById('tablero-jugador-1'); // Tablero del jugador 1
const tableroJugador2 = document.getElementById('tablero-jugador-2'); // Tablero del jugador 2


function disparar(event) // Funcion para disparar 
{
  const fila = parseInt(event.target.dataset.fila); // Obtener la fila de la casilla clickeada 
  const columna = parseInt(event.target.dataset.columna); // Obtener la columna de la casilla clickeada

  let tableroPropio, tableroOponente; // Tablero propio y tablero del oponente let es para declarar variables locales 
  if (event.target.parentElement === tableroJugador1) // Si el tablero clickeado es el tablero del jugador 1 
   {
    tableroPropio = tableroJugador2Array; // Tablero propio es el tablero del jugador 1 
    tableroOponente = tableroJugador1; // Tablero del oponente es el tablero del jugador 2

  } else if (event.target.parentElement === tableroJugador2) // else if es para declarar una condición que se cumple si la condición anterior no se cumple (event.target.parentElement === tableroJugador2) es el tablero del jugador 2
  {
    tableroPropio = tableroJugador1Array; // Tablero propio es el tablero del jugador 2 
    tableroOponente = tableroJugador2; // Tablero del oponente es el tablero del jugador 1
  }

  if (turnoJugador === 1 && tableroPropio === tableroJugador1Array ||  turnoJugador === 2 && tableroPropio === tableroJugador2Array) // Si es el turno del jugador 1 y el tablero propio es el tablero del jugador 1 o si es el turno del jugador 2 y el tablero propio es el tablero del jugador 2
  {
    turnoDelJugador(fila, columna, tableroPropio, tableroOponente); // Funcion para el turno del jugador 
  } else {
    window.alert("No es tu turno. Espera tu oportunidad."); // Mostrar mensaje de alerta 
  }
}

function crearTablero(tablero, esJugador1)  // Funcion para crear el tablero 
{
  const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // Creo una lista de letras para las filas del tablero 

  for (let i = 0; i < filas; i++) // Recorrer las filas del tablero for (let i = 0; i < filas; i++) es un ciclo for que recorre las filas del tablero 
   {
    for (let j = 0; j < columnas; j++) // Recorrer las columnas del tablero for (let j = 0; j < columnas; j++) es un ciclo for que recorre las columnas del tablero
    {
      const casilla = document.createElement('div'); // Esta lineas const casilla = document.createElement('div'); crea un elemento div para cada casilla del tablero  
      casilla.classList.add('casilla'); // Esta linea casilla.classList.add('casilla'); agrega la clase casilla a cada casilla del tablero 
      casilla.dataset.fila = i; // Añadir fila mediante dataset la propiedad dataset permite acceder a los atributos de datos personalizados (data-*) de un elemento para obtener o cambiar su valor por lo que casilla.dataset.fila = i; añade la fila a la casilla
      casilla.dataset.columna = j; // Añadir columna mediante dataset la propiedad dataset permite acceder a los atributos de datos personalizados (data-*) de un elemento para obtener o cambiar su valor por lo que casilla.dataset.columna = j; añade la columna a la casilla
      casilla.dataset.coordenadas = `${letras[i]}${j + 1}`; // Añadir coordenadas mediante dataset la propiedad dataset permite acceder a los atributos de datos personalizados (data-*) de un elemento para obtener o cambiar su valor por lo que casilla.dataset.coordenadas = `${letras[i]}${j + 1}`; añade las coordenadas a la casilla

      casilla.addEventListener('click', disparar); // Agregar evento de disparo a la casilla del tablero para que cuando se haga clic en una casilla se dispare la función disparar 

      tablero.appendChild(casilla); // Agregar la casilla al tablero mediante appendChild la cual es una función para agregar un nodo (un nodo es un elemento del DOM) al final de la lista de hijos de un nodo padre especificado
    }
  }
}

function colocarBarcosEnTablero(tableroArray) // Funcion para colocar los barcos en el tablero 
{
  const tamaniosBarcos = [2, 3, 3, 4, 5]; // Lista de tamaños de barcos disponibles 

  for (let i = 0; i < tamaniosBarcos.length; i++) // Recorrer los tamaños de barcos disponibles para colocarlos en el tablero según la dirección y el tamaño del barco 
  {
    let barcoColocado = false; // Barco colocado 
    const tamanoBarco = tamaniosBarcos[i]; // Tamaño del barco 

    while (!barcoColocado) // Mientras el barco no esté colocado (!barcoColocado) es un ciclo while que se ejecuta mientras el barco no esté colocado
     {
      const fila = Math.floor(Math.random() * filas); // Obtener fila aleatoria 
      const columna = Math.floor(Math.random() * columnas); // Obtener columna aleatoria
      const direccion = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Obtener dirección aleatoria

      if (puedeColocarBarco(tableroArray, fila, columna, direccion, tamanoBarco))  // Si se puede colocar el barco en el tablero (!barcoColocado) es un ciclo while que se ejecuta mientras el barco no esté colocado
      {
        colocarBarco(tableroArray, fila, columna, direccion, tamanoBarco); // Funcion para colocar el barco segun la dirección y el tamaño del barco
        barcoColocado = true; // Barco colocado
      } 
    }
  }
} 

function puedeColocarBarco(tableroArray, fila, columna, direccion, tamano)
 // Funcion para verificar si se puede colocar el barco en el tablero
 {
  if (direccion === 'horizontal') // dirección horizontal 
  {
    if (columna + tamano > columnas) // (columna + tamano > columnas) comprueba si el barco se sale del tablero en horizontal 
    {
      return false; // Si la casilla ya está ocupada, no se puede colocar el barco
    }

    for (let i = columna; i < columna + tamano; i++) // (let i = columna; i < columna + tamano; i++) comprueba si el barco se sale del tablero en horizontal
     {
      if (tableroArray[fila][i] === 1) // tableroArray[fila][i] === 1 comprueba si el barco se sale del tablero en horizontal 
      {
        return false; // Si la casilla ya está ocupada, no se puede colocar el barco
      }
    }
  } else { // dirección vertical
    if (fila + tamano > filas)  // (fila + tamano > filas)  comprueba si el barco se sale del tablero en vertical 
    {
      return false; // Si la casilla ya está ocupada, no se puede colocar el barco
    }

    for (let i = fila; i < fila + tamano; i++) // (let i = fila; i < fila + tamano; i++) comprueba si el barco se sale del tablero en vertical 
    {
      if (tableroArray[i][columna] === 1) // Si la casilla ya está ocupada, no se puede colocar el barco 
       {
        return false; // Si la casilla ya está ocupada, no se puede colocar el barco
      }
    }
  }
  return true; // Si no se cumple ninguna de las condiciones anteriores, se puede colocar el barco
}

function colocarBarco(tableroArray, fila, columna, direccion, tamano) // Funcion para colocar el barco segun la dirección y el tamaño del barco  
{
  if (direccion === 'horizontal')   // dirección horizontal 
  {
    for (let i = columna; i < columna + tamano; i++)  // Recorrer las casillas del barco en horizontal
    {
      tableroArray[fila][i] = 1; // los barcos se colocan en horizontal ya que tableroArray[fila][i] = 1; es la posición en la que se colocan los barcos que es horizontal
    }
  } else { // dirección vertical
    for (let i = fila; i < fila + tamano; i++) // Recorrer las casillas del barco en vertical 
    {
      tableroArray[i][columna] = 1; // los barcos se colocan en vertical ya que tableroArray[i][columna] = 1; es la posición en la que se colocan los barcos que es vertical 
    }
  }
}

function turnoDelJugador(fila, columna, tableroArray, tableroContrincante) // Funcion para el turno del jugador 
{
  if (tableroArray[fila][columna] === 2 || tableroArray[fila][columna] === 3) return; // Si la casilla ya fue disparada, no hacer nada

  let cambioDeTurno = true; // Cambio de turno 
  let mensajeAlerta = ''; // Mensaje de alerta 

  if (tableroArray[fila][columna] === 1) // Si la casilla es un barco, marcar como tocado y hundido o tocado 
  {
    tableroArray[fila][columna] = 2; // Marcar como tocado 

    if (esBarcoHundido(fila, columna, tableroArray)) {
      mensajeAlerta = `¡Tocado y hundido en (${fila},${columna})!`; // Mensaje de tocado y hundido 

      // Verificar si todos los barcos han sido hundidos
      if (todosBarcosHundidos(tableroArray)) {
        mensajeAlerta = `¡Jugador ${turnoJugador} ha ganado!`; // Mostrar mensaje de alerta
        window.alert(mensajeAlerta); // Mostrar mensaje de alerta 
        return; // Terminar el juego 
      }
      cambioDeTurno = false; // Aquí se corrigió para asegurar el cambio de turno cuando se acierta 
    } else {
      mensajeAlerta = `¡Tocado en (${fila},${columna})!`; // esta lo que hace es que cuando se toca un barco, se muestra el mensaje de tocado en la casilla que se toco 
      cambioDeTurno = false; // Aquí se corrigió para asegurar el cambio de turno cuando se acierta 
    }
  } else {
    mensajeAlerta = `¡Agua en (${fila},${columna})!`; // Aquí se corrigió para asegurar el cambio de turno cuando no se acierta 
    cambioDeTurno = true; // Aquí se corrigió para asegurar el cambio de turno cuando no se acierta
    turnoJugador = turnoJugador === 1 ? 2 : 1; // Aquí se corrigió para asegurar el cambio de turno cuando no se acierta 
  }

  actualizarEstiloCasilla(fila, columna, tableroContrincante, tableroArray[fila][columna]); // Actualizar estilo de la casilla del tablero del jugador actual
  window.alert(mensajeAlerta); // Mostrar mensaje de alerta 

  if (cambioDeTurno) {
    cambiarEventosClic(tableroContrincante); // Cambiar eventos de clic en el tablero del jugador actual 
  }
}

function cambiarEventosClic(tablero) // Funcion para cambiar los eventos de clic en el tablero del jugador actual
{
  const casillasTablero = tablero.children; // Obtener las casillas del tablero del jugador actual tablero.children es un arreglo de las casillas del tablero para el jugador actual 
// children es una propiedad de los elementos del DOM (DOM es el documento HTML) que devuelve un arreglo de los elementos hijos del elemento actual
  for (let i = 0; i < casillasTablero.length; i++) // Recorrer las casillas del tablero del jugador actual
  {
    casillasTablero[i].removeEventListener('click', disparar); // Remover evento de disparo al tablero del jugador actual
  }

  for (let i = 0; i < casillasTablero.length; i++) // Recorrer las casillas del tablero del jugador actual 
  {
    casillasTablero[i].addEventListener('click', disparar); // Agregar evento de disparo al tablero del jugador actual 
  }
}

function esBarcoHundido(fila, columna, tableroArray) // Funcion para verificar si el barco está hundido 
{
  const tamanoTablero = filas * columnas; // Tamaño del tablero 
  const visitados = new Array(tamanoTablero).fill(false); // Arreglo de visitados
  const queue = []; // Cola de visitados 

  if (tableroArray[fila][columna] !== 2)  // Si la casilla no es un barco tocado, el barco no está hundido
  {
    return false; // Si la casilla no es un barco tocado, el barco no está hundido
  }

  queue.push({ x: fila, y: columna }); // Agregar a la cola de visitados 
  visitados[fila * columnas + columna] = true; // Marcar como visitado 

  while (queue.length > 0) // Mientras la cola de visitados no esté vacía 
  {
    const { x, y } = queue.shift(); // Obtener la casilla actual 
    const offsets = [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }]; // Arreglo de offsets para recorrer las casillas adyacentes a la casilla actual 

    for (const { dx, dy } of offsets) // Recorrer las casillas adyacentes a la casilla actual 
    {
      const newX = x + dx; // Obtener las coordenadas de la casilla adyacente
      const newY = y + dy; // Obtener las coordenadas de la casilla adyacente 

      if (newX >= 0 && newX < filas && newY >= 0 && newY < columnas && !visitados[newX * columnas + newY]) // Verificar si la casilla está dentro del tablero y no ha sido visitada 
      {
        visitados[newX * columnas + newY] = true; // Marcar como visitado 

        if (tableroArray[newX][newY] === 1) // Si la casilla es un barco, el barco no está hundido 
        {
          return false;
        } else if (tableroArray[newX][newY] === 2) // Si la casilla es un barco tocado, agregar a la cola de visitados 
        {
          queue.push({ x: newX, y: newY }); // Agregar a la cola de visitados 
        }
      }
    }
  }

  return true; // Si no se cumple ninguna de las condiciones anteriores, el barco está hundido 
}

function todosBarcosHundidos(tablero) // Funcion para verificar si todos los barcos han sido hundidos 
{
  return tablero.flat().every(casilla => casilla !== 1); // Verificar si todos los barcos han sido hundidos en el tablero actual
}

function actualizarEstiloCasilla(fila, columna, tablero, estado) 
{
  const casilla = tablero.children[fila * columnas + columna]; // Obtener la casilla  correspondiente a la fila y columna del disparo del jugador actual 
  switch (estado) // Cambiar el color de la casilla según el estado de la casilla 
   {
    case 1: // Barco 
      casilla.style.backgroundColor = 'gray'; // Color del barco
      break;
    case 2: // Tocado 
      casilla.style.backgroundColor = 'red'; // Color tocado
      break;
    case 3: // Tocado y hundido
      casilla.style.backgroundColor = 'black'; // Cambia el color del barco hundido a negro
      break;
    default: // Agua
      casilla.style.backgroundColor = 'blue'; // Color agua
      break;
  }
}
// LLamamos al boton mediante su id para que revele el tablero al pulsarlo 
document.getElementById('btnRevelar').addEventListener('click', function() 
{
  revelarTableros(tableroJugador1Array, tableroJugador1);
  revelarTableros(tableroJugador2Array, tableroJugador2);  
}
); 

function revelarTableros(tableroArray, tableroElement) 
{
  for (let i = 0; i < filas; i++)  
  {
    for (let j = 0; j < columnas; j++) 
    {
      const casilla = tableroElement.children[i * columnas + j]; 
      if (tableroArray[i][j] === 1) 
      { 
        casilla.style.backgroundColor = 'gray'; // Cambiar el color para revelar los barcos
      }
    }
  }
}

crearTablero(tableroJugador1, true);  
crearTablero(tableroJugador2, false); 

colocarBarcosEnTablero(tableroJugador1Array);
colocarBarcosEnTablero(tableroJugador2Array);



