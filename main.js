const prompt = require('prompt-sync')();
let isGameRun = true;
const inVert = ['A', 'B', 'C'];
const inHor = ['1', '2', '3'];
let errorMessage = '';
let actualPlayer = '';
let humanPlayers = 0;

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
   const inpPlayerNum = prompt('Játékosok száma [1-2]: ');
   if (inpPlayerNum !== '1' && inpPlayerNum !== '2') {
      console.log('Baromarcú!!! 1 vagy 2?????');
   } else {
      if (inpPlayerNum === '1') {
         playerInfo[0].isHumanoid = true;
      }
      else {
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
   actualPlayer = 'X';
} else {
   playerInfo[0].character = 'O';
   playerInfo[1].character = 'X';
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




   }

   isWin = isGameWin();  
   if(isWin) {
      isGameRun = false;
   }
}



if (isWin) {
   console.clear();
   printGameField();
   console.log();
   printError('');
   console.log();
   console.log('Gratulálunk ' + winnerPlayer + '! Nyertél.');
}

