var startBtn = document.getElementById("startButton");
const endgameResults = document.getElementById("gameHistoryResults");
//const startGameButton = document.getElementById("startButton");
//const welcomeScreen = document.getElementById("menu");
//const selectScreen = document.getElementById("selectBike");
var canvas = document.getElementById("tronCanvas");
const unit = 15;
const context = canvas.getContext("2d");
var objImage= null;
var playerSpeed = 200;
// hide gamescreen
//selectScreen.classList.add(`d-none`);


class Player {
  constructor(x, y, color) {
    this.color = color || "#fff";
    this.dead = false;
    this.direction = "";
    this.key = "";
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;

    this.constructor.counter = (this.constructor.counter || 0) + 1;
    this._id = this.constructor.counter;

    Player.allInstances.push(this);
  }
}

Player.allInstances = [];

let p1 = new Player(unit * 6, unit * 6, "#75A4FF");
let p2 = new Player(unit * 43, unit * 43, "#FF5050");



function openMenu() {
  var pickBike = document.getElementById("Menu");
  if (pickBike.style.display === "none") {
    pickBike.style.display = "none";
    startBtn.style.visibility = "hidden";
    window.addEventListener("DOMContentLoaded", event => {
      const audio = document.querySelector("audio");
      audio.volume = 0.2;
      audio.play();
    });
  } else {
    pickBike.style.display = "none"
  }

}
  function startGame(){
      var blueBike = document.getElementById("blue");

  }
function myFunction() {
  
    //drawSprites("resources/Images/yellow-bike.png", 10, 10);
    getPlayableCells(canvas);
    drawBackground();
    drawStartingPositions(Player.allInstances);
    setInterval(draw,100);

  }
/*
function drawSprites(url, pos1, pos2){
  var p = new Image();
  p.src = url;
  p.addEventListener("load", function() {
      ctx.drawImage(img, pos1, pos2);
  });
}
*/
  function getPlayableCells(canvas, unit) {
    let playableCells = new Set();
    for (let i = 0; i < canvas.width / unit; i++){
         for (let j = 0; j < canvas.height / unit; j++){
              playableCells.add(`${i * unit}x${j * unit}y`);
         };
    };
    return playableCells;
};

let playableCells = getPlayableCells(canvas, unit);

  function drawBackground() {
    context.strokeStyle = '#001900';
    for (let i = 0; i <= canvas.width / unit + 2; i += 2) {
      for (let j = 0; j <= canvas.height / unit + 2; j += 2) {
        context.strokeRect(0, 0, unit * i, unit * j);
      };
    };
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    for (let i = 1; i <= canvas.width / unit; i += 2) {
      for (let j = 1; j <= canvas.height / unit; j += 2) {
        context.strokeRect(0, 0, unit * i, unit * j);
      };
    };
    context.lineWidth = 1;
  };
  drawBackground();

  function drawStartingPositions(players) {
    players.forEach(p => {
      context.fillStyle = p.color;
      context.fillRect(p.x, p.y, unit, unit);
      context.strokeStyle = 'black';
      context.strokeRect(p.x, p.y, unit, unit);
    });
  };
  
  
  
  function setKey(key, player, up, right, down, left) {
    switch (key) {
      case up:
        if (player.direction !== "DOWN") {
          player.key = "UP";
        }
        break;
      case right:
        if (player.direction !== "LEFT") {
          player.key = "RIGHT";
        }
        break;
      case down:
        if (player.direction !== "UP") {
          player.key = "DOWN";
        }
        break;
      case left:
        if (player.direction !== "RIGHT") {
          player.key = "LEFT";
        }
        break;
      default:
        break;
    }
  }

  function handleKeyPress(event) {
    let key = event.keyCode;
  
    if (key === 37 || key === 38 || key === 39 || key === 40) {
      event.preventDefault();
    }
  
    setKey(key, p1, 38, 39, 40, 37);
    setKey(key, p2, 87, 68, 83, 65); 
  }

document.addEventListener('keydown', handleKeyPress);

function draw(){
  Player.allInstances.forEach((p) => {
    if (p.key) {
      p.direction = p.key;

      context.fillStyle = p.color;
      context.fillRect(p.x, p.y, unit, unit);
      context.strokeStyle = "black";
      context.strokeRect(p.x, p.y, unit, unit);

      if (!playableCells.has(`${p.x}x${p.y}y`) && p.dead === false) {
        p.dead = true;
        p.direction = "";
        playerCount -= 1;
      }

      playableCells.delete(`${p.x}x${p.y}y`);

      if (!p.dead) {
        if (p.direction === "LEFT") p.x -= unit;
        if (p.direction === "UP") p.y -= unit;
        if (p.direction === "RIGHT") p.x += unit;
        if (p.direction === "DOWN") p.y += unit;
      }
    }
  });
}


let outcome, winner, playerCount = Player.allInstances.length;

function determineWinner(){
  if (playerCount.allInstances.filter(p => !p.key).length == 0){
       if(playerCount == 1) {
            const alivePlayers = Player.allInstances.filter(p => p.dead == false);
            outcome = `Player ${alivePlayers[0].playerId} wins!`;
       } else if (playerCount == 0) {
            outcome = 'Draw!';
       }

       if (outcome) {
        function myPlay(){
          var audio = new Audio("resources/music/Bike-Crash.mp3");
          audio.play();
      }
            createEndScreen(winner);
            clearInterval(game);
       }
  }

}
/*
let modifier = 5;
window.addEventListener('keydown', (event) => {
  objImage=document.getElementById("image1");	
  switch (event.key) {
    case 'ArrowUp' : objImage.top = `${parseInt(objImage.top) - modifier}px`; break;
    case 'ArrowDown' : objImage.top = `${parseInt(objImage.top) + modifier}px`; break;
    case 'ArrowLeft' : objImage.left = `${parseInt(objImage.left) - modifier}px`; break;
    case 'ArrowRight' : objImage.left = `${parseInt(objImage.left) + modifier}px`; break;
  }
});
*/


//const game = setInterval(draw, 100);
//game = setInterval(draw, 100);

function createEndScreen(color) {
  const resultText = document.getElementById('gameHistory');
  const replayButton = document.createElement('button');
  resultText.innerText = outcome;
  resultText.style.fontFamily = 'Time New Romans, initial';
  resultText.style.textAlign = 'center';
  resultText.style.textTransform = 'uppercase';
  replayButton.innerText = 'Replay Game';
  replayButton.style.fontFamily = 'Time New Romans, initial';
  replayButton.style.cursor = 'pointer';
  replayButton.onclick = resetGame;

  this.gameHistoryLog = [];

  this.gameHistoryLog.push(outcome);
  endgameResults.innerHTML = game.gameHistoryLog;



}

function resetGame(){
  outcome = '';
  winner = '';

  context.clearRect(0, 0, canvas.width, canvas.height);
  clearInterval(game);
  game = setInterval(draw,100);
}


