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

function toggle(id) {
  var e=document.getElementById(id);
  if(e.style.display == 'block') {
    e.style.display='none';
  }
  else {
    e.style.display='block';
    }
}

function displayInsteadOfCanvas(id){
  var divStartCanvas=document.getElementById("startCanvas");
  var divBubbleCanvas=document.getElementById("bubbleCanvas");
  var divDescription=document.getElementById("description");
  var divGameOver=document.getElementById("gameOver");
  var divLeaderboard=document.getElementById("leaderboard");

  switch (id) {
    case "bubbleCanvas":
      if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='inline-block';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        break;
      }
      else {
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='inline-block';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        break;
      }
    case "description":
      if (divDescription.style.display == 'inline-block') {
        divStartCanvas.style.display='inline-block';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        break;
      }
      else if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='inline-block';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        break;
      }
      else {
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='inline-block';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        break;
      }
    case "gameOver":
      divStartCanvas.style.display='none';
      divBubbleCanvas.style.display='none';
      divDescription.style.display='none';
      divGameOver.style.display='inline-block';
      divLeaderboard.style.display='none';
      break;
    case "leaderboard":
      if (divLeaderboard.style.display == 'inline-block') {
        divStartCanvas.style.display='inline-block';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        break;
      }
      else if (divGameOver.style.display == 'inline-block') {
        generateLeaderboardWithoutdisplay();
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='inline-block';
        break;
      }
      else {
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divDescription.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='inline-block';
        break;
    }
    default:
      console.log("something went wrong");
  }
}

function updateDisplay(id, val) {
  document.getElementById(id).value=val;
}

var runTimes=0;

function start() {
  var canvas=document.getElementById('bubbleCanvas');
  var context=canvas.getContext("2d");
  var height=canvas.height;
  var width=canvas.width;
  var bubbleList=new Array("");
  var number=document.getElementById('number').value;
  var speed=10//document.getElementById('speed').value;
  var left=number;
  var currentScore=0;

  displayInsteadOfCanvas('bubbleCanvas');

  if (runTimes != 0) {
    console.log("Neustart abgebrochen, weil noch " + runTimes + " Spiel läuft");
  }
  else {
  console.log("Spiel gestartet, weil " + runTimes + " Spiele gerade laufen");

  var timer=document.getElementById('start');
  var date=new Date();
  var date0=date.getTime();
  var date1=date0 + 30000;
  var remainingTime=date1 - date0;
  var klicks = 0;

  var timerInterval=setInterval(updateTimer, 1);
  erzeugeBubbleMenge(number);
  var mainInterval=setInterval(draw, 30);
  canvas.addEventListener("click", beiKlick);

  function erzeugeBubbleMenge(number) {
    bubbleList.splice(0, bubbleList.length);
    for (var i=0; i < number; i++) {
      erzeugeEinzelneBubble();
    }
  }

  function erzeugeEinzelneBubble() {
    //bubble object constructor
    var object=function(x, y, difX, difY, radius, col, wert) {
      this.x=x;
      this.y=y;
      this.difX=difX;
      this.difY=difY;
      this.col=col;
      this.radius=radius;
      this.wert=wert;
    }

    var randomRadius=(Math.random() * 100 % 11 + 10);
    var randomX=0;
    var randomY=0;
    while (randomX <= randomRadius || randomX >= width - randomRadius) {
      randomX=Math.random() * width;
    }
    while (randomY <= randomRadius || randomY >= height - randomRadius) {
      randomY=Math.random() * height;
    }
    var randomDifX=(Math.random() * speed -1);
    var randomDifY=(Math.random() * speed -1);
    var col='#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);
    var wert=Math.ceil(Math.random() * 100 % 10);
    var bubble=new object(randomX, randomY, randomDifX, randomDifY, randomRadius, col, wert);
    bubbleList.push(bubble);
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (var j=0; j < number; j++) {
      context.beginPath();
      context.arc(bubbleList[j].x, bubbleList[j].y, bubbleList[j].radius, 0, 2*Math.PI);
      context.stroke();
      context.fillStyle=bubbleList[j].col;
      context.fill();
      context.fillStyle="white";
      context.font="20px Helvetica";
      context.textAlign="center";
      context.textBaseline="middle";
      context.fillText(bubbleList[j].wert, bubbleList[j].x, bubbleList[j].y);
      context.strokeText(bubbleList[j].wert, bubbleList[j].x, bubbleList[j].y);
    }
    update();
  }

  function update() {
    for (var k=0; k < number; k++) {
      bubbleList[k].x += bubbleList[k].difX;
      bubbleList[k].y += bubbleList[k].difY;

      if (bubbleList[k].x - bubbleList[k].radius < 0) {
        bubbleList[k].difX=-(bubbleList[k].difX);
      }
      else if (bubbleList[k].x + bubbleList[k].radius > width) {
        bubbleList[k].difX=-(bubbleList[k].difX);
      }

      if (bubbleList[k].y - bubbleList[k].radius < 0) {
        bubbleList[k].difY=-(bubbleList[k].difY);
      }
      else if (bubbleList[k].y + bubbleList[k].radius > height) {
        bubbleList[k].difY=-(bubbleList[k].difY);
      }
    }
  }

  function beiKlick() {
    var rect=canvas.getBoundingClientRect();
    var clickX=(event.clientX - rect.left);
    var clickY=(event.clientY - rect.top);

    for (var l=0; l < number; l++) {
      var DistX=bubbleList[l].x - clickX;
      var DistY=bubbleList[l].y - clickY;
      var Dist=Math.sqrt(DistX * DistX + DistY * DistY);
      if (Dist < bubbleList[l].radius) {
        currentScore += bubbleList[l].wert;
        bubbleList.splice(l, 1, "hit");
      }
    }
    if (remainingBubbles() == 0) {
      beendeSpiel();
    }
    klicks++;
  }

  function updateTimer() {
    var d=new Date;
    date0=d.getTime();
    remainingTime=date1 - date0;
    var seconds=Math.floor(remainingTime / 1000);
    var milliSeconds=Math.floor(remainingTime % 1000);

    if(remainingTime <= 0){
      beendeSpiel();
    }
    else {
      if (seconds >= 10) {
        document.getElementById("bubbleCanvas").style.backgroundColor = "lightgreen";
        document.getElementById("start").style.backgroundColor = "lightgreen";
        if (milliSeconds < 100) {
          timer.innerHTML=seconds + ":0" + milliSeconds;
        }
        else if (milliSeconds < 10) {
          timer.innerHTML=seconds + ":00" + milliSeconds;
        }
        else if (milliSeconds == 0) {
          timer.innerHTML=seconds + ":000";
        }
        else {
          timer.innerHTML=seconds + ":" + milliSeconds;
        }
      }
      else if (seconds > 5) {
        document. getElementById("bubbleCanvas").style.backgroundColor = "lightsalmon";
        document. getElementById("start").style.backgroundColor = "lightsalmon";
        if (milliSeconds < 100) {
          timer.innerHTML="0" + seconds + ":0" + milliSeconds;
        }
        else if (milliSeconds < 10) {
          timer.innerHTML="0" + seconds + ":00" + milliSeconds;
        }
        else if (milliSeconds == 0) {
          timer.innerHTML="0" + seconds + ":000";
        }
        else {
          timer.innerHTML="0" + seconds + ":" + milliSeconds;
        }
      }
      else if (seconds >= 0) {
        document. getElementById("bubbleCanvas").style.backgroundColor = "lightcoral";
        document. getElementById("start").style.backgroundColor = "lightcoral";
        if (milliSeconds < 10) {
          timer.innerHTML="<strong>0" + seconds + ":0" + milliSeconds + "</strong>";
        }
        else if (milliSeconds < 10) {
          timer.innerHTML="<strong>0" + seconds + ":00" + milliSeconds + "</strong>";
        }
        else if (milliSeconds == 0) {
          timer.innerHTML="<strong>0" + seconds + ":000</strong>";
        }
        else {
          timer.innerHTML="<strong>0" + seconds + ":" + milliSeconds + "</strong>";
        }
      }
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

  runTimes++;
  }

  function generateGameOver() {
    var clicked = number - remainingBubbles();
    displayInsteadOfCanvas('gameOver');
    document.getElementById('count').innerHTML = number;
    document.getElementById('clicked').innerHTML = clicked;
    document.getElementById('points').innerHTML = currentScore;
    document.getElementById('clickCounter').innerHTML = klicks;
    if (klicks < clicked) {
      document.getElementById("gz").innerHTML = "<p><strong>WOAH!</strong></p><p>Du hast das (ann&auml;hernd) unmögliche geschafft und weniger geklickt als Du Bubbles getroffen hast. Respekt!</p>";
    }
    else if (klicks === clicked) {
      document.getElementById("gz").innerHTML = "<p>Respekt! Du hast f&uuml;r jede Bubble nur ein mal klicken m&uuml;ssen, um sie zu treffen. Nicht schlecht!</p>"
    }
    else if (number == clicked) {
      console.log("all");
      document.getElementById("gz").innerHTML = "<p> Herzlichen Gl&uuml;ckwunsch!</p><p>Du hast alle Bubbles getroffen. Versuch doch mal mehr Bubbles in der gleichen Zeit zu treffen.</p><p class='display'>Die Anzahl an Blasen kannst du in den Einstellungen ändern.</p>"//hier geht das mit den Einstellungen iwie nicht :(
    }
    else {
      document.getElementById("gz").innerHTML = "";
    }
  }

  function beendeSpiel() {
    timer.innerHTML="Neustarten";
    document. getElementById("start").style.backgroundColor = "green";
    console.log("Game Over!");
    clearInterval(mainInterval);
    clearInterval(timerInterval);
    context.clearRect(0, 0, width, height);
    bubbleList.splice(0, number, "");
    runTimes--;
    generateGameOver();
  }

}

function generateLeaderboardWithoutdisplay() {
  var name = document.playerInfo.playerName.value;
  var score = document.getElementById("points").innerHTML;
  var clicked = document.getElementById("clicked").innerHTML;
  var count = document.getElementById("count").innerHTML;
  var clicks = document.getElementById("clickCounter").innerHTML;
  var divLeaderboard = document.getElementById("leaderboard");

  var table = document.getElementById("tableLeaderboard");
  var row = table.insertRow(-1);
  var nameCell = row.insertCell(0);
  var scoreCell =  row.insertCell(1);
  var bubbleCell = row.insertCell(2);
  var clickCell = row.insertCell(3);

  nameCell.innerHTML = name;
  scoreCell.innerHTML = score;
  bubbleCell.innerHTML = "" + clicked + " / " + count + "";
  clickCell.innerHTML = clicks;
}

function generateLeaderboard() {
  generateLeaderboardWithoutdisplay();
  displayInsteadOfCanvas('leaderboard');
}

window.onload=paint;

/*notes
* Barrierefreiheit!
* fix bubbles anklicken!
* fix footer margin-top
* fix error on second game in same tab
*/
