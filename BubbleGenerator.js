function init() {

  var canvas = document.getElementById('bubbleCanvas');
  var context = canvas.getContext("2d");
  var height = canvas.height;
  var width = canvas.width;
  var number = document.getElementById('number').value;
  var bubbleList = new Array("");

  erzeugeBubbleMenge(number);
  draw();
  setInterval(draw, 26);

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
    var randomDifX = (Math.random() * 7 -1);
    var randomDifY = (Math.random() * 7 -1);
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
      context.font = "14px Helvetica";
      context.textAlign="center";
      context.textBaseline="middle";
      context.fillText(bubbleList[j].wert, bubbleList[j].x, bubbleList[j].y);
    }
    update();
  }

  function update() {
    for (var l = 0; l < number; l++) {
      bubbleList[l].x += bubbleList[l].difX;
      bubbleList[l].y += bubbleList[l].difY;

      if (bubbleList[l].x - bubbleList[l].radius < 0) {
        bubbleList[l].difX = -(bubbleList[l].difX);
      }
      else if (bubbleList[l].x + bubbleList[l].radius > width) {
        bubbleList[l].difX = -(bubbleList[l].difX);
      }

      if (bubbleList[l].y - bubbleList[l].radius < 0) {
        bubbleList[l].difY = -(bubbleList[l].difY);
      }
      else if (bubbleList[l].y + bubbleList[l].radius > height) {
        bubbleList[l].difY = -(bubbleList[l].difY);
      }
    }
  }

}
window.onload = init;

/*notes
*
* Am Ende window.onload löschen!!
* setInterval auf 26ms zurücksetzen
*/
