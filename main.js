const prompt = require('prompt-sync')();
let isGameRun = true;
const inVert = ['A', 'B', 'C'];
const inHor = ['1', '2', '3'];
let errorMessage = '';
let actualPlayer = '';
let humanPlayers = 0;

/*
const x = 'X';
console.log(x);
console.log(!x);
const incccput = prompt('Kérek egy mezőt [' + actualPlayer + ']:');
*/


let playerInfo = [
   {
      character: ' ',
      isHumanoid: false
   },
   {
      character: ' ',
      isHumanoid: false
   }
];

let isWin = false;
let winnerPlayer = '';

let EmptySpace = true;

let gameField = [
   [ ' ',' ',' '],
   [ ' ',' ',' '],
   [ ' ',' ',' '],
];

function printGameField() {
   console.log('      A   B   C');
   console.log();
   console.log(' 1    ' + gameField[0][0] + ' | ' + gameField[0][1] + ' | ' + gameField[0][2]);
   console.log(' 2    ' + gameField[1][0] + ' | ' + gameField[1][1] + ' | ' + gameField[1][2]);
   console.log(' 3    ' + gameField[2][0] + ' | ' + gameField[2][1] + ' | ' + gameField[2][2]);
   console.log();
}

function isGameWin() {
   if (gameField[0][0] === gameField[0][1] && gameField[0][1] === gameField[0][2] && gameField[0][0] !== ' ') {
      winnerPlayer = gameField[0][0];
      return true;
   }
   if (gameField[1][0] === gameField[1][1] && gameField[1][1] === gameField[1][2] && gameField[1][0] !== ' ') {
      winnerPlayer = gameField[1][0];
      return true;
   }
   if (gameField[2][0] === gameField[2][1] && gameField[2][1] === gameField[2][2] && gameField[2][0] !== ' ') {
      winnerPlayer = gameField[2][0];
      return true;
   }

   if (gameField[0][0] === gameField[1][0] && gameField[1][0] === gameField[2][0] && gameField[0][0] !== ' ') {
      winnerPlayer = gameField[0][0];
      return true;
   }
   if (gameField[0][1] === gameField[1][1] && gameField[1][1] === gameField[2][1] && gameField[0][1] !== ' ') {
      winnerPlayer = gameField[0][1];
      return true;
   }
   if (gameField[0][2] === gameField[1][2] && gameField[1][2] === gameField[2][2] && gameField[0][2] !== ' ') {
      winnerPlayer = gameField[0][2];
      return true;
   }

   if (gameField[0][0] === gameField[1][1] && gameField[1][1] === gameField[2][2] && gameField[0][0] !== ' ') {
      winnerPlayer = gameField[0][0];
      return true;
   }
   if (gameField[0][2] === gameField[1][1] && gameField[1][1] === gameField[2][0] && gameField[0][2] !== ' ') {
      winnerPlayer = gameField[0][2];
      return true;
   }
}

function isEmptySpace() {
   for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++) {
         if (gameField[i][j] === ' ') return true;
      }
   }
   return false;
}

function isCornerSpace() {
   if (gameField[0][0] === ' ' || gameField[2][0] === ' ' || gameField[0][2] === ' ' || gameField[2][2] === ' ')
      return true;
   else 
      return false;
}

function printError(errorMsg) {
   if (errorMessage !== '') {
      console.log('Hiba: ' + errorMsg);
   } else {
      console.log();
   }
}

function isActualPlayerHum(actualChar) {
   if (playerInfo[0].character === actualChar) {
      return playerInfo[0].isHumanoid;
   } else if (playerInfo[1].character === actualChar) {
      return playerInfo[1].isHumanoid;
   }
}

function getAnotherPlayer(actPlayer) {
   if (actPlayer === 'X') return 'O';
   else if (actPlayer === 'O') return 'X';
}


/*
      A   B   C

 1    X | O | X
 2    X | X | O
 3    O | O | O 

   gameField[0][0]
   [Horizontal][Vertical]
*/

let gameNotRun = true;
while(gameNotRun) {
   const inpPlayerNum = prompt('Játékosok száma [0-2]: ');
   if (inpPlayerNum !== '0' && inpPlayerNum !== '1' && inpPlayerNum !== '2') {
      console.log('Baromarcú!!! 0-tól 2-ig!!!');
   } else {
      if (inpPlayerNum === '0') {
         playerInfo[0].isHumanoid = false;
         playerInfo[1].isHumanoid = false;
      } else if (inpPlayerNum === '1') {
         playerInfo[0].isHumanoid = true;
      } else {
         playerInfo[0].isHumanoid = true;
         playerInfo[1].isHumanoid = true;
      }
      gameNotRun = false;
   }
}


let randomNum = Math.floor(Math.random() * 10) + 1;
if(randomNum % 2) {
   playerInfo[0].character = 'X';
   playerInfo[1].character = 'O';
} else {
   playerInfo[0].character = 'O';
   playerInfo[1].character = 'X';
}

randomNum = Math.floor(Math.random() * 10) + 1;
if(randomNum % 2) {
   actualPlayer = 'X';
} else {
   actualPlayer = 'O';
}


while (isGameRun) {
   console.clear();
   printGameField();
   console.log();
   printError('');
   console.log();

   if(isActualPlayerHum(actualPlayer)) {
      const input = prompt('Kérek egy mezőt [' + actualPlayer + ']:');
      if (inVert.includes(input[0]) && inHor.includes(input[1])) {
         const Hor = inHor.indexOf(input[1]);
         const Vert = inVert.indexOf(input[0]);
         if(gameField[Hor][Vert] === ' ') {
            gameField[Hor][Vert] = actualPlayer;
            actualPlayer = actualPlayer === 'X' ? 'O' : 'X';
            errorMessage = '';
         } else {
            errorMessage = 'Ez a mező már foglalt!';
         }    
      } else {
         if (input === 'XX') {
            isGameRun = false;
         } else {
            errorMessage = 'Helytelen mező!';
         }
      }
   } else {
      // AI
      if (gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      // AI want to win...
      //1 sor
      else if (gameField[0][0] === gameField[0][1] && gameField[0][0] === actualPlayer && gameField[0][2] === ' ') {
         gameField[0][2] = actualPlayer;
      }
      else if (gameField[0][1] === gameField[0][2] && gameField[0][1] === actualPlayer && gameField[0][0] === ' ') {
         gameField[0][0] = actualPlayer;
      }
      else if (gameField[0][0] === gameField[0][2] && gameField[0][0] === actualPlayer && gameField[0][1] === ' ') {
         gameField[0][1] = actualPlayer;
      }
      //2 sor
      else if (gameField[1][0] === gameField[1][1] && gameField[1][0] === actualPlayer && gameField[1][2] === ' ') {
         gameField[1][2] = actualPlayer;
      }
      else if (gameField[1][0] === gameField[1][2] && gameField[1][0] === actualPlayer && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[1][2] && gameField[1][1] === actualPlayer && gameField[1][0] === ' ') {
         gameField[1][0] = actualPlayer;
      }
      //3 sor
      else if (gameField[2][0] === gameField[2][1] && gameField[2][0] === actualPlayer && gameField[2][2] === ' ') {
         gameField[2][2] = actualPlayer;
      }
      else if (gameField[2][0] === gameField[2][2] && gameField[2][0] === actualPlayer && gameField[2][1] === ' ') {
         gameField[2][1] = actualPlayer;
      }
      else if (gameField[2][1] === gameField[2][2] && gameField[2][1] === actualPlayer && gameField[2][0] === ' ') {
         gameField[2][0] = actualPlayer;
      }
      // A oszlop
      else if (gameField[0][0] === gameField[1][0] && gameField[0][0] === actualPlayer && gameField[2][0] === ' ') {
         gameField[2][0] = actualPlayer;
      }
      else if (gameField[0][0] === gameField[2][0] && gameField[0][0] === actualPlayer && gameField[1][0] === ' ') {
         gameField[1][0] = actualPlayer;
      }
      else if (gameField[1][0] === gameField[2][0] && gameField[1][0] === actualPlayer && gameField[0][0] === ' ') {
         gameField[0][0] = actualPlayer;
      }
      //B oszlop
      else if (gameField[0][1] === gameField[1][1] && gameField[0][1] === actualPlayer && gameField[2][1] === ' ') {
         gameField[2][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[2][1] && gameField[1][1] === actualPlayer && gameField[0][1] === ' ') {
         gameField[0][1] = actualPlayer;
      }
      else if (gameField[0][1] === gameField[2][1] && gameField[0][1] === actualPlayer && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      //C oszlop
      else if (gameField[0][2] === gameField[1][2] && gameField[0][2] === actualPlayer && gameField[2][2] === ' ') {
         gameField[2][2] = actualPlayer;
      }
      else if (gameField[0][2] === gameField[2][2] && gameField[0][2] === actualPlayer && gameField[1][2] === ' ') {
         gameField[1][2] = actualPlayer;
      }
      else if (gameField[1][2] === gameField[2][2] && gameField[1][2] === actualPlayer && gameField[0][2] === ' ') {
         gameField[0][2] = actualPlayer;
      }

      //Átlós
      else if (gameField[0][0] === gameField[1][1] && gameField[0][0] === actualPlayer && gameField[2][2] === ' ') {
         gameField[2][2] = actualPlayer;
      }
      else if (gameField[0][0] === gameField[2][2] && gameField[0][0] === actualPlayer && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[2][2] && gameField[1][1] === actualPlayer && gameField[0][0] === ' ') {
         gameField[0][0] = actualPlayer;
      }

      else if (gameField[2][0] === gameField[1][1] && gameField[2][0] === actualPlayer && gameField[0][2] === ' ') {
         gameField[0][2] = actualPlayer;
      }
      else if (gameField[2][0] === gameField[0][2] && gameField[2][0] === actualPlayer && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[0][2] && gameField[1][1] === actualPlayer && gameField[2][0] === ' ') {
         gameField[2][0] = actualPlayer;
      }
      // AI want to block...
      //1 sor
      else if (gameField[0][0] === gameField[0][1] && gameField[0][0] === getAnotherPlayer(actualPlayer) && gameField[0][2] === ' ') {
         gameField[0][2] = actualPlayer;
      }
      else if (gameField[0][1] === gameField[0][2] && gameField[0][1] === getAnotherPlayer(actualPlayer) && gameField[0][0] === ' ') {
         gameField[0][0] = actualPlayer;
      }
      else if (gameField[0][0] === gameField[0][2] && gameField[0][0] === getAnotherPlayer(actualPlayer) && gameField[0][1] === ' ') {
         gameField[0][1] = actualPlayer;
      }
      //2 sor
      else if (gameField[1][0] === gameField[1][1] && gameField[1][0] === getAnotherPlayer(actualPlayer) && gameField[1][2] === ' ') {
         gameField[1][2] = actualPlayer;
      }
      else if (gameField[1][0] === gameField[1][2] && gameField[1][0] === getAnotherPlayer(actualPlayer) && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[1][2] && gameField[1][1] === getAnotherPlayer(actualPlayer) && gameField[1][0] === ' ') {
         gameField[1][0] = actualPlayer;
      }
      //3 sor
      else if (gameField[2][0] === gameField[2][1] && gameField[2][0] === getAnotherPlayer(actualPlayer) && gameField[2][2] === ' ') {
         gameField[2][2] = actualPlayer;
      }
      else if (gameField[2][0] === gameField[2][2] && gameField[2][0] === getAnotherPlayer(actualPlayer) && gameField[2][1] === ' ') {
         gameField[2][1] = actualPlayer;
      }
      else if (gameField[2][1] === gameField[2][2] && gameField[2][1] === getAnotherPlayer(actualPlayer) && gameField[2][0] === ' ') {
         gameField[2][0] = actualPlayer;
      }
      //A oszlop
      else if (gameField[0][0] === gameField[1][0] && gameField[0][0] === getAnotherPlayer(actualPlayer) && gameField[2][0] === ' ') {
         gameField[2][0] = actualPlayer;
      }
      else if (gameField[0][0] === gameField[2][0] && gameField[0][0] === getAnotherPlayer(actualPlayer) && gameField[1][0] === ' ') {
         gameField[1][0] = actualPlayer;
      }
      else if (gameField[1][0] === gameField[2][0] && gameField[1][0] === getAnotherPlayer(actualPlayer) && gameField[0][0] === ' ') {
         gameField[0][0] = actualPlayer;
      }
      //B oszlop
      else if (gameField[0][1] === gameField[1][1] && gameField[0][1] === getAnotherPlayer(actualPlayer) && gameField[2][1] === ' ') {
         gameField[2][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[2][1] && gameField[1][1] === getAnotherPlayer(actualPlayer)  && gameField[0][1] === ' ') {
         gameField[0][1] = actualPlayer;
      }
      else if (gameField[0][1] === gameField[2][1] && gameField[0][1] === getAnotherPlayer(actualPlayer)  && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      //C oszlop
      else if (gameField[0][2] === gameField[1][2] && gameField[0][2] === getAnotherPlayer(actualPlayer) && gameField[2][2] === ' ') {
         gameField[2][2] = actualPlayer;
      }
      else if (gameField[0][2] === gameField[2][2] && gameField[0][2] === getAnotherPlayer(actualPlayer) && gameField[1][2] === ' ') {
         gameField[1][2] = actualPlayer;
      }
      else if (gameField[1][2] === gameField[2][2] && gameField[1][2] === getAnotherPlayer(actualPlayer) && gameField[0][2] === ' ') {
         gameField[0][2] = actualPlayer;
      }
      //Átlós...
      else if (gameField[0][0] === gameField[1][1] && gameField[0][0] === getAnotherPlayer(actualPlayer) && gameField[2][2] === ' ') {
         gameField[2][2] = actualPlayer;
      }
      else if (gameField[0][0] === gameField[2][2] && gameField[0][0] === getAnotherPlayer(actualPlayer) && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[2][2] && gameField[1][1] === getAnotherPlayer(actualPlayer) && gameField[0][0] === ' ') {
         gameField[0][0] = actualPlayer;
      }

      else if (gameField[2][0] === gameField[1][1] && gameField[2][0] === getAnotherPlayer(actualPlayer) && gameField[0][2] === ' ') {
         gameField[0][2] = actualPlayer;
      }
      else if (gameField[2][0] === gameField[0][2] && gameField[2][0] === getAnotherPlayer(actualPlayer) && gameField[1][1] === ' ') {
         gameField[1][1] = actualPlayer;
      }
      else if (gameField[1][1] === gameField[0][2] && gameField[1][1] === getAnotherPlayer(actualPlayer) && gameField[2][0] === ' ') {
         gameField[2][0] = actualPlayer;
      } else {
         if (isCornerSpace())
         {
            let isAImove = true;
            while (isAImove) {
               let randNum = Math.floor(Math.random() * 4) + 1;
               if (randNum === 1 && gameField[0][0] === ' ') { 
                  gameField[0][0] = actualPlayer;
                  isAImove = false;
               }
               else if (randNum === 2 && gameField[2][0] === ' ') { 
                  gameField[2][0] = actualPlayer;
                  isAImove = false;
               }
               else if (randNum === 3 && gameField[0][2] === ' ') { 
                  gameField[0][2] = actualPlayer;
                  isAImove = false;
               }
               else if (randNum === 4 && gameField[2][2] === ' ') { 
                  gameField[2][2] = actualPlayer;
                  isAImove = false;
               }
            }
         } else {
            let isAImove = true;
            while (isAImove) {
               let randNum = Math.floor(Math.random() * 4) + 1;
               if (randNum === 1 && gameField[1][0] === ' ') { 
                  gameField[1][0] = actualPlayer;
                  isAImove = false;
               }
               else if (randNum === 2 && gameField[2][1] === ' ') { 
                  gameField[2][1] = actualPlayer;
                  isAImove = false;
               }
               else if (randNum === 3 && gameField[0][1] === ' ') { 
                  gameField[0][1] = actualPlayer;
                  isAImove = false;
               }
               else if (randNum === 4 && gameField[1][2] === ' ') { 
                  gameField[1][2] = actualPlayer;
                  isAImove = false;
               }
            }
         }

      }
      actualPlayer = actualPlayer === 'X' ? 'O' : 'X';
   }

   isWin = isGameWin();  
   if(isWin) {
      isGameRun = false;
   }
   EmptySpace = isEmptySpace();
   if (!EmptySpace) {
      isGameRun = false;
   }
}

if (isWin) {
   console.clear();
   printGameField();
   console.log();
   printError('');
   console.log();
   if (isActualPlayerHum(winnerPlayer))
   {
      console.log('Gratulálunk ' + winnerPlayer + '! Nyertél. Most még hagytam.');
   } else {
      console.log('Kevés vagy te ahhoz, hogy megverjed a CoolTeam AI-át!!!');
   }
}
if (!EmptySpace) {
   console.clear();
   printGameField();
   console.log();
   printError('');
   console.log();
   console.log('Döntetlen!!!');
}


