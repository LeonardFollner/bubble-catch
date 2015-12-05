var canvas, context, height, width, number, speed, left, currentScore;
var timer, d, date, date0, date1, remainingTime, seconds, milliSeconds, klicks;
var timerInterval, mainInterval;
var object, randomRadius, randomX, randomY, randomCol, randomVal, bubble, counter;
var rect, clickX, clickY;
var DistX, DistY, Dist, currentBubble, smaller, comparedBubble;
var sound, hitSound, wrongSound;
var name, score, clicked, count, clicks, divLeaderboard;
var table, row, nameCell, scoreCell, bubbleCell, clickCell;
var runTimes=0;
var firstRun = 1;
var gameMode, gameModeSelector;
var stopMoving = 0;

function paint() {
  var title = document.getElementById("startCanvas");
  var titleCtx = title.getContext("2d");
  var titleHeight = title.height;
  var titleWidth = title.width;
  titleCtx.textAlign="center";
  titleCtx.textBaseline="middle";
  titleCtx.font = "75px Helvetica";
  var gradient = titleCtx.createLinearGradient(100, 0, 500, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
  titleCtx.fillStyle = gradient;
  titleCtx.fillStyle = gradient;
  titleCtx.fillText("Bubble-Catch", 300, 170);
  titleCtx.font = "25px Helvetica";
  titleCtx.fillText("zum Starten Klicken", 300, 230);
}

function toggle() {
  gameModeSelector = document.getElementById("gameMode");
  gameMode = gameModeSelector.options[gameModeSelector.selectedIndex].value;
  switch (gameMode) {
    case "0":
      document.getElementById("standard").style.display = 'inline-block';
      document.getElementById("ordered").style.display = 'none';
      document.getElementById("puzzle").style.display = 'none';
      break;
    case "1":
      document.getElementById("standard").style.display = 'none';
      document.getElementById("ordered").style.display = 'inline-block';
      document.getElementById("puzzle").style.display = 'none';
      break;
    case "2":
      document.getElementById("standard").style.display = 'none';
      document.getElementById("ordered").style.display = 'none';
      document.getElementById("puzzle").style.display = 'inline-block';
      break;
  }
}

function displayInsteadOfCanvas(id){
  var divStartCanvas=document.getElementById("startCanvas");
  var divBubbleCanvas=document.getElementById("bubbleCanvas");
  var divWelcome=document.getElementById("welcome");
  var divDescription=document.getElementById("description");
  var divSettings=document.getElementById("settings");
  var divGameOver=document.getElementById("gameOver");
  var divLeaderboard=document.getElementById("leaderboard");

  var divWarning1=document.getElementById("warning1");
  var divWarning2=document.getElementById("warning2");

  switch (id) {
    case "bubbleCanvas":
      if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
      }
      divStartCanvas.style.display='none';
      divBubbleCanvas.style.display='inline-block';
      divWelcome.style.display='none';
      divDescription.style.display='none';
      divSettings.style.display='none';
      divGameOver.style.display='none';
      divLeaderboard.style.display='none';
      divWarning1.style.display = 'none';
      divWarning2.style.display = 'none';
      break;
    case "welcome":
      divStartCanvas.style.display='none';
      divBubbleCanvas.style.display='none';
      divWelcome.style.display='inline-block';
      divDescription.style.display='none';
      divSettings.style.display='none';
      divGameOver.style.display='none';
      divLeaderboard.style.display='none';
      divWarning1.style.display = 'none';
      divWarning2.style.display = 'none';
      firstRun = 0;
      break;
    case "description":
      if (divDescription.style.display == 'inline-block') {
        if (runTimes === 0) {
          divStartCanvas.style.display='inline-block';
          divDescription.style.display='none';
        }
        else {
          divBubbleCanvas.style.display='inline-block';
          divDescription.style.display='none';
        }
      }
      else if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='inline-block';
      }
      else {
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='inline-block';
      }
      divWelcome.style.display='none';
      divSettings.style.display='none';
      divGameOver.style.display='none';
      divLeaderboard.style.display='none';
      divWarning1.style.display = 'none';
      divWarning2.style.display = 'none';
      break;
    case "settings":
      if (runTimes !== 0) {
        if (divBubbleCanvas.style.display === 'inline-block') {
          divWarning1.style.display = 'inline-block';
          divWarning2.style.display = 'none';
        }
        else {
          divWarning1.style.display = 'none';
          divWarning2.style.display = 'inline-block';
        }
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='inline-block';
        divSettings.style.display='none';
      }
      else if (divSettings.style.display == 'inline-block') {
        divStartCanvas.style.display='inline-block';
        divSettings.style.display='none';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';
      }
      else if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divSettings.style.display='inline-block';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';
      }
      else {
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divSettings.style.display='inline-block';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';
      }
      divWelcome.style.display='none';
      divDescription.style.display='none';
      divGameOver.style.display='none';
      divLeaderboard.style.display='none';
      break;
    case "gameOver":
      divStartCanvas.style.display='none';
      divBubbleCanvas.style.display='none';
      divWelcome.style.display='none';
      divDescription.style.display='none';
      divSettings.style.display='none';
      divGameOver.style.display='inline-block';
      divLeaderboard.style.display='none';
      divWarning1.style.display = 'none';
      divWarning2.style.display = 'none';
      break;
    case "leaderboard":
      if (divLeaderboard.style.display == 'inline-block') {
        divStartCanvas.style.display='inline-block';
        divLeaderboard.style.display='none';
      }
      else if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
        divLeaderboard.style.display='inline-block';
      }
      else {
        divStartCanvas.style.display='none';
        divLeaderboard.style.display='inline-block';
      }
      divBubbleCanvas.style.display='none';
      divWelcome.style.display='none';
      divDescription.style.display='none';
      divSettings.style.display='none';
      divGameOver.style.display='none';
      divWarning1.style.display = 'none';
      divWarning2.style.display = 'none';
      break;
    case "gamOverButton":
      divStartCanvas.style.display='none';
      divBubbleCanvas.style.display='none';
      divWelcome.style.display='none';
      divDescription.style.display='none';
      divSettings.style.display='none';
      divGameOver.style.display='none';
      divLeaderboard.style.display='inline-block';
      divWarning1.style.display = 'none';
      divWarning2.style.display = 'none';
      break;
    default:
      console.log("something went wrong");
  }
}

function updateDisplay(id, val) {
  document.getElementById(id).value=val;
}

function start() {
  displayInsteadOfCanvas('bubbleCanvas');
  if (firstRun == 1) {
    displayInsteadOfCanvas("welcome");
  }
  else {
    if (runTimes !== 0) {
      console.log("Neustart abgebrochen, weil noch " + runTimes + " Spiel läuft");
    }
    else {
      console.log("Spiel gestartet, weil " + runTimes + " Spiele gerade laufen");
      runTimes++;
      init();
    }
  }
}

function init() {
  canvas=document.getElementById('bubbleCanvas');
  context=canvas.getContext("2d");
  height=canvas.height;
  width=canvas.width;
  bubbleList=new Array("");
  currentScore=0;

  number=document.getElementById('number').value;
  speed=document.getElementById('speed').value;
  left=number;
  if (document.getElementById('sound').checked) {
    sound=1;
  }
  else {
    sound=0;
  }
  gameModeSelector = document.getElementById("gameMode");
  gameMode = gameModeSelector.options[gameModeSelector.selectedIndex].value;
  if (gameMode==2) {currentScore = number;}

  timer=document.getElementById('start');
  date=new Date();
  date0=date.getTime();
  if (gameMode == 0) {
    date1=date0 + 30000;
    remainingTime=date1 - date0;
  }
  klicks = 0;

  timerInterval=setInterval(updateTimer, 1);
  erzeugeBubbleMenge(number);
  mainInterval=setInterval(draw, 26);
  canvas.addEventListener("click", beiKlick);
}

function erzeugeBubbleMenge(number) {
  bubbleList.splice(0, bubbleList.length);
  for (var i=0; i < number; i++) {
    erzeugeEinzelneBubble();
  }
}

function erzeugeEinzelneBubble() {
  //bubble object constructor
  var object=function(x, y, difX, difY, radius, col, val) {
    this.x=x;
    this.y=y;
    this.difX=difX;
    this.difY=difY;
    this.col=col;
    this.radius=radius;
    this.val=val;
  };
  randomRadius=(Math.random() * 100 % 11 + 10);
  do {
    randomX=Math.random() * width;
  }
  while (randomX <= randomRadius || randomX >= width - randomRadius);

  do {
    randomY=Math.random() * height;
  }
  while (randomY <= randomRadius || randomY >= height - randomRadius);
  randomDifX=(Math.random() * speed - speed/2);
  randomDifY=(Math.random() * speed - speed/2);
  randomCol='#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);
  if (gameMode!=2) {
    randomVal=Math.ceil(Math.random() * 100 % 10);
    if (gameMode == 1) {
      while (counter != bubbleList.length) {
        counter = 0;
        for (var a = 0; a < bubbleList.length; a++) {
          if (randomVal == bubbleList[a].val) {
            randomVal=Math.ceil(Math.random() * 100 % 10);
            counter = 0;
          }
          else {
            counter++;
          }
        }
      }
    }
  }
  bubble=new object(randomX, randomY, randomDifX, randomDifY, randomRadius, randomCol, randomVal);
  bubbleList.push(bubble);
}

function draw() {
  context.clearRect(0, 0, width, height);
  for (var j=0; j < number; j++) {
    context.beginPath();
    context.arc(bubbleList[j].x, bubbleList[j].y, bubbleList[j].radius, 0, 2*Math.PI);
    context.strokeStyle="#000000";
    context.stroke();
    context.fillStyle=bubbleList[j].col;
    context.fill();
    if (gameMode != 2) {
      //context.fillStyle="#ffffff";
      context.fillStyle="#000000";
      context.font="20px Helvetica";
      context.textAlign="center";
      context.textBaseline="middle";
      context.fillText(bubbleList[j].val, bubbleList[j].x, bubbleList[j].y);
      //context.strokeText(bubbleList[j].val, bubbleList[j].x, bubbleList[j].y);
    }
    context.fillStyle="#000000";
    context.font="20px Helvetica";
    context.textAlign="end";
    context.textBaseline="top";
    context.fillText(currentScore, 580, 20);
  }
  update();
}

function update() {
  for (var k=0; k < number; k++) {
    if (!stopMoving) {
    bubbleList[k].x += bubbleList[k].difX;
    bubbleList[k].y += bubbleList[k].difY;
    }

    if (bubbleList[k].x - bubbleList[k].radius < 0) { //left
      bubbleList[k].difX=-(bubbleList[k].difX);
    }
    else if (bubbleList[k].x + bubbleList[k].radius > width) { //right
      bubbleList[k].difX=-(bubbleList[k].difX);
    }

    if (bubbleList[k].y - bubbleList[k].radius < 0) { //top
      bubbleList[k].difY=-(bubbleList[k].difY);
    }
    else if (bubbleList[k].y + bubbleList[k].radius > height) { //bottom
      bubbleList[k].difY=-(bubbleList[k].difY);
    }
  }
}

function beiKlick() {
  rect=canvas.getBoundingClientRect();
  clickX=(event.clientX - rect.left);
  clickY=(event.clientY - rect.top);
  klicks++;

  for (var l=0; l < number; l++) {
    DistX=bubbleList[l].x - clickX;
    DistY=bubbleList[l].y - clickY;
    Dist=Math.sqrt(DistX * DistX + DistY * DistY);
    if (Dist < bubbleList[l].radius) {
      currentBubble=bubbleList[l];
      switch (gameMode) {
        case "0":
          currentScore += bubbleList[l].val;
          if (sound) {playSound("hit");}
          bubbleList.splice(l, 1, "hit");
          break;
        case "1":
          smaller=0;
          for (var b=0; b<number; b++) {
            comparedBubble = bubbleList[b];
            if (comparedBubble.val < currentBubble.val) {
              smaller++;
            }
          }
          if (smaller===0) {
            currentScore += bubbleList[l].val;
            if (sound) {playSound("hit");}
            bubbleList.splice(l, 1, "hit");
          }
          else {
            currentScore -= bubbleList[l].val;
            if (sound) {playSound("wrong");}
          }
          break;
        case "2":
          smaller=0;
          for (var c=0; c<number; c++) {
            comparedBubble = bubbleList[c];
            if (comparedBubble.radius < currentBubble.radius) {
              smaller++;
            }
          }
          if (smaller===0) {
            currentScore = remainingBubbles();
            if (sound) {playSound("hit");}
            bubbleList.splice(l, 1, "hit");
          }
          break;
      }
      if (remainingBubbles() === 0) {
        beendeSpiel();
      }
    }
  }
}

function playSound(type) {
  hitSound = new Audio('coin.wav');
  wrongSound = new Audio('implosion.wav');
  endSound = new Audio('complete.wav');
  timerSound = new Audio('timer.wav');
  if (type == "hit") {
    hitSound.play();
  }
  else if (type == "wrong") {
    wrongSound.play();
  }
  else if (type == "end") {
    endSound.play();
  }
  else if (type == "timer") {
    timerSound.play();
  }
}

function updateTimer() {
  if (gameMode==0) {
    d=new Date();
    date0=d.getTime();
    remainingTime=date1 - date0;
    seconds=Math.floor(remainingTime / 1000);
    milliSeconds=Math.floor(remainingTime % 1000);

    if(remainingTime <= 0){
      beendeSpiel();
    }
    else {
      if (seconds >= 10) {
        document.getElementById("bubbleCanvas").style.backgroundColor = "#90ee90";
        document.getElementById("start").style.backgroundColor = "#90ee90";
        if (milliSeconds < 100) {
          timer.innerHTML=seconds + ":0" + milliSeconds;
        }
        else if (milliSeconds < 10) {
          timer.innerHTML=seconds + ":00" + milliSeconds;
        }
        else if (milliSeconds === 0) {
          timer.innerHTML=seconds + ":000";
        }
        else {
          timer.innerHTML=seconds + ":" + milliSeconds;
        }
      }
      else if (seconds > 5) {
        document. getElementById("bubbleCanvas").style.backgroundColor = "#ffa07a";
        document. getElementById("start").style.backgroundColor = "#ffa07a";
        if (milliSeconds < 100) {
          timer.innerHTML="0" + seconds + ":0" + milliSeconds;
        }
        else if (milliSeconds < 10) {
          timer.innerHTML="0" + seconds + ":00" + milliSeconds;
        }
        else if (milliSeconds === 0) {
          timer.innerHTML="0" + seconds + ":000";
        }
        else {
          timer.innerHTML="0" + seconds + ":" + milliSeconds;
        }
      }
      else if (seconds >= 0) {
        document. getElementById("bubbleCanvas").style.backgroundColor = "#f08080";
        document. getElementById("start").style.backgroundColor = "#f08080";
        if (milliSeconds < 10) {
          timer.innerHTML="<strong>0" + seconds + ":0" + milliSeconds + "</strong>";
        }
        else if (milliSeconds < 10) {
          timer.innerHTML="<strong>0" + seconds + ":00" + milliSeconds + "</strong>";
        }
        else if (milliSeconds === 0) {
          timer.innerHTML="<strong>0" + seconds + ":000</strong>";
        }
        else {
          timer.innerHTML="<strong>0" + seconds + ":" + milliSeconds + "</strong>";
        }
      }
    }
  }
  else {
    d=new Date();
    date1=d.getTime();
    remainingTime=date1-date0;
    minutes = Math.floor(remainingTime / 1000 / 60);
    seconds=Math.floor(remainingTime / 1000 % 60);
    milliSeconds=Math.ceil(Math.floor(remainingTime % 1000)/100);
    if (milliSeconds === 10) {
      milliSeconds = milliSeconds/10;
    }
    if (minutes !== 0) {
      timer.innerHTML=minutes + ":" + seconds + ":" + milliSeconds;
    }
    else {
      timer.innerHTML=seconds + ":" + milliSeconds;
    }
    document.getElementById("start").style.backgroundColor = "#90ee90";
  }
}

function remainingBubbles() {
  for (var m=0; m < number; m++) {
    if (bubbleList[m] == "hit") {
      left--;
      bubbleList.splice(m, 1, "hitSaved");
    }
  }
  return left;
}

function generateGameOver() {
  clicked = number - remainingBubbles();
  displayInsteadOfCanvas('gameOver');
  document.getElementById('count').innerHTML = number;
  document.getElementById('clicked').innerHTML = clicked;
  document.getElementById('points').innerHTML = currentScore;
  document.getElementById('clickCounter').innerHTML = klicks;
  if (klicks < clicked) {
    document.getElementById("gz1").style.display = "inline-block";
    document.getElementById("gz2").style.display = "none";
    document.getElementById("gz3").style.display = "none";
  }
  else if (klicks === clicked) {
    document.getElementById("gz1").style.display = "none";
    document.getElementById("gz2").style.display = "inline-block";
    document.getElementById("gz3").style.display = "none";
  }
  else if (number == clicked) {
    console.log("all");
    document.getElementById("gz1").style.display = "none";
    document.getElementById("gz2").style.display = "none";
    document.getElementById("gz3").style.display = "inline-block";
  }
}

function beendeSpiel() {
  if (sound) {playSound("end");}
  timer.innerHTML="Neustarten";
  document. getElementById("start").style.backgroundColor = "#0000ff";
  document. getElementById("start").style.color = "#ffffff";
  console.log("Game Over!");
  clearInterval(mainInterval);
  clearInterval(timerInterval);
  context.clearRect(0, 0, width, height);
  bubbleList.splice(0, number, "");
  runTimes--;
  generateGameOver();
}

function generateLeaderboardWithoutdisplay() {
  name = document.playerInfo.playerName.value;
  table = document.getElementById("tableLeaderboard");
  row = table.insertRow(-1);
  nameCell = row.insertCell(0);
  scoreCell = row.insertCell(1);
  bubbleCell = row.insertCell(2);
  clickCell = row.insertCell(3);

  nameCell.innerHTML = name;
  scoreCell.innerHTML = currentScore;
  bubbleCell.innerHTML = "" + clicked + " / " + number + "";
  clickCell.innerHTML = klicks;
}

function generateLeaderboard() {
  generateLeaderboardWithoutdisplay();
  displayInsteadOfCanvas('gamOverButton');
}

window.onload=paint;

/*notes
* Barrierefreiheit!
* fix bubbles anklicken!
* fix footer margin-top
*/
