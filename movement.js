// JavaScript (movement.js)
document.addEventListener('keydown', function(event) {
    var character = document.getElementById('character');
    var speed = 100;
    var key = event.key;

    var top = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    var left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));

    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    switch (key) {
        case 'ArrowUp':
            if (top - speed >= 0) {
                character.style.top = (top - speed) + "px";
            }
            break;
        case 'ArrowDown':
            if (top + speed <= windowHeight - character.offsetHeight) {
                character.style.top = (top + speed) + "px";
            }
            break;
        case 'ArrowLeft':
            if (left - speed >= 0) {
                character.style.left = (left - speed) + "px";
            }
            break;
        case 'ArrowRight':
            if (left + speed <= windowWidth - character.offsetWidth) {
                character.style.left = (left + speed) + "px";
            }
            break;
    }
});