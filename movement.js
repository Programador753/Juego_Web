// Description: Este archivo contiene el codigo para el movimiento del personaje principal del juego 
document.addEventListener('keydown', function(event) //Funcion para mover el personaje con las flechas del teclado (arriba, abajo, izquierda, derecha) 
{
    var character = document.getElementById('personaje'); //Se obtiene el personaje por su id (personaje)  y se guarda en la variable character 
    var speed = 100; //Se define la velocidad del personaje en 100 pixeles por segundo 
    var key = event.key; //Se obtiene la tecla presionada y se guarda en la variable key 

    var top = parseInt(window.getComputedStyle(character).getPropertyValue('top')); //Se obtiene la posicion del personaje en el eje y y se guarda en la variable top
    var left = parseInt(window.getComputedStyle(character).getPropertyValue('left')); //Se obtiene la posicion del personaje en el eje x y se guarda en la variable left 

    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //Se obtiene el ancho de la ventana y se guarda en la variable windowWidth 
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //Se obtiene el alto de la ventana y se guarda en la variable windowHeight 

    switch (key)  //Se crea un switch para las teclas de movimiento del personaje
    {
        case 'ArrowUp': //Si se presiona la tecla de flecha hacia arriba 
            if (top - speed >= 0) //Si la posicion del personaje en el eje Y menos la velocidad es mayor o igual a 0
            {
                character.style.top = (top - speed) + "px"; //Se le resta la velocidad a la posicion del personaje en el eje Y. Se le agrega pixeles 
            }
            break; //Se termina el caso 
        case 'ArrowDown': //Si se presiona la tecla de flecha hacia abajo 
            if (top + speed <= windowHeight - character.offsetHeight) //Si la posicion del personaje en el eje Y mas la velocidad es menor o igual al alto de la ventana menos el alto del personaje
            {
                character.style.top = (top + speed) + "px"; //Se le suma la velocidad a la posicion del personaje en el eje Y. Se le agrega pixeles
            }
            break; //Se termina el caso 
        case 'ArrowLeft': //Si se presiona la tecla de flecha hacia la izquierda 
            if (left - speed >= 0) //Si la posicion del personaje en el eje X menos la velocidad es mayor o igual a 0
            {
                character.style.left = (left - speed) + "px"; //Se le resta la velocidad a la posicion del personaje en el eje X y se le agrega pixeles
            }
            break; //Se termina el caso
        case 'ArrowRight': //Si se presiona la tecla de flecha hacia la derecha
            if (left + speed <= windowWidth - character.offsetWidth) //Si la posicion del personaje en el eje X mas la velocidad es menor o igual al ancho de la ventana menos el ancho del personaje
            {
                character.style.left = (left + speed) + "px"; //Se le suma la velocidad a la posicion del personaje en el eje X y se le agrega pixeles 
            }
            break;  //Se termina el caso
    } 
} 
); 
