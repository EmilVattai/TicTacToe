const prompt = require('prompt-sync')();
let isGameRun = true;
const inHor = ['A', 'B', 'C'];
const inVert = ['1', '2', '3'];
let errorMessage = '';
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



/*
      A   B   C

 1    X | O | X
 2    X | X | O
 3    O | O | O 

   gameField[0][0]
*/

while (isGameRun) {
   console.clear();
   printGameField();
   console.log();
   if (errorMessage !== '') {
      console.log('Hiba: ' + errorMessage);
   } else {
      console.log();
   }
   console.log();
   const input = prompt('Kérek egy mezőt: ');
   if (inHor.includes(input[0]) & inVert.includes(input[1])) {
      const Hor = inHor.indexOf(input[0]);
      const Vert = inVert.indexOf(input[1]);
      if(gameField[Hor][Vert] === ' ') {
         gameField[Hor][Vert] = 'X';
         errorMessage = '';
      } else {
         errorMessage = 'Ez a mező már foglalt!';
      }
      
   }
   else {
      if (input === 'XX')
      {
         isGameRun = false;
      }
   }





   
}


