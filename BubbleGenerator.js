function toggle(id) {
  var e = document.getElementById(id);
  if(e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';
    }

function updateDisplay(id, val) {
  document.getElementById(id).innerHTML = val;
}

function init() {

  var canvas = document.getElementById('bubbleCanvas');
  var context = canvas.getContext("2d");
  var height = canvas.height;
  var width = canvas.width;
  var number = document.getElementById('number').value;
  var speed = document.getElementById('speed').value;
  var bubbleList = new Array("");

  erzeugeBubbleMenge(number);
  draw();
  setInterval(draw, 30);

  function erzeugeBubbleMenge(number) {
    bubbleList.splice(0, bubbleList.length);
    for (var i = 0; i < number; i++) {
      erzeugeEinzelneBubble();
    }
  }

  function erzeugeEinzelneBubble() {
    //bubble object constructor
    var object = function(x, y, difX, difY, radius, col) {
      this.x = x;
      this.y = y;
      this.difX = difX;
      this.difY = difY;
      this.col = col;
      this.radius = radius;
      this.wert = Math.ceil(Math.random() * 100 % 10) + 1;
    }

    var randomRadius = (Math.random() * 100 % 11 + 10);
    var randomX = 0;
    var randomY = 0;
    while (randomX <= randomRadius || randomX >= width - randomRadius) {
      randomX = Math.random() * width;
    }
    while (randomY <= randomRadius || randomY >= height - randomRadius) {
      randomY = Math.random() * height;
    }
    var randomDifX = (Math.random() * speed -1);
    var randomDifY = (Math.random() * speed -1);
    var col = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);
    var bubble = new object(randomX, randomY, randomDifX, randomDifY, randomRadius, col);
    bubbleList.push(bubble);
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (var j = 0; j < number; j++) {
      context.beginPath();
      context.arc(bubbleList[j].x, bubbleList[j].y, bubbleList[j].radius, 0, 2*Math.PI);
      context.stroke();
      context.fillStyle = bubbleList[j].col;
      context.fill();
      context.fillStyle = "white";
      context.font = "20px Helvetica";
      context.textAlign="center";
      context.textBaseline="middle";
      context.fillText(bubbleList[j].wert, bubbleList[j].x, bubbleList[j].y);
      context.strokeText(bubbleList[j].wert, bubbleList[j].x, bubbleList[j].y);
    }
    update();
  }

  function update() {
    for (var k = 0; k < number; k++) {
      bubbleList[k].x += bubbleList[k].difX;
      bubbleList[k].y += bubbleList[k].difY;

      if (bubbleList[k].x - bubbleList[k].radius < 0) {
        bubbleList[k].difX = -(bubbleList[k].difX);
      }
      else if (bubbleList[k].x + bubbleList[k].radius > width) {
        bubbleList[k].difX = -(bubbleList[k].difX);
      }

      if (bubbleList[k].y - bubbleList[k].radius < 0) {
        bubbleList[k].difY = -(bubbleList[k].difY);
      }
      else if (bubbleList[k].y + bubbleList[k].radius > height) {
        bubbleList[k].difY = -(bubbleList[k].difY);
      }
    }
  }

  function beiKlick() {
    var rect = canvas.getBoundingClientRect();
    var clickX = (event.clientX - rect.left);
    var clickY = (event.clientY - rect.top);
    console.log("KlickX: " + clickX + " KlickY: " + clickY);

    for (var l = 0; l < number; l++) {
      var DistX = bubbleList[l].x - clickX;
      var DistY = bubbleList[l].y - clickY;
      var Dist = Math.sqrt(DistX * DistX + DistY * DistY);
      //console.log("Bubble" + l + ": DistX=" + DistX + " DistY=" + DistY);
      if (Dist < bubbleList[l].radius) {
        console.log("Bubble" + l + ": hit");
        bubbleList.splice(l, 1, "1");
      }
      else {
        console.log("Bubble" + l + ": Dist=" + Dist);
      }
    }
  }

canvas.addEventListener("click", beiKlick);

}
window.onload = init;

/*notes
*
* Am Ende window.onload löschen!!
* setInterval auf 26ms zurücksetzen
*/
