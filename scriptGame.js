const score = document.querySelector(".header__score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const level = document.querySelector(".level");

// Importamos audio

let gameStart = new Audio();
let gameOver = new Audio();

gameStart.src = "./assets/audios/motorCar.mpeg";
gameOver.src = "./assets/audios/music.mpeg";

//objeto velocidad
const levelSpeed = { easy: 7, moderate: 10, difficult: 14 };

//onjeto teclas
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

//velocidad por defecto
let player = { speed: 7, score: 0 };
level.addEventListener("click", (e) => {
  player.speed = levelSpeed[e.target.id];
});

startScreen.addEventListener("click", () => {
  startScreen.classList.add("hide");
  gameArea.textContent = "";

  player.start = true;
  gameStart.play(); //inicia musica motor
  gameStart.loop = true; //repetir
  gameOver.pause(); // pausa musica gameover
  player.score = 0;
  window.requestAnimationFrame(gamePlay);
  

  

  for (let i = 0; i < 5; i++) {
    let roadLineElement = document.createElement("div");
    roadLineElement.setAttribute("class", "roadLines");
    roadLineElement.y = i * 150;
    roadLineElement.style.top = roadLineElement.y + "px";
    gameArea.appendChild(roadLineElement);
  }

  //crear carros
  let carElement = document.createElement("div");
  carElement.setAttribute("class", "car");
  gameArea.appendChild(carElement);

  player.x = carElement.offsetLeft;
  player.y = carElement.offsetTop;

  for (let i = 0; i < 3; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemyCar");
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }
});

//compara las pociciones de los carros cuando se estrellan
const crashCar = (car1, car2) => {
  aRect = car1.getBoundingClientRect(); //devuelve el tamanio y la posiciondel elemento
  bRect = car2.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
};

function onGameOver() {
  player.start = false;
  gameStart.pause();
  gameOver.play();
  startScreen.classList.remove("hide");
  startScreen.innerHTML = `Game Over <br> Su puntaje final es:<b> >> ${player.score} << </b> <br> <button class='btn-reiniciar'>Reiniciar</button>`;
  player.speed = 7;

}

//mover las lienas de la carretera
const moveRoadLines = () => {
  let roadLines = document.querySelectorAll(".roadLines");
  roadLines.forEach((item) => {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
};

//mueve los carro enemigos
const moveEnemyCars = (carElement) => {
  let enemyCars = document.querySelectorAll(".enemyCar");
  enemyCars.forEach((item) => {
    if (crashCar(carElement, item)) {
      onGameOver();
    }
    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
};


//jugabilidad
const gamePlay = () => {
  let carElement = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveRoadLines();
    moveEnemyCars(carElement);

    if (keys.ArrowUp && player.y > road.top + 70) player.y -= player.speed;
    if (keys.ArrowDown && player.y < road.bottom - 85) player.y += player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < road.width - 70) player.x += player.speed;

    carElement.style.top = player.y + "px";
    carElement.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);

    player.score++;
    const ps = player.score ;
    score.innerHTML = "Score: " + ps;
    wingame(player.score)
    speedLevels(player.score)
  }
};
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  keys[e.key] = false;
});


//Llega a la meta
const wingame = (score) => {
    if(score === 1000){
        player.start = false;
        gameStart.pause();
        gameOver.play();
        startScreen.classList.remove("hide");
        startScreen.innerHTML = `Felicidades Ganaste <b> >> ${player.score} << </b> <br> <button class='btn-win'>Jugar de nuevo</button>`;
        
        // randomInRange(1,2)


//animacion confetti
/* -------------------------------------------------------------------------- */

var duration = 3 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 50 * (timeLeft / duration);
  // since particles fall down, start a bit higher than random
  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
}, 250);
/* -------------------------------------------------------------------------- */

        

    
    
    }

    
}


//Aumanta los niveles de dificultad depende del score
const speedLevels = (score) => {
    if(score === 200){
        player.speed = 10
    }else if(score === 800){
        player.speed = 14


    }
    
}


