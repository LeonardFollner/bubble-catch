var canvas, context, height, width, number, speed, left, currentScore;
var divStandard, divOrdered, divPuzzle;
var divLeaderboard1, divLeaderboard2, divLeaderboard3, leaderboard0, leaderboard1, leaderboard2;
var divStartCanvas, divBubbleCanvas, divWelcome, divDescription, divSettings, divGameOver, divLeaderboard, divWarning1, divWarning2;
var divDescriptionButton, divLeaderboardButton, divSettingsButton;
var timer, d, date, date0, date1, dateC, datePaused, dateContinued, remainingTime, seconds, milliSeconds, klicks;
var countdownInterval, timerInterval, mainInterval;
var object, randomRadius, randomX, randomY, randomCol, randomVal, bubble, counter;
var rect, clickX, clickY;
var DistX, DistY, Dist, currentBubble, smaller, comparedBubble;
var sound, hitSound, wrongSound;
var name, score, clicked, count, clicks, divLeaderboard;
var table, row, nameCell, scoreCell, bubbleCell, timeCell, clickCell;
var runTimes=0;
var firstRun = 1;
var countdownActive=0;
var isRunning, pauseTime, size;
var gameMode, gameModeSelector;
name = "player1";

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

function toggleGameMode() {
  gameModeSelector = document.getElementById("gameMode");
  gameMode = gameModeSelector.options[gameModeSelector.selectedIndex].value;

  divStandard = document.getElementById("standard");
  divOrdered = document.getElementById("ordered");
  divPuzzle = document.getElementById("puzzle");

  switch (gameMode) {
    case "0":
      divStandard.style.display = 'inline-block';
      divOrdered.style.display = 'none';
      divPuzzle.style.display = 'none';
      break;
    case "1":
      divStandard.style.display = 'none';
      divOrdered.style.display = 'inline-block';
      divPuzzle.style.display = 'none';
      break;
    case "2":
      divStandard.style.display = 'none';
      divOrdered.style.display = 'none';
      divPuzzle.style.display = 'inline-block';
      break;
  }
}

function toggleLeaderboard(id) {
  divLeaderboard0 = document.getElementById('tableLeaderboard0');
  divLeaderboard1 = document.getElementById('tableLeaderboard1');
  divLeaderboard2 = document.getElementById('tableLeaderboard2');

  leaderboard0 = document.getElementById('leaderboard0');
  leaderboard1 = document.getElementById('leaderboard1');
  leaderboard2 = document.getElementById('leaderboard2');

  switch (id) {
    case "leaderboard0":
      divLeaderboard0.style.display = 'inline-block';
      divLeaderboard1.style.display = 'none';
      divLeaderboard2.style.display = 'none';

      leaderboard0.className = 'button buttonClicked';
      leaderboard1.className = 'button';
      leaderboard2.className = 'button';
      break;
    case "leaderboard1":
      divLeaderboard0.style.display = 'none';
      divLeaderboard1.style.display = 'inline-block';
      divLeaderboard2.style.display = 'none';

      leaderboard0.className = 'button';
      leaderboard1.className = 'button buttonClicked';
      leaderboard2.className = 'button';
      break;
    case "leaderboard2":
      divLeaderboard0.style.display = 'none';
      divLeaderboard1.style.display = 'none';
      divLeaderboard2.style.display = 'inline-block';

      leaderboard0.className = 'button';
      leaderboard1.className = 'button';
      leaderboard2.className = 'button buttonClicked';
      break;
  }
}

function displayInsteadOfCanvas(id){
  if (!countdownActive) {
    divStartCanvas=document.getElementById("startCanvas");
    divBubbleCanvas=document.getElementById("bubbleCanvas");
    divWelcome=document.getElementById("welcome");
    divDescription=document.getElementById("description");
    divSettings=document.getElementById("settings");
    divGameOver=document.getElementById("gameOver");
    divLeaderboard=document.getElementById("leaderboard");

    divDescriptionButton=document.getElementById("descriptionButton");
    divLeaderboardButton=document.getElementById("leaderboardButton");
    divSettingsButton=document.getElementById("settingsButton");

    divWarning1=document.getElementById("warning1");
    divWarning2=document.getElementById("warning2");

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

        divDescriptionButton.className = 'button buttonList';
        divLeaderboardButton.className = 'button buttonList';
        divSettingsButton.className = 'button buttonList';
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

        divDescriptionButton.className = 'button buttonList';
        divLeaderboardButton.className = 'button buttonList';
        divSettingsButton.className = 'button buttonList';
        firstRun = 0;
        break;
      case "description":
        if (divDescription.style.display == 'inline-block') {
          if (runTimes === 0) {
            divStartCanvas.style.display='inline-block';
            divDescription.style.display='none';
            divDescriptionButton.className = 'button buttonList';
          }
          else {
            divBubbleCanvas.style.display='inline-block';
            divDescription.style.display='none';
            divDescriptionButton.className = 'button buttonClicked buttonList';
          }
        }
        else {
          if (divGameOver.style.display == 'inline-block') {
            generateLeaderboardWithoutdisplay();
            divStartCanvas.style.display='none';
            divBubbleCanvas.style.display='none';
            divDescription.style.display='inline-block';
            divDescriptionButton.className = 'button buttonClicked buttonList';
          }
          else {
            if (runTimes !== 0) {
              pause("stop");
            }
            divStartCanvas.style.display='none';
            divBubbleCanvas.style.display='none';
            divDescription.style.display='inline-block';
            divDescriptionButton.className = 'button buttonClicked buttonList';
          }
        }
        divWelcome.style.display='none';
        divSettings.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';
        divLeaderboardButton.className = 'button buttonList';
        divSettingsButton.className = 'button buttonList';
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
          divSettingsButton.className = 'button buttonList';
        }
        else if (divSettings.style.display == 'inline-block') {
          divStartCanvas.style.display='inline-block';
          divSettings.style.display='none';
          divWarning1.style.display = 'none';
          divWarning2.style.display = 'none';
          divSettingsButton.className = 'button buttonList';
        }
        else if (divGameOver.style.display == 'inline-block') {
          generateLeaderboardWithoutdisplay();
          divStartCanvas.style.display='none';
          divBubbleCanvas.style.display='none';
          divSettings.style.display='inline-block';
          divWarning1.style.display = 'none';
          divWarning2.style.display = 'none';
          divSettingsButton.className = 'button buttonClicked buttonList';
        }
        else {
          divStartCanvas.style.display='none';
          divBubbleCanvas.style.display='none';
          divSettings.style.display='inline-block';
          divWarning1.style.display = 'none';
          divWarning2.style.display = 'none';
          divSettingsButton.className = 'button buttonClicked buttonList';
        }
        divWelcome.style.display='none';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        divDescriptionButton.className = 'button buttonList';
        divLeaderboardButton.className = 'button buttonList';
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
          if (runTimes===0) {
            divStartCanvas.style.display='inline-block';
            divBubbleCanvas.style.display='none';
            divLeaderboard.style.display='none';
            divLeaderboardButton.className='button buttonList';
          }
          else {
            divStartCanvas.style.display='none';
            divBubbleCanvas.style.display='inline-block';
            divLeaderboard.style.display='none';
            divLeaderboardButton.className='button buttonList';
          }
        }
        else if (divGameOver.style.display == 'inline-block') {
          generateLeaderboardWithoutdisplay();
          divBubbleCanvas.style.display='none';
          divLeaderboard.style.display='inline-block';
          divLeaderboardButton.className='button buttonClicked buttonList';
        }
        else {
          divStartCanvas.style.display='none';
          divBubbleCanvas.style.display='none';
          divLeaderboard.style.display='inline-block';
          divLeaderboardButton.className='button buttonClicked buttonList';
        }
        if (runTimes !== 0) {
          pause("stop");
        }
        divWelcome.style.display='none';
        divDescription.style.display='none';
        divSettings.style.display='none';
        divGameOver.style.display='none';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';

        divDescriptionButton.className = 'button buttonList';
        divSettingsButton.className = 'button buttonList';

        switch (gameMode) {
          case "0":
            toggleLeaderboard("leaderboard0");
            break;
          case "1":
            toggleLeaderboard("leaderboard1");
            break;
          case "2":
            toggleLeaderboard("leaderboard2");
            break;
        }
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
        switch (gameMode) {
          case "0":
            toggleLeaderboard("leaderboard0");
            break;
          case "1":
            toggleLeaderboard("leaderboard1");
            break;
          case "2":
            toggleLeaderboard("leaderboard2");
            break;
        }
        break;
      default:
        console.log("something went wrong");
    }
  }
}

function updateDisplay(id, val) {
  document.getElementById(id).value=val;
}

function start() {
  if (firstRun == 1) {
    displayInsteadOfCanvas("welcome");
  }
  else {
    if (runTimes !== 0) {
      if (!countdownActive) {
        if (isRunning) {
          pause("stop");
        }
        else {
          if (divBubbleCanvas.style.display == 'none') {
            displayInsteadOfCanvas('bubbleCanvas');
          }
          else {
            pause("play");
          }
        }
      }
    }
    else {
      console.log("Spiel gestartet, weil " + runTimes + " Spiele gerade laufen");
      runTimes++;
      isRunning=1;
      displayInsteadOfCanvas('bubbleCanvas');
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
  dateC=date0+3700;
  klicks = 0;

  size=100;
  countdownInterval=setInterval(countdown, 1);
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
            randomVal=Math.ceil(Math.random() * 100 % number);
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

function countdown() {
  d=new Date();
  date0=d.getTime();
  remainingTime=dateC - date0;
  seconds=Math.floor(remainingTime / 1000);
  milliSeconds=Math.floor(remainingTime % 1000);

  document.getElementById("bubbleCanvas").style.backgroundColor = "transparent";
  document.getElementById("start").style.color = "#000000";
  document.getElementById("start").style.backgroundColor = "#d3d3d3";

  if(seconds < 0){
    if (gameMode === "0") {
      date1=date0 + 30000;
      remainingTime=date1 - date0;
    }
    countdownActive=0;
    timerInterval=setInterval(updateTimer, 1);
    erzeugeBubbleMenge(number);
    mainInterval=setInterval(draw, 26);
    canvas.addEventListener("click", beiKlick);
    clearInterval(countdownInterval);
  }
  else {
    countdownActive=1;
    context.clearRect(0, 0, width, height);
    context.fillStyle="#ff0000";
    context.font=size+"px Helvetica";
    context.textAlign="center";
    context.textBaseline="middle";
    if (seconds>0) {
      context.fillText(seconds, 300, 200);
      timer.innerHTML="<strong>"+seconds+"</strong>";
    }
    else {
      context.fillText("LOS!", 300, 200);
      timer.innerHTML="<strong>LOS!</strong>";
    }
    size++;
    if (milliSeconds<20) {
      size=100;
    }
  }
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
      context.fillStyle="#ffffff";
      context.font="20px Helvetica";
      context.textAlign="center";
      context.textBaseline="middle";
      context.fillText(bubbleList[j].val, bubbleList[j].x, bubbleList[j].y);
      context.strokeText(bubbleList[j].val, bubbleList[j].x, bubbleList[j].y);
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
    bubbleList[k].x += bubbleList[k].difX;
    bubbleList[k].y += bubbleList[k].difY;

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
  if (isRunning) {
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
              if (sound) {playSound("hit");}
              bubbleList.splice(l, 1, "hit");
              currentScore = remainingBubbles();
            }
            else {
              if (sound) {playSound("wrong");}
            }
            break;
        }
        if (remainingBubbles() === 0) {
          beendeSpiel();
        }
      }
    }
  }
  else {
    pause("play");
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
  if (gameMode==="0") {
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
      if (seconds < 10) {
        timer.innerHTML=minutes + ":0" + seconds + ":" + milliSeconds;
      }
      else {
        timer.innerHTML=minutes + ":" + seconds + ":" + milliSeconds;
      }
    }
    else {
      timer.innerHTML=seconds + ":" + milliSeconds;
    }
    document.getElementById("start").style.backgroundColor = "#90ee90";
    document.getElementById("bubbleCanvas").style.backgroundColor = "#90ee90";
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

function pause(status) {
  if (status=="stop") {
    if (isRunning==1) {
      date2=new Date();
      datePaused=date2.getTime();
      isRunning=0;
      console.log("Pausiert");

      clearInterval(mainInterval);
      clearInterval(timerInterval);
      timer.innerHTML="<strong>Pausiert</strong>";

      context.clearRect(0, 0, width, height);
      context.fillStyle="#000000";
      context.font="75px Helvetica";
      context.textAlign="center";
      context.textBaseline="middle";
      context.fillText("Pausiert", 300, 170);
      context.font = "25px Helvetica";
      context.fillText("zum Fortsetzen Klicken", 300, 230);
    }
  }
  else {
    date3=new Date();
    dateContinued=date3.getTime();
    pauseTime=dateContinued-datePaused;
    if (gameMode==="0") {
      date1+=pauseTime;
    }
    else {
      date0+=pauseTime;
    }
    timerInterval=setInterval(updateTimer, 1);
    mainInterval=setInterval(draw, 26);
    isRunning=1;
    console.log("Fortgesetzt");
  }
}

function generateGameOver() {
  clicked = number - remainingBubbles();
  displayInsteadOfCanvas('gameOver');

  switch (gameMode) {
    case "0":
      document.playerInfo0.playerName.value = name;
      document.getElementById('count0').innerHTML = number;
      document.getElementById('clicked0').innerHTML = clicked;
      document.getElementById('points0').innerHTML = currentScore;
      document.getElementById('clickCounter0').innerHTML = klicks;

      if (klicks < clicked) {
        document.getElementById("0gz1").style.display = "inline-block";
        document.getElementById("0gz2").style.display = "none";
        document.getElementById("0gz3").style.display = "none";
      }
      else if (klicks === clicked) {
          if (klicks === 0 || clicked === 0) {
            document.getElementById("0gz1").style.display = "none";
            document.getElementById("0gz2").style.display = "none";
            document.getElementById("0gz3").style.display = "none";
          }
          else {
            document.getElementById("0gz1").style.display = "none";
            document.getElementById("0gz2").style.display = "inline-block";
            document.getElementById("0gz3").style.display = "none";
          }
      }
      else if (number == clicked) {
        console.log("all");
        document.getElementById("0gz1").style.display = "none";
        document.getElementById("0gz2").style.display = "none";
        document.getElementById("0gz3").style.display = "inline-block";
      }
      else {
        document.getElementById("0gz1").style.display = "none";
        document.getElementById("0gz2").style.display = "none";
        document.getElementById("0gz3").style.display = "none";
      }

      document.getElementById("gameOver0").style.display = "inline-block";
      document.getElementById("gameOver1").style.display = "none";
      document.getElementById("gameOver2").style.display = "none";
      break;
    case "1":
      document.playerInfo1.playerName.value = name;
      if (minutes === 0) {
        document.getElementById('time1').innerHTML = seconds + " Sekunden";
      }
      else {
        document.getElementById('time1').innerHTML = minutes + " Minuten und " + seconds + " Sekunden";
      }
      document.getElementById('count1').innerHTML = number;
      document.getElementById('points1').innerHTML = currentScore;
      document.getElementById('clickCounter1').innerHTML = klicks;

      if (number == klicks) {
        document.getElementById("1gz1").style.display = "inline-block";
      }
      else {
        document.getElementById("1gz1").style.display = "none";
      }

      document.getElementById("gameOver0").style.display = "none";
      document.getElementById("gameOver1").style.display = "inline-block";
      document.getElementById("gameOver2").style.display = "none";
      break;
    case "2":
      document.playerInfo2.playerName.value = name;
      if (minutes === 0) {
        document.getElementById('time2').innerHTML = seconds + " Sekunden";
      }
      else {
        document.getElementById('time2').innerHTML = minutes + " Minuten und " + seconds + " Sekunden";
      }
      document.getElementById('count2').innerHTML = number;
      document.getElementById('clickCounter2').innerHTML = klicks;

      if (number == klicks) {
        document.getElementById("2gz1").style.display = "inline-block";
      }
      else {
        document.getElementById("2gz1").style.display = "none";
      }

      document.getElementById("gameOver0").style.display = "none";
      document.getElementById("gameOver1").style.display = "none";
      document.getElementById("gameOver2").style.display = "inline-block";
      break;
  }
}

function beendeSpiel() {
  if (sound) {playSound("end");}
  timer.innerHTML="Neustarten";
  document.getElementById("start").style.backgroundColor = "#0000ff";
  document.getElementById("start").style.color = "#ffffff";
  //document.getElementById("start").style.borderColor = "#ffa500";
  console.log("Game Over!");
  clearInterval(mainInterval);
  clearInterval(timerInterval);
  context.clearRect(0, 0, width, height);
  bubbleList.splice(0, number, "");
  runTimes--;
  generateGameOver();
}

function generateLeaderboardWithoutdisplay() {
  switch (gameMode) {
    case "0":
      name = document.playerInfo0.playerName.value;
      table = document.getElementById("tableLeaderboard0");

      row = table.insertRow(-1);
      nameCell = row.insertCell(0);
      scoreCell = row.insertCell(1);
      bubbleCell = row.insertCell(2);
      clickCell = row.insertCell(3);

      bubbleCell.innerHTML = clicked + " / " + number;
      scoreCell.innerHTML = currentScore;
      clickCell.innerHTML = klicks;
      break;
    case "1":
      name = document.playerInfo1.playerName.value;
      table = document.getElementById("tableLeaderboard1");

      row = table.insertRow(-1);
      nameCell = row.insertCell(0);
      scoreCell = row.insertCell(1);
      bubbleCell = row.insertCell(2);
      timeCell = row.insertCell(3);

      bubbleCell.innerHTML = number;
      scoreCell.innerHTML = currentScore;
      if (minutes === 0) {
        if (seconds < 10) {
          timeCell.innerHTML = "00:0" + seconds;
        }
        else {
          timeCell.innerHTML = "00:" + seconds;
        }
      }
      else if (minutes < 10) {
        if (seconds < 10) {
          timeCell.innerHTML = "0" + minutes + ":0" + seconds;
        }
        else {
          timeCell.innerHTML = "0" + minutes + ":" + seconds;
        }
      }
      else {
        if (seconds < 10) {
          timeCell.innerHTML = minutes + ":0" + seconds;
        }
        else {
          timeCell.innerHTML = minutes + ":" + seconds;
        }
      }
      break;
    case "2":
      name = document.playerInfo2.playerName.value;
      table = document.getElementById("tableLeaderboard2");

      row = table.insertRow(-1);
      nameCell = row.insertCell(0);
      bubbleCell = row.insertCell(1);
      timeCell = row.insertCell(2);

      bubbleCell.innerHTML = number;
      if (minutes === 0) {
        if (seconds < 10) {
          timeCell.innerHTML = "00:0" + seconds;
        }
        else {
          timeCell.innerHTML = "00:" + seconds;
        }
      }
      else if (minutes < 10) {
        if (seconds < 10) {
          timeCell.innerHTML = "0" + minutes + ":0" + seconds;
        }
        else {
          timeCell.innerHTML = "0" + minutes + ":" + seconds;
        }
      }
      else {
        if (seconds < 10) {
          timeCell.innerHTML = minutes + ":0" + seconds;
        }
        else {
          timeCell.innerHTML = minutes + ":" + seconds;
        }
      }
      break;
  }
  nameCell.innerHTML = name;
}

function generateLeaderboard() {
  generateLeaderboardWithoutdisplay();
  displayInsteadOfCanvas('gamOverButton');
}

window.onload=paint;

/*ToDo
* fix bubbles anklicken!
* fix footer margin-top
* (add sorting algorithm)
* clean up code
* sort functions
* rename dates
*/
