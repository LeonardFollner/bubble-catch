/* ich habe mich bemüht es übersichtlich und kommentiert zu halten
 * es ist aber immer noch mit annähernd 1000 Zeilen Code weit mehr, als gefordert
 * wenn das zu viel zum durchgehen ist, einfach immer bei einem Switch, wenn möglich den Abzweig 0 wählen
 * gameMode "0" ist der Standardspielmodus, der die Anforderungen auch schon erfüllen sollte
*/

//unübersichtliche globale Variablendeklaration
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
var tails;
var name, score, clicked, count, clicks, divLeaderboard;
var table, row, nameCell, scoreCell;
var x, y, inserted, numberOfRows;
var runTimes = 0;
var firstRun = 1;
var countdownActive = 0;
var isRunning, pauseTime, size;
var gameMode, gameModeSelector;
var score;
name = "player1";

function paint() {                                                              //Funktion, um in den Canvas am Anfang schön bunt den Titel des Spiels zu zeichnen
  var title = document.getElementById("startCanvas");                           //Deklaration der Canvas Variablen
  var titleCtx = title.getContext("2d");
  var titleHeight = title.height;
  var titleWidth = title.width;
  titleCtx.textAlign = "center";                                                  //Festlegen der Titelanordnung
  titleCtx.textBaseline = "middle";
  titleCtx.font = "75px Helvetica";                                             //Feslegen des Aussehens des Titels
  var gradient = titleCtx.createLinearGradient(100, 0, 500, 0);                 //Erzeugen eines linearen Farbverlaufs als Füllung des Titels
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
  titleCtx.fillStyle = gradient;                                                //Festlegen des Farbverlaufes als Füllung des Titels
  titleCtx.fillText("Bubble-Catch", 300, 170);                                  //Titel schreiben mit Koordinaten (300,170)
  titleCtx.font = "25px Helvetica";                                             //neue Schriftgröße für den Untertitel
  titleCtx.fillText("zum Starten Klicken", 300, 230);                           //Untertitel schreiben mit Koordinaten (300, 230)
}

function toggleGameMode() {                                                     //Funktion, die in den Einstellungen je nach gewähltem Spielmodus die passende Beschreibung anzeigt
  gameModeSelector = document.getElementById("gameMode");                       //Variablendeklaration für die Auswahl des Spielmodus'
  gameMode = gameModeSelector.options[gameModeSelector.selectedIndex].value;

  divStandard = document.getElementById("standard");                            //Variablendeklaration für die Beschreibungen
  divOrdered = document.getElementById("ordered");
  divPuzzle = document.getElementById("puzzle");

  switch (gameMode) {                                                           //Switch zur Erkennung des richtigen Spielmodus'
    case "0":                                                                   //Spielmodus "Standard"
      divStandard.style.display = 'inline-block';                               //Anzeigen der Beschreibung für den Spielmodus "Standard"
      divOrdered.style.display = 'none';                                        //Ausblenden der anderen Beschreibungen
      divPuzzle.style.display = 'none';
      break;
    case "1":                                                                   //Spielmodus "Geordnet"
      divStandard.style.display = 'none';                                       //Ausblenden der anderen Beschreibungen
      divOrdered.style.display = 'inline-block';                                //Anzeigen der Beschreibung für den Spielmodus "Geordnet"
      divPuzzle.style.display = 'none';
      break;
    case "2":                                                                   //Spielmodus "Puzzle"
      divStandard.style.display = 'none';                                       //Aublenden der anderen Beschreibungen
      divOrdered.style.display = 'none';
      divPuzzle.style.display = 'inline-block';                                 //Anzeigen der Beschreibung für den Spielmodus "Puzzle"
      break;
  }
}

function updateDisplay(id, val) {                                               //Funktion, um in den Einstellungen die Anzeige zwischen dem Schieberegler und dem Zahlenkästchen zu synchronisieren
  document.getElementById(id).value = val;                                        //gleich setzen der Werte zwischen Regler und Zahlenkästchen
}

function toggleLeaderboard(id) {                                                //Funktion, die eine Tabelle mit der Bestenliste des Spielmodus' auswählt, der durch anklicken eines Knopfes gewähöt wurde
  divLeaderboard0 = document.getElementById('tableLeaderboard0');               //Variablendeklaration der Tabellen
  divLeaderboard1 = document.getElementById('tableLeaderboard1');
  divLeaderboard2 = document.getElementById('tableLeaderboard2');

  leaderboard0 = document.getElementById('leaderboard0');                       //Variablendeklaration der Auswahlbuttons
  leaderboard1 = document.getElementById('leaderboard1');
  leaderboard2 = document.getElementById('leaderboard2');

  switch (id) {                                                                 //Switch zur Unterscheidung der angeklickten Buttons
    case "leaderboard0":                                                        //Spielmodus "Standard"
      divLeaderboard0.style.display = 'inline-block';                           //Anzeigen der Bestenliste des Spielmodus' "Standrad"
      divLeaderboard1.style.display = 'none';                                   //Ausblenden der anderen Bestenlisten
      divLeaderboard2.style.display = 'none';

      leaderboard0.className = 'button buttonClicked';                          //Ändern der Klasse des angeklickten Buttons, um ihn als markiert darzustellen
      leaderboard1.className = 'button';                                        //Klassen der anderen Buttons auf Button-Standard zurück setzen
      leaderboard2.className = 'button';
      break;
    case "leaderboard1":                                                        //Spielmodus "Geordnet"
      divLeaderboard0.style.display = 'none';                                   //Ausblenden der anderen Bestenlisten
      divLeaderboard1.style.display = 'inline-block';                           //Anzeigen der Bestenliste des Spielmodus "Geordnet"
      divLeaderboard2.style.display = 'none';

      leaderboard0.className = 'button';                                        //Klassen der anderen Buttons auf Button-Standard zurück setzen
      leaderboard1.className = 'button buttonClicked';                          //Ändern der Klasse des angeklickten Buttons, um ihn als markiert darzustellen
      leaderboard2.className = 'button';
      break;
    case "leaderboard2":                                                        //Spielmodus "Puzzle"
      divLeaderboard0.style.display = 'none';                                   //Ausblenden der anderen Bestenlisten
      divLeaderboard1.style.display = 'none';
      divLeaderboard2.style.display = 'inline-block';                           //Anzeigen der Bestenliste des Spielmodus "Puzzle"

      leaderboard0.className = 'button';                                        //Klassen der anderen Buttons auf Button-Standard zurück setzen
      leaderboard1.className = 'button';
      leaderboard2.className = 'button buttonClicked';                          //Ändern der Klasse des angeklickten Buttons, um ihn als markiert darzustellen
      break;
  }
}

function displayInsteadOfCanvas(id){                                            //Funktion, die ändert, was in der Spielfläche angezeigt wird
  if (!countdownActive) {                                                       //deaktivieren der Änderung des Displays während der Countdown angezeigt wird
    divStartCanvas = document.getElementById("startCanvas");                    //Variablendeklaration für die anzuzeigenden Elemente
    divBubbleCanvas = document.getElementById("bubbleCanvas");
    divWelcome = document.getElementById("welcome");
    divDescription = document.getElementById("description");
    divSettings = document.getElementById("settings");
    divGameOver = document.getElementById("gameOver");
    divLeaderboard = document.getElementById("leaderboard");

    divDescriptionButton = document.getElementById("descriptionButton");        //Variablendeklaration für die aktivierenden Buttons
    divLeaderboardButton = document.getElementById("leaderboardButton");
    divSettingsButton = document.getElementById("settingsButton");

    divWarning1 = document.getElementById("warning1");                          //Variablendeklarartion für die Warnungen, die eventuell während eines laufenden Spiels angezeigt werden, wenn man die Einstellungen öffnen will
    divWarning2 = document.getElementById("warning2");

    switch (id) {                                                               //Switch für das, was angezeigt werden soll
      case "bubbleCanvas":                                                      //Spielfläche soll gezeigt werden
        if (divGameOver.style.display == 'inline-block') {                      //für den Fall, dass gerade der Bildschirm "GameOver" angezeigt wird
          generateLeaderboardWithoutdisplay();                                  //soll erst der Eintrag in die Bestenliste erfolgen, ohne diese anzuzeigen, bevor ein neues Spiel gestartet werden kann
        }
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='inline-block';                           //Anzeigen der Spielfläche
        divWelcome.style.display='none';                                        //Ausblenden der restlichen Elemente
        divDescription.style.display='none';
        divSettings.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';

        divDescriptionButton.className = 'button buttonList';                   //Zurücksetzen der Buttons auf unangeklickten Zustand
        divLeaderboardButton.className = 'button buttonList';
        divSettingsButton.className = 'button buttonList';
        break;
      case "welcome":                                                           //beim erten Start des Spiels soll eine Nachricht angezeigt werden
        divStartCanvas.style.display='none';
        divBubbleCanvas.style.display='none';
        divWelcome.style.display='inline-block';                                //Anzeigen des Wilkommensbildschirms
        divDescription.style.display='none';                                    //Ausblenden der restlichen Elemente
        divSettings.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='none';
        divWarning1.style.display = 'none';
        divWarning2.style.display = 'none';

        divDescriptionButton.className = 'button buttonList';                   //Zurücksetzen der Buttons auf unangeklickten Zustand
        divLeaderboardButton.className = 'button buttonList';
        divSettingsButton.className = 'button buttonList';
        firstRun = 0;                                                           //Deaktivieren des Startbildschirms
        break;
      case "description":                                                       //Beschreibung soll angezeigt werden
        if (divDescription.style.display == 'inline-block') {                   //wenn die Beschreibung bereits angezeigt wird
          if (runTimes === 0) {                                                 //und gerade kein Spiel läuft
            divStartCanvas.style.display = 'inline-block';                      //soll der Titelbildschirm angezeigt werden
            divDescription.style.display = 'none';
            divDescriptionButton.className = 'button buttonList';               //zurücksetzen des Buttons auf unangeklickten Zustand
          }
          else {                                                                //wenn gereade ein Spiel läuft
            divBubbleCanvas.style.display = 'inline-block';                     //soll die Spielfläche wieder angezeigt werden
            divDescription.style.display = 'none';
            divDescriptionButton.className = 'button buttonList';               //zurücksetzen des Buttons auf unangeklickten Zustand
          }
        }
        else {                                                                  //wenn die Beschreibung gerade nicht angezeigt wird
          if (divGameOver.style.display == 'inline-block') {                    //wenn gerade der Bildschirm "Game Over" angezeigt wird
            generateLeaderboardWithoutdisplay();                                //muss erst der Eintrag in die Bestenliste erfolgen, ohne diese anzuzeigen
            divStartCanvas.style.display = 'none';                              //andere Elemente ausblenden
            divBubbleCanvas.style.display = 'none';
            divDescription.style.display = 'inline-block';                      //Anzeigen der Beschreibung
            divDescriptionButton.className = 'button buttonClicked buttonList'; //Beschreibungsbutton angeklickt darzustellen
          }
          else {                                                                //wenn die Einstellungen oder die Bestenliste angezeigt werden
            if (runTimes !== 0) {                                               //wenn gerade ein Spiel läuft
              pause("stop");                                                    //wird das Spiel pausiert
            }
            divStartCanvas.style.display = 'none';                              //Ausblenden der Canvase
            divBubbleCanvas.style.display = 'none';
            divDescription.style.display = 'inline-block';                      //Anzeigen der Beschreibung
            divDescriptionButton.className = 'button buttonClicked buttonList'; //Beschreibungsbutton angeklickt darzustellen
          }
        }
        divWelcome.style.display = 'none';                                      //Ausblenden der anderen Elemente
        divSettings.style.display = 'none';
        divGameOver.style.display = 'none';
        divLeaderboard.style.display = 'none';
        divWarning1.style.display = 'none';                                     //Ausblenden der Warnungen
        divWarning2.style.display = 'none';
        divLeaderboardButton.className = 'button buttonList';                   //andere Buttons als unangeklickt darstellen
        divSettingsButton.className = 'button buttonList';
        break;
      case "settings":                                                          //Einstellungen sollen angezeigt werden
        if (runTimes !== 0) {                                                   //wenn gerade ein Spiel läuft
          if (divBubbleCanvas.style.display === 'inline-block') {               //wenn ein Spiel läuft && die Spielfläche schon angezeigt wird
            divWarning1.style.display = 'inline-block';                         //soll Warnung 1 eingeblendet
            divWarning2.style.display = 'none';                                 //und Warnung 2 ausgeblendet werden
          }
          else {                                                                //wenn ein Spiel läut, aber die Spielfläche nicht angezeigt wird
            divWarning1.style.display = 'none';                                 //soll Warnung 1 ausgeblendet
            divWarning2.style.display = 'inline-block';                         //und Warnung 2 eingeblendet werden
          }
          divStartCanvas.style.display = 'none';
          divBubbleCanvas.style.display = 'inline-block';                       //Einblenden der Spielfläche
          divSettings.style.display = 'none';                                   //Ausblenden der Einstellungen
          divSettingsButton.className = 'button buttonList';                    //Einstellungsbutton als unnangeklickt darstellen
        }
        else if (divSettings.style.display == 'inline-block') {                 //wenn kein Spiel läuft && die Einstellungen bereits angezeigt werden
          divStartCanvas.style.display='inline-block';                          //soll der Titel eingeblendet werden
          divSettings.style.display='none';                                     //ausblenden der anderen Elemente
          divWarning1.style.display = 'none';                                   //Ausblenden der Warnungen
          divWarning2.style.display = 'none';
          divSettingsButton.className = 'button buttonList';                    //Einstellungsbutton als unnangeklickt darstellen
        }
        else if (divGameOver.style.display == 'inline-block') {                 //wenn kein Spiel läuft && der Bildschirm "GameOver" gerade angezeigt wird
          generateLeaderboardWithoutdisplay();                                  //sollerst der Bestenliste angezeigt werden, ohne sie anzuzeigen
          divStartCanvas.style.display='none';                                  //Ausblenden der anderen Elemente
          divBubbleCanvas.style.display='none';
          divSettings.style.display='inline-block';                             //Anzeigen der Einstellungen
          divWarning1.style.display = 'none';                                   //Ausblenden der Warnungen
          divWarning2.style.display = 'none';
          divSettingsButton.className = 'button buttonClicked buttonList';      //Einstellungsbutton als angeklickt darstellen
        }
        else {                                                                  //wenn kein Spiel läuft und Beschreibung oder Bestenliste angezeigt werden
          divStartCanvas.style.display='none';                                  //Ausblenden der Canvase
          divBubbleCanvas.style.display='none';
          divSettings.style.display='inline-block';                             //Einblenden der Einstellungen
          divWarning1.style.display = 'none';                                   //Ausblenden der Warnungen
          divWarning2.style.display = 'none';
          divSettingsButton.className = 'button buttonClicked buttonList';      //Einstellungsbutton als angeklickt darstellen
        }
        divWelcome.style.display = 'none';                                      //Ausblenden der anderen Elemente
        divDescription.style.display = 'none';
        divGameOver.style.display = 'none';
        divLeaderboard.style.display = 'none';
        divDescriptionButton.className = 'button buttonList';                   //andere Buttons als unangeklickt darstellen
        divLeaderboardButton.className = 'button buttonList';
        break;
      case "gameOver":                                                          //"GameOver" soll angezeigt werden
        divStartCanvas.style.display = 'none';                                  //Ausblenden der anderen Elemente
        divBubbleCanvas.style.display = 'none';
        divWelcome.style.display = 'none';
        divDescription.style.display = 'none';
        divSettings.style.display = 'none';
        divGameOver.style.display = 'inline-block';                             //Einblenden des Bildschirms "GameOver"
        divLeaderboard.style.display = 'none';
        divWarning1.style.display = 'none';                                     //Ausblenden der Warnungen
        divWarning2.style.display = 'none';
        break;
      case "leaderboard":                                                       //Bestenliste soll angezeigt werden
        if (divLeaderboard.style.display == 'inline-block') {                   //wenn die Bestenliste bereits angezeigt wird
          if (runTimes === 0) {                                                 //und gerade kein Spiel läuft
            divStartCanvas.style.display = 'inline-block';                      //soll der Titelbildschirm angezeigt werden
            divBubbleCanvas.style.display = 'none';
            divLeaderboard.style.display = 'none';
            divLeaderboardButton.className = 'button buttonList';               //Darstellen des Bestenlistenbuttons als unangeklickt
          }
          else {                                                                //wenn gerade ein Spiel läuft
            divStartCanvas.style.display = 'none';
            divBubbleCanvas.style.display = 'inline-block';                     //soll die Spielfläche angezeigt werden
            divLeaderboard.style.display = 'none';
            divLeaderboardButton.className = 'button buttonList';               //Darstellen des Bestenlistenbuttons als unangeklickt
          }
        }
        else if (divGameOver.style.display == 'inline-block') {                 //wenn der Bildschirm "GameOver" angezeigt wird
          generateLeaderboardWithoutdisplay();                                  //soll der Eintrag in die Bestenliste geschrieben werden
          divBubbleCanvas.style.display = 'none';
          divLeaderboard.style.display = 'inline-block';                        //und die Bestenliste angezeigt werden
          divLeaderboardButton.className = 'button buttonClicked buttonList';   //Darstellen des Bestenlistenbuttons als angeklickt
        }
        else {                                                                  //wenn gerade die Einstellungen oder die Beschreibung angezeigt werden
          divStartCanvas.style.display = 'none';
          divBubbleCanvas.style.display = 'none';
          divLeaderboard.style.display = 'inline-block';                        //Anzeigen der Bestenliste
          divLeaderboardButton.className = 'button buttonClicked buttonList';   //Darstellen des Bestenlistenbuttons als angeklickt
        }
        if (runTimes !== 0) {                                                   //wenn gerade ein Spiel läuft
          pause("stop");                                                        //soll dieses pusiert werden
        }
        divWelcome.style.display = 'none';                                      //Ausblenden der anderen Elemente
        divDescription.style.display = 'none';
        divSettings.style.display = 'none';
        divGameOver.style.display = 'none';
        divWarning1.style.display = 'none';                                     //Ausblenden der Warnungen
        divWarning2.style.display = 'none';

        divDescriptionButton.className = 'button buttonList';                   //Darstellen der anderen Butons als unangeklickt
        divSettingsButton.className = 'button buttonList';

        switch (gameMode) {                                                     //anzeigen der dem gewählten Spielmodus entsprechenden Bestenliste
          case "0":                                                             //Spielmodus "Standard"
            toggleLeaderboard("leaderboard0");
            break;
          case "1":                                                             //Spielmodus "Geordnet"
            toggleLeaderboard("leaderboard1");
            break;
          case "2":                                                             //Spielmodus "Puzzle"
            toggleLeaderboard("leaderboard2");
            break;
        }
        break;
      case "gameOverButton":                                                     //Extrafall, wenn der Button im Bildschirm "GameOver" gklickt wird
        divStartCanvas.style.display='none';                                    //Ausblenden der anderen Elemente
        divBubbleCanvas.style.display='none';
        divWelcome.style.display='none';
        divDescription.style.display='none';
        divSettings.style.display='none';
        divGameOver.style.display='none';
        divLeaderboard.style.display='inline-block';                            //Einblenden der Bestenliste
        divWarning1.style.display = 'none';                                     //Ausblenden der Warnungen
        divWarning2.style.display = 'none';
        switch (gameMode) {                                                     //anzeigen der dem gewählten Spielmodus entsprechenden Bestenliste
          case "0":                                                             //Spielmodus "Standard"
            toggleLeaderboard("leaderboard0");
            break;
          case "1":                                                             //Spielmodus "Geordnet"
            toggleLeaderboard("leaderboard1");
            break;
          case "2":                                                             //Spielmodus "Puzzle"
            toggleLeaderboard("leaderboard2");
            break;
        }
        break;
      default:                                                                  //just in case...
        console.log("something went wrong");
    }
  }
}

/*
 █████   ██████ ████████ ██    ██  █████  ██           ██████   █████  ███    ███ ███████
██   ██ ██         ██    ██    ██ ██   ██ ██          ██       ██   ██ ████  ████ ██
███████ ██         ██    ██    ██ ███████ ██          ██   ███ ███████ ██ ████ ██ █████
██   ██ ██         ██    ██    ██ ██   ██ ██          ██    ██ ██   ██ ██  ██  ██ ██
██   ██  ██████    ██     ██████  ██   ██ ███████      ██████  ██   ██ ██      ██ ███████
*/

function start() {                                                              //Funktion, alles startet
  if (firstRun == 1) {                                                          //beim ersten Start soll ein Willkommenbildschirm angezeigt werden
    displayInsteadOfCanvas("welcome");
  }
  else {                                                                        //wenn das Spiel nicht zum ersten mal gestartet wird
    if (runTimes !== 0) {                                                       //wenn gerade ein Spiel läuft
      if (!countdownActive) {                                                   //wenn der Countdown nicht läuft
        if (isRunning) {                                                        //und das Spiel nicht pausiert ist
          pause("stop");                                                        //wird es pausiert
        }
        else {
          if (divBubbleCanvas.style.display == 'none') {                        //wenn die Spielfläche gerade nicht angezeigt wird
            displayInsteadOfCanvas('bubbleCanvas');                             //soll die Spielfläche angezeigt werden
          }
          else {                                                                //wenn die Spielfläche angezeigt wird
            pause("play");                                                      //wird das Spiel pausiert
          }
        }
      }
    }
    else {                                                                      //wenn gerade kein Spiel läuft
      console.log("Spiel gestartet, weil " + runTimes + " Spiele gerade laufen");   //Konsolenlog, dass jetzt ein Spiel gestartet wird
      runTimes = 1;                                                               //Variable, die angibt, ob gerade ein Spiel läuft, auf 'true' setzen
      isRunning=1;                                                              //Variable, die angibt, ob das Spiel gerade pausiert ist, auf 'false' setzen
      displayInsteadOfCanvas('bubbleCanvas');                                   //Spielfläche anzeigen
      init();                                                                   //eigentliche Spielmechanik Starten
    }
  }
}

function init() {                                                               //Funktion, die die Spielmechanik in Gang setzt
  canvas = document.getElementById('bubbleCanvas');                             //Deklaration der Canvasvariablem
  context = canvas.getContext("2d");
  height = canvas.height;
  width = canvas.width;
  bubbleList = new Array("");                                                   //Erstellen eines Arrays, in dem die Bubbles abgelegt werden
  currentScore = 0;                                                             //den aktuellen Score

  number = document.getElementById('number').value;                             //Abfragen der in den Einstelleungen gewählten Anzahl an Bubbles
  speed = document.getElementById('speed').value;                               //Abfragen der in den Einstellungen gewählten maximalen Geschwindigkeit
  left = number;                                                                //die Anzehal der verbleibenden Bubbles gleich der Startanzahl der Bubbles setzen
  if (document.getElementById('sound').checked) {                               //wenn in den Einstellungen der Sound aktiviert wurde
    sound = 1;                                                                  //die Variable Sound auf 'true' setzen
  }
  else {
    sound = 0;                                                                  //ansonsten die Variable Sound auf 'false' setzen
  }
  if (document.getElementById('tails').checked) {                               //wenn in den Einstellungen Pfade aktiviert wurden
    tails = 1;                                                                  //die Pfadvariable auf 'true' setzen
  }
  else {
    tails = 0;                                                                  //ansonsten die Pfadvariable auf 'false' setzen
  }
  gameModeSelector = document.getElementById("gameMode");                       //Deklaration des Auswahlfeldes für den Spielmodus
  gameMode = gameModeSelector.options[gameModeSelector.selectedIndex].value;    //Abfragen, welcher Spielmodus gewählt wurde
  if (gameMode == 2) {currentScore = number;}                                   //im Spielmodus "Puzzle" soll der aktuelle Score die Anzahl der verbleibenden Bubbles anzeigen

  timer = document.getElementById('start');                                     //Variablendeklaration füür die Position des Timers
  date = new Date();                                                            //Deklaration einer neuen Datumsvariable
  date0 = date.getTime();                                                       //Feststellen der aktuellen Zeit und Speichern in einer Variablen
  dateC = date0+3700;                                                           //das Ende des StartCountdowns berechnen und in einer Variablen speichern
  klicks = 0;                                                                   //zurücksetzen des Klickcounters

  size = 100;                                                                   //Festlegen der Schriftgröße für den StartCountdown
  countdownInterval = setInterval(countdown, 1);                                //Countdown starten und jede Millisekunde ein Mal aufrufen
}

function countdown() {                                                          //Funktion, die vor Spielbeginn einen Countdown anzeigt
  d = new Date();                                                               //Deklaration einer neuen Datumsvariable
  date0 = d.getTime();                                                          //Speichern der aktuellen Zeit
  remainingTime = dateC - date0;                                                //Berechnen der für den Countdown verbleibenden Zeit
  seconds = Math.floor(remainingTime / 1000);                                   //Umrechnen der verbleibenden Zeit in Sekunden
  milliSeconds = Math.floor(remainingTime % 1000);                              //und Millisekunden

  document.getElementById("bubbleCanvas").style.backgroundColor = "transparent";  //Löschen der Hintergrundfarbe des Spielfeldes von vergangenen Spielen
  document.getElementById("start").style.color = "#000000";                     //Farbe der Timerschrift auf schwarz setzen
  document.getElementById("start").style.backgroundColor = "#d3d3d3";           //Hintergrundfarbe des Timers auf Standard zurück setzen

  if(seconds < 0){                                                              //wenn keine Zeit mehr verbleibt
    if (gameMode === "0") {                                                     //wenn der gewählte Spielmodus "Standard" ist
      date1 = date0 + 30000;                                                    //wird die Endzeit des Spieles auf 30000 Millisekunden nach der aktuellen Zeit festgelegt
    }
    countdownActive = 0;                                                        //Ändern der Variable, die angibt, ob der Startcountdown gerade läuft, zu 'false'
    timerInterval = setInterval(updateTimer, 1);                                //Aufrufen der eigentlichen Timerfunktion und weiterer Aufruf jede Millisekunde
    erzeugeBubbleMenge(number);                                                 //Funktion aufrufen, die die Bubbles erzeugt
    mainInterval = setInterval(draw, 26);                                       //Aufrufen der Zeichenfunktion und weiteres Aufrufen alle 26 Millisekunden
    canvas.addEventListener("click", beiKlick);                                 //Eventlistener zur Spielfläche hinzufügen
    context.clearRect(0, 0, width, height);                                     //Leeren der Spielfläche
    clearInterval(countdownInterval);                                           //Stoppen des wiederholten Aufrufens der Timerfunktion
  }
  else {                                                                        //wenn der Startcountdown noch weiter laufen soll
    countdownActive = 1;                                                        //Setzen der Variable, die angibt, dass der Countdown noch läuft auf 'true'
    context.clearRect(0, 0, width, height);                                     //die Spielfläche leeren
    context.fillStyle = "#ff0000";                                              //Schriftfarbe auf Rot setzen
    context.font = size+"px Helvetica";                                         //setzen der Schriftart auf Helvetica und der Schriftgröße auf eine Variable
    context.textAlign = "center";                                               //Text mittig ausrichten
    context.textBaseline = "middle";
    if (seconds>0) {                                                            //wenn noch mehr als 0 Sekunden Zeit verbleiben
      context.fillText(seconds, 300, 200);                                      //in die Mitte der Spielfläche die Sekunden bis zum Start schreiben
      timer.innerHTML = "<strong>"+seconds+"</strong>";                         //ändern des Timers auf die aktuell verbleibende Sekundenzahl
    }
    else {                                                                      //wenn weniger als eine Sekunde verbleibt
      context.fillText("LOS!", 300, 200);                                       //in die Spielfläche "LOS!" schreiben
      timer.innerHTML = "<strong>LOS!</strong>";                                //ebenso in den Timer
    }
    size++;                                                                     //Erhöhen der Schriftgröße um 1px
    if (milliSeconds<20) {                                                      //wenn weniger als 20 Millisekunden der aktuellen Sekunde des StartCountdowns verbleiben
      size = 100;                                                               //soll die Schriftgröße auf 100px zurückgesetzt werden
    }
  }
}

function erzeugeBubbleMenge(number) {                                           //Funktion, die 'number' oft eine Bubble erzeugt
  bubbleList.splice(0, bubbleList.length);                                      //Löschen der Bubbleliste aus vorherigen Spielen
  for (var i=0; i < number; i++) {                                              //'number' oft
    erzeugeEinzelneBubble();                                                    //die Funktion zur Erzeugung einzelner Bubbles aufrufen
  }
}

function erzeugeEinzelneBubble() {                                              //Funktion, die die einzelnen Bubbles generiert
  var object=function(x, y, difX, difY, radius, col, val) {                     //bubble object constructor
    this.x = x;                                                                 //festlegen der übergebenen Werte als Eigenschaften der neuen Bubble
    this.y = y;                                                                 //Y-Position der Mitte
    this.difX = difX;                                                           //Geschwindigkeit entlang der X-Achse
    this.difY = difY;                                                           //Geschwindigkeit entlang der X-Achse
    this.col = col;                                                             //Farbe der Bubble
    this.radius = radius;                                                       //Radius der Bubble
    this.val = val;                                                             //Wert der Bubble
  };
  randomRadius = (Math.random() * 100 % 11 + 10);                               //Erzeugen eines zufälligen Radius'
  do {
    randomX = Math.random() * width;                                            //Berechne eine zufällige X-Position der Mitte der Bubble innerhalb der Breite der Spielfläche
  }
  while (randomX <= randomRadius || randomX >= width - randomRadius);           //so lange eine neue X-Position berechnen, wie der Rand der Bubble bei der aktuellen X-Position über den Rand der Spielfläche links oder rechs hinausragen würde

  do {
    randomY = Math.random() * height;                                           //Berechne eine zufällige Y-Position der Mitte der Bubble innerhalb der Höhe der Spielfläche
  }
  while (randomY <= randomRadius || randomY >= height - randomRadius);          //so lange eine neue Y-Position berechnen, wie der Rand der Bubble bei der aktuellen Y-Position über den Rand der Spielfläche oben oder unten hinausragen würde
  randomDifX = (Math.random() * speed - speed / 2);                             //Berechung einer zufälligen Geschwindigkeit entlang der X-Achse (positiv oder negativ) unter Beachtung der gewählten maximalen Geschwindigkeit
  randomDifY = (Math.random() * speed - speed / 2);                             //Berechung einer zufälligen Geschwindigkeit entlang der Y-Achse (positiv oder negativ) unter Beachtung der gewählten maximalen Geschwindigkeit
  randomCol = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);  //Erzeugen des hex-Wertes einer zufälligen RGB-Farbe
  if (gameMode != 2) {                                                          //Wenn der GameMode nicht "Puzzle" ist
    randomVal = Math.ceil(Math.random() * 100 % 10);                            //wird zusätzlich noch ein zufälliger Wert zwischen 0 und 11 für jede Bubble generiert
    if (gameMode == 1) {                                                        //wenn der GameMode "Geordnet" ist
      while (counter != bubbleList.length) {                                    //solange die Anzahl der Bubbles, die nicht den gleichen Wert wie die aktuell zu erzeugende Bubble haben, nicht gleich der Anzahl aller bisher erzeugten Bubbles ist
        counter = 0;                                                            //wird der Counter der Bubbles, die nicht den gleichen Wert wie die gerade zu erzeugende Bubble haben wieder auf 0 gesetzt
        for (var a=0; a < bubbleList.length; a++) {                             //für alle bisher erzeugten Bubbles
          if (randomVal == bubbleList[a].val) {                                 //wenn der Wert der zu erzeugenden Bubble gleich dem einer bereits existierenden Bubble ist
            randomVal = Math.ceil(Math.random() * 100 % number);                //wird der Wert der zu erzeugenden Bubble neu berechnet
            counter = 0;                                                        //und der Counter wieder zurückgesetzt
          }
          else {
            counter++;                                                          //wenn die Werte nicht übereinstimmen, wird der Counter um 1 erhöht
          }
        }
      }                                                                         //erst, wenn alle Werte zu dem gerade erzeugten Wert verschieden sind, hört die Neuberechnung des Wertes auf
    }
  }
  bubble = new object(randomX, randomY, randomDifX, randomDifY, randomRadius, randomCol, randomVal);  //erzeugen eines neuen Objektes mit den berechneten Eigenschaften
  bubbleList.push(bubble);                                                      //Speichern der gerade erzeugten Bubble am Ende des Arrays
}

function draw() {                                                               //Funktion, die die Bubbles in der Spielfläche zeichnet
  if (!tails) {context.clearRect(0, 0, width, height);}                         //Leeren der Spielfläche, wenn keine Pfade gezeichnet werden sollen
  for (var j=0; j < number; j++) {                                              //für alle Bubbles
    context.beginPath();
    context.arc(bubbleList[j].x, bubbleList[j].y, bubbleList[j].radius, 0, 2*Math.PI);  //Zeichnen eines Kreises um die Koordinaten X & Y der Bubble mit dem entsprechenden Radius
    context.strokeStyle = "#000000";                                            //Umrandungsfarbe auf schwarz setzen
    context.stroke();                                                           //umranden
    context.fillStyle = bubbleList[j].col;                                      //Füllfarbe auf die entsprechende Farbe setzen
    context.fill();                                                             //Füllen
    if (gameMode != 2) {                                                        //Wenn der Spielmodus nicht "Puzzle" ist
      context.fillStyle = "#ffffff";                                            //Füllfarbe auf Weiß setzen
      context.font = "20px Helvetica";                                          //Schriftart und -größe festlegen
      context.textAlign = "center";                                             //Textpositionierung auf mittig setzen
      context.textBaseline = "middle";
      context.fillText(bubbleList[j].val, bubbleList[j].x, bubbleList[j].y);    //Wert der Bubble in Weiß schreiben
      context.strokeText(bubbleList[j].val, bubbleList[j].x, bubbleList[j].y);  //Wert der Bubble in Schwarz umranden
    }
    context.fillStyle = "#000000";                                              //Füllfarbe auf Schwarz setzen
    context.font = "20px Helvetica";                                            //Schriftart und -größe festlegen
    context.textAlign = "end";                                                  //Textausrichtung rechtsbündig
    context.textBaseline = "top";
    context.fillText(currentScore, 580, 20);                                    //aktuellen Punktstand in die rechte obere Ecke schreiben
  }
  update();                                                                     //Funktion aufrufen, die die neue Position der Bubbles berechnet
}

function update() {                                                             //Funktion, die die Bubbles bewegt
  for (var k=0; k < number; k++) {                                              //für alle Bubbles
    bubbleList[k].x += bubbleList[k].difX;                                      //Ändern der X-Position um die Geschwindigkteit entlang der X-Achse
    bubbleList[k].y += bubbleList[k].difY;                                      //Ändern der Y-Position um die Geschwindigkteit entlang der Y-Achse

    if (bubbleList[k].x - bubbleList[k].radius < 0) { //left                    //Ändern der Richtung der Bubble, wenn der Rand der Bubble den linken Spielfeldrand berührt
      bubbleList[k].difX = -(bubbleList[k].difX);
    }
    else if (bubbleList[k].x + bubbleList[k].radius > width) { //right
      bubbleList[k].difX = -(bubbleList[k].difX);
    }

    if (bubbleList[k].y - bubbleList[k].radius < 0) { //top
      bubbleList[k].difY = -(bubbleList[k].difY);
    }
    else if (bubbleList[k].y + bubbleList[k].radius > height) { //bottom
      bubbleList[k].difY = -(bubbleList[k].difY);
    }
  }
}

function updateTimer() {                                                        //Funktion, die dem Spieler die verbleibende oder schon verstrichene Zeit anzeigt
  if (gameMode === "0") {                                                       //Für den Spielmodus "Standard" soll die verbleibende Spielzeit angezeigt werden
    d = new Date();                                                             //Deklaration einer neuen Datumsvariablen
    date0 = d.getTime();                                                        //Speichern der aktuellen Zeit
    remainingTime = date1 - date0;                                              //Berechnen der verbleibenden Zeit relativ zum Enddatum
    seconds = Math.floor(remainingTime / 1000);                                 //Berechnen der verbleibenden Sekunden
    milliSeconds = Math.floor(remainingTime % 1000);                            //Berechnen der verbleibenden Sekunden

    if(remainingTime <= 0){                                                     //wenn die Zeit abgelaufen ist
      beendeSpiel();                                                            //soll das Spiel beendet werden
    }
    else {                                                                      //wenn noch Zeit verbleibt
      if (seconds >= 10) {                                                            //keine Lust das alles zu kommentieren
        document.getElementById("bubbleCanvas").style.backgroundColor = "#90ee90";    //diese 49 Zeilen sorgen dafür, dass der Timer ausgegeben wird
        document.getElementById("start").style.backgroundColor = "#90ee90";           //und eventuell mehrere Nullen eingefügt werden, damit sich die Breite der Anzeige nicht alle paar Millisekunden ändert
        if (milliSeconds < 100) {                                                     //leider klappt das aber noch nicht immer
          timer.innerHTML = seconds + ":0" + milliSeconds;
        }
        else if (milliSeconds < 10) {
          timer.innerHTML = seconds + ":00" + milliSeconds;
        }
        else if (milliSeconds === 0) {
          timer.innerHTML = seconds + ":000";
        }
        else {
          timer.innerHTML = seconds + ":" + milliSeconds;
        }
      }
      else if (seconds > 5) {
        document. getElementById("bubbleCanvas").style.backgroundColor = "#ffa07a";   //Färben von Timer und Spielfläche
        document. getElementById("start").style.backgroundColor = "#ffa07a";
        if (milliSeconds < 100) {
          timer.innerHTML = "0" + seconds + ":0" + milliSeconds;
        }
        else if (milliSeconds < 10) {
          timer.innerHTML = "0" + seconds + ":00" + milliSeconds;
        }
        else if (milliSeconds === 0) {
          timer.innerHTML = "0" + seconds + ":000";
        }
        else {
          timer.innerHTML = "0" + seconds + ":" + milliSeconds;
        }
      }
      else if (seconds >= 0) {
        document. getElementById("bubbleCanvas").style.backgroundColor = "#f08080";   //Färben von Timer und Spielfläche
        document. getElementById("start").style.backgroundColor = "#f08080";
        if (milliSeconds < 10) {
          timer.innerHTML = "<strong>0" + seconds + ":0" + milliSeconds + "</strong>";
        }
        else if (milliSeconds < 10) {
          timer.innerHTML = "<strong>0" + seconds + ":00" + milliSeconds + "</strong>";
        }
        else if (milliSeconds === 0) {
          timer.innerHTML = "<strong>0" + seconds + ":000</strong>";
        }
        else {
          timer.innerHTML = "<strong>0" + seconds + ":" + milliSeconds + "</strong>";
        }
      }
    }
  }
  else {                                                                        //Für die Spielmodi "Geordnet" und "Puzzle" soll die schon gespielte Zeit angezeigt werden
    d = new Date();                                                             //Deklaration einer neuen Datumsvariablen
    date1 = d.getTime();                                                        //Speichern der aktuellen Zeit
    remainingTime = date1-date0;                                                //die Variable "remainingTime" speichert hier die schon verstrichene Zeit ... schreckliche Namenswahl
    minutes = Math.floor(remainingTime / 1000 / 60);                            //Berechnen der verstrichenen Minuten
    seconds = Math.floor(remainingTime / 1000 % 60);                            //Berechnen der verstrichenen Sekunden
    milliSeconds = Math.ceil(Math.floor(remainingTime % 1000)/100)%10;          //Berechnen der ersten Stelle der verstrichenen Millisekunden
    if (minutes !== 0) {                                                        //Ausgabe der verstrichenen Zeit so lange noch keine Minute vergangen ist
      if (seconds < 10) {
        timer.innerHTML = minutes + ":0" + seconds + ":" + milliSeconds;
      }
      else {
        timer.innerHTML = minutes + ":" + seconds + ":" + milliSeconds;
      }
    }
    else {                                                                      //Ausgabe der Zeit nach mehr als einer Minute
      timer.innerHTML = seconds + ":" + milliSeconds;
    }
    document.getElementById("start").style.backgroundColor = "#90ee90";         //Färben des Timers
    document.getElementById("bubbleCanvas").style.backgroundColor = "#90ee90";  //Färben des Spielfeldhintergrundes
  }
}

function pause(status) {                                                        //Funktion, die das Spiel pausieren und fortsetzen kann
  if (status == "stop") {                                                       //das Spiel soll gestoppt werden
      date2 = new Date();                                                       //Deklaration einer neuen Datumsvariablen
      datePaused = date2.getTime();                                             //Speichern der Zeit zu der dasd Spiel pausiert wurde
      isRunning = 0;                                                            //Variable, die angibt, ob das Spiel läuft, auf 'false' setzen
      console.log("Pausiert");                                                  //Konsolenlog, dass das Spiel pausiert wurde

      clearInterval(mainInterval);                                              //wiederholten Aufruf der Zeichenfunktion unterbrechen
      clearInterval(timerInterval);                                             //wiederholten Aufruf der Timerfunktion unterbrechen
      timer.innerHTML = "<strong>Pausiert</strong>";                            //Ändern des Timertextes zu "Pausiert"

      context.clearRect(0, 0, width, height);                                   //Leeren der Zeichenfläche
      context.fillStyle = "#000000";                                            //Ändern der Füllfarbe zu scharz
      context.font = "75px Helvetica";                                          //Ändern der Schriftgröße
      context.textAlign = "center";                                             //Textausrichtung auf mittig ändern
      context.textBaseline = "middle";
      context.fillText("Pausiert", 300, 170);                                   //"Pausiert" in Spielfläche schreiben
      context.font = "25px Helvetica";                                          //Ändern der Schriftgröße
      context.fillText("zum Fortsetzen Klicken", 300, 230);                     //Anweisung zum Fortsetzen des Spiels schreiben
  }
  else {                                                                        //Wenn das Spiel fortgesetzt werden soll
    date3 = new Date();                                                         //Deklaration einer neuen Datumsvariable
    dateContinued = date3.getTime();                                            //Speichern der Zeit zu der das Spiel fortgesetzt wurde
    pauseTime = dateContinued-datePaused;                                       //berechnen der Zeit, die das Spiel pausiert war
    if (gameMode === "0") {                                                     //für den Spielmodus "Standard"
      date1 += pauseTime;                                                       //wird das Enddatum um die Zeit, die das Spiel pausiert war nach hinen verschoben
    }
    else {                                                                      //für die anderen Spielmodi
      date0 += pauseTime;                                                       //wird das Anfangsdatum weiter nach hinten verlegt
    }
    context.clearRect(0, 0, width, height);                                     //Leeren der Spielfläche
    timerInterval = setInterval(updateTimer, 1);                                //fortsetzen des wiederholten Aufrufes der Timerfunktion
    mainInterval = setInterval(draw, 26);                                       //fortsetzen des wiederholten Aufrufes der Zeichenfunktion
    isRunning = 1;                                                              //Setzen der Varibale, die angibt, dass das Spiel läuft auf 'true'
    console.log("Fortgesetzt");                                                 //Konsolenlog, dass das Spiel fortgesetzt wird
  }
}

function beiKlick() {                                                           //Funktion, die die eigentliche Spielmechanik ausführt; wird bei jedem Klick auf den Canvas ausgeführt
  if (isRunning) {                                                              //wenn das Spiel nicht pausiert ist
    rect = canvas.getBoundingClientRect();                                      //Speichern der Canvaskoordinaten
    clickX = (event.clientX - rect.left);                                       //Berechnen der relativen X-Klickposition im Bezug auf den Canvas
    clickY = (event.clientY - rect.top);                                        //Berechnen der relativen Y-Klickposition im Bezug auf den Canvas
    klicks++;                                                                   //Erhöhen des Klickcounters um 1

    for (var l=0; l < number; l++) {                                            //für alle Bubbles
      DistX = bubbleList[l].x - clickX;                                         //Berechnen der Entfernung des Klicks zur Mitte der Bubble in X-Richtung
      DistY = bubbleList[l].y - clickY;                                         //Berechnen der Entfernung des Klicks zur Mitte der Bubble in X-Richtung
      Dist = Math.sqrt(DistX * DistX + DistY * DistY);                          //Berechnen der Entfernung des Klicks zur Bubble
      if (Dist < bubbleList[l].radius) {                                        //wenn die Entfernung kleiner als der Radius ist, also der Klick auf der Bubble liegt
        currentBubble = bubbleList[l];                                          //Speichern der getroffenen Bubble als "currentBubble"
        switch (gameMode) {                                                     //die Spielmechanik unterscheidet sich offensichtlich bei den einzelnen Spielmodi
          case "0":                                                             //im Spielmodus "Standard" soll jede Bubble angeklick werden können, jede Bubble bringt Punkte
            currentScore += bubbleList[l].val;                                  //der Punktstand soll um den Wert der Bubble erhöht werden
            if (sound) {playSound("hit");}                                      //wenn Sounds in den Einstellungen aktivert wurden, soll der Sound für das Treffen einer Bubble ausgegeben werden, das geschieht leider jedoch sehr zeitversetzt
            bubbleList.splice(l, 1, "hit");                                     //Löschen der getroffenen Bubble im Array und ersetzen durch den Text "hit"
            break;
          case "1":                                                             //im Spielmodus "Geordnet" müssen die Bubbles beginnend mit der mit dem kleinsten Wert dem Wert nach angeklickt werden
            smaller = 0;                                                        //Zurücksetzen einer Variable, die die Anzahl kleinerer Bubbles zählt
            for (var b=0; b<number; b++) {                                      //für alle Bubbles
              comparedBubble = bubbleList[b];                                   //Speichern der zu vergleichenden Bubble in "comparedBubble"
              if (comparedBubble.val < currentBubble.val) {                     //wenn die zu vergleichende Bubble einen kleineren Wert hat als die angeklickte
                smaller++;                                                      //wird smaller um 1 erhöht
              }
            }
            if (smaller === 0) {                                                //wenn es keine Bubble mit einem kleineren Wert gibt
              currentScore += bubbleList[l].val;                                //wird der aktuelle Punktestand um den der angeklickten Bubble erhöht
              if (sound) {playSound("hit");}                                    //wenn Ton aktiviert ist, soll der Ton für eine richtige Bubble ausgegeben werden
              bubbleList.splice(l, 1, "hit");                                   //die Bubble wird aus dem Array gelöscht und durch "hit" ersetzt
            }
            else {
              currentScore -= bubbleList[l].val;                                //ansonsten wird vom Punktestand der Wert der aktuellen Bubble abgezogen
              if (sound) {playSound("wrong");}                                  //und bei aktiviertem Ton wird derTon für eine richtige Bubble ausgegeben
            }
            break;
          case "2":                                                             //im Spielmodus "Puzzle" wird der gleiche Code wie für den Spielmodus "Geordnet" verwendet
            smaller = 0;                                                        //wie oben, nur Radius statt Wert
            for (var c=0; c<number; c++) {
              comparedBubble = bubbleList[c];
              if (comparedBubble.radius < currentBubble.radius) {
                smaller++;
              }
            }
            if (smaller === 0) {
              if (sound) {playSound("hit");}
              bubbleList.splice(l, 1, "hit");
              currentScore = remainingBubbles();
            }
            else {
              if (sound) {playSound("wrong");}
            }
            break;
        }
        if (remainingBubbles() === 0) {                                         //wenn keine Bubbles mehr übrig sind
          beendeSpiel();                                                        //wird das Spiel beendet
        }
      }
    }
  }
  else {                                                                        //wenn auf die Spielfläche geklickt wird, während das Spiel pausiert ist
    pause("play");                                                              //wird es fortgesetzt
  }
}

function playSound(type) {                                                      //Funktion, die Töne ausgeben kann
  hitSound = new Audio('coin.wav');                                             //Variablendeklaration für die verschiedenen Töne
  wrongSound = new Audio('implosion.wav');
  endSound = new Audio('complete.wav');
  if (type == "hit") {                                                          //Sound für das Treffen einer richtigen Bubble
    hitSound.play();
  }
  else if (type == "wrong") {                                                   //Sound für das Treffen einer falschen Bubble
    wrongSound.play();
  }
  else if (type == "end") {                                                     //Sound am Ende eines Spiels
    endSound.play();
  }
}

function remainingBubbles() {                                                   //Funktion, die die Anzahl an verbleibenden Bubbles im Spielfeld berechnet
  for (var m=0; m < number; m++) {                                              //für alle Bubbles
    if (bubbleList[m] == "hit") {                                               //für alle getroffenen Bubbles
      left--;                                                                   //wird left um 1 verringert
      bubbleList.splice(m, 1, "hitSaved");                                      //ändern des Textes, so dass der Treffer beim nächsten Aufruf nicht erneut gezählt wird
    }                                                                           //man könnte left am Anfang jedes Aufrufes auch auf number setzen und dann die vorherige Zeile weg lassen, aber dann funktioniert die Berenung im GameOver Bildschirm nicht mehr
  }
  return left;                                                                  //zurück geben der Anzahl an verbleibenden Bubbles
}

function beendeSpiel() {                                                        //Funktion, die das Spiel beendet
  if (sound) {playSound("end");}                                                //wenn Sounds aktiviert wurden, den Endsound ausgeben
  timer.innerHTML = "Neustarten";                                               //Timer wieder zum StartButton machen
  document.getElementById("start").style.backgroundColor = "#0000ff";           //Farbe des Buttons ändern
  document.getElementById("start").style.color = "#ffffff";                     //Schriftfarbe des Startbuttons zu weiß ändern
  console.log("Game Over!");                                                    //Konsolenlog, dass das Spiel vorbei ist
  clearInterval(mainInterval);                                                  //wiederholten Aufruf der Zeichenfunktion beenden
  clearInterval(timerInterval);                                                 //wiederholten Aufruf der Timerfunktion beenden
  context.clearRect(0, 0, width, height);                                       //Leeren der Zeichenfläche
  bubbleList.splice(0, number, "");                                             //Leeren der Bubbleliste
  runTimes = 0;                                                                 //Variable, die angibt, ob gerade ein Spiel aktiv ist, auf 'false' setzen
  generateGameOver();                                                           //Erzeugung des nächsten Bilschirms starten
}

function generateGameOver() {                                                   //Funktion, die dem Spieler sein Ergebnis ausgibt
  clicked = number - remainingBubbles();                                        //Speichern der Anzahl an getroffenen Bubbles
  displayInsteadOfCanvas('gameOver');                                           //Anzeigen des Bildschirms "GameOver"

  switch (gameMode) {                                                           //für jeden Spielmodus ein anderes Feedback
    case "0":                                                                   //Spielmodus "Standard"
      score = Math.floor(currentScore*speed*clicked*clicked/number/klicks);     //Berechnung des Scores

      document.playerInfo0.playerName.value = name;                             //Einfügen der Informationen aus dem Spiel in die Ausgabe; Name
      document.getElementById('count0').innerHTML = number;                     //gesamtZahl Bubbles
      document.getElementById('clicked0').innerHTML = clicked;                  //angeklickte Bubbles
      document.getElementById('points0').innerHTML = score;                     //erreichte Punktzahl
      document.getElementById('clickCounter0').innerHTML = klicks;              //benötigte Klicks

      if (klicks < clicked) {                                                   //wenn mehrere Bubbles auf ein Mal angeklickt wurden
        document.getElementById("0gz1").style.display = "inline-block";         //soll Nachricht 1 angezeigt werden
        document.getElementById("0gz2").style.display = "none";
        document.getElementById("0gz3").style.display = "none";
      }
      else if (klicks === clicked) {                                            //wenn jede Bubble nur ein Mal angeklickt wurde
          if (klicks === 0 || clicked === 0) {
            document.getElementById("0gz1").style.display = "none";
            document.getElementById("0gz2").style.display = "none";
            document.getElementById("0gz3").style.display = "none";
          }
          else {                                                                //soll Nachricht 2 ausgegeben werden
            document.getElementById("0gz1").style.display = "none";
            document.getElementById("0gz2").style.display = "inline-block";
            document.getElementById("0gz3").style.display = "none";
          }
      }
      else if (number == clicked) {                                             //wenn alle Bubbles angeklickt wurden
        console.log("all");
        document.getElementById("0gz1").style.display = "none";                 //soll Nachricht 3 angezeigt werden
        document.getElementById("0gz2").style.display = "none";
        document.getElementById("0gz3").style.display = "inline-block";
      }
      else {                                                                    //sonst keine
        document.getElementById("0gz1").style.display = "none";
        document.getElementById("0gz2").style.display = "none";
        document.getElementById("0gz3").style.display = "none";
      }

      document.getElementById("gameOver0").style.display = "inline-block";      //Anzeigen des GameOverBildschirms für Spielmodus "Standard"
      document.getElementById("gameOver1").style.display = "none";
      document.getElementById("gameOver2").style.display = "none";
      break;
    case "1":                                                                   //Spielmodus "Geordnet", wie oben
      score = Math.floor(speed*number/klicks*(currentScore-((minutes*60+seconds)/number/number))); //Berechnung des Scores

      document.playerInfo1.playerName.value = name;
      if (minutes === 0) {
        document.getElementById('time1').innerHTML = seconds + " Sekunden";
      }
      else {
        document.getElementById('time1').innerHTML = minutes + " Minuten und " + seconds + " Sekunden";
      }
      document.getElementById('count1').innerHTML = number;
      document.getElementById('points1').innerHTML = score;
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
    case "2":                                                                   //Spielmodus "Puzzle", wie oben
      score = Math.floor(10*number*number/klicks*speed);                        //Berechnung des Scores

      document.playerInfo2.playerName.value = name;
      if (minutes === 0) {
        document.getElementById('time2').innerHTML = seconds + " Sekunden";
      }
      else {
        document.getElementById('time2').innerHTML = minutes + " Minuten und " + seconds + " Sekunden";
      }
      document.getElementById('count2').innerHTML = number;
      document.getElementById('clickCounter2').innerHTML = klicks;
      document.getElementById('points2').innerHTML = score;

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

function generateLeaderboardWithoutdisplay() {                                  //Funktion, die eine Bestenliste erstellt
  switch (gameMode) {
    case "0":
      table = document.getElementById("tableLeaderboard0");
      sort(table);
      break;
    case "1":
      table = document.getElementById("tableLeaderboard1");
      sort(table);
      break;
    case "2":
      table = document.getElementById("tableLeaderboard2");
      sort(table);
      break;
  }
  scoreCell.innerHTML = score;
  name = document.playerInfo0.playerName.value;
  nameCell.innerHTML = name;
}

function sort(leaderboard) {
  numberOfRows = leaderboard.children[0].children.length;

  if (numberOfRows === 1) {
    row = table.insertRow(1);
    placeCell = row.insertCell(0);
    nameCell = row.insertCell(1);
    scoreCell = row.insertCell(2);
    placeCell.innerHTML = 1;
  }
  else if (numberOfRows === 2) {
    if (score > leaderboard.children[0].children[1].children[2].innerHTML) {
      row = table.insertRow(1);
      placeCell = row.insertCell(0);
      placeCell.innerHTML = 1;
      leaderboard.children[0].children[2].children[0].innerHTML = 2;
    }
    else {
      row = table.insertRow(2);
      placeCell = row.insertCell(0);
      placeCell.innerHTML = 2;
    }
    nameCell = row.insertCell(1);
    scoreCell = row.insertCell(2);
  }
  else {
    inserted=0;
    x=numberOfRows - 1;
    while (!inserted) {
      if (score <= leaderboard.children[0].children[x].children[2].innerHTML) {
        row = table.insertRow(x+1);
        placeCell = row.insertCell(0);
        nameCell = row.insertCell(1);
        scoreCell = row.insertCell(2);
        break;
      }
      x--;
      if (x==-1) {
        row = table.insertRow(1);
        placeCell = row.insertCell(0);
        nameCell = row.insertCell(1);
        scoreCell = row.insertCell(2);
        break;
      }
    }
    for (y=1; y<=numberOfRows; y++) {
      leaderboard.children[0].children[y].children[0].innerHTML = y;
    }
  }
}

function generateLeaderboard() {
  generateLeaderboardWithoutdisplay();
  displayInsteadOfCanvas('gameOverButton');
}

window.onload=paint;

/*ToDo
* fix bubbles anklicken!
* fix footer margin-top
* (add sorting algorithm)
* clean up code
* rename dates
* deutsch ODER englisch
*/
