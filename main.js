// import all required modules

const prompt = require('prompt-sync')({sigint: true});

//Just the clear the screen for the next print
const clear = require('clear-screen');

//Instantiate variable
//You can edit or create new variables if needed

const hat = '^';            //My Hat
const hole = 'O';
const fieldCharacter = '░'; //Grass patch 1m by 1m -> fill up the whole field (10 by 10)
const pathCharacter = '*';  //ME
const row = 10;
const col = 10;
const probability = 0.2;    


//If you prefer to use functions, please go ahead
//In this kick-starter we are using Class object

//1) Build the whole Field out (10 row X 10 col)
// Create 2D Array
//Contract the layout of the field using empty array

//Golf Course Field

class Field {

    field = [];
  
    constructor() {
      
    //The current location of the character *
    //character * can be always at the default of position (0,0) 
      this.locationX = 0;   //col
      this.locationY = 0;   //row
  
      for (let a = 0; a < row; a++) {
        this.field[a] = [];
      }
  
      this.generateField(); //put in the patches of grass in the plot
    }

    generateField() {

        //Random number from 0 to 1
        //if the random number is greater than or equal 0.3, I will generate the patch of grass
        //if the random number is less than than 0.3, I will generate the hole
        for (let y = 0; y < row; y++) {
          for (let x = 0; x < col; x++) {
            //const prob = Math.random();
            //need to use the propability const create to generate either a patch of grass or a hole
            let getProb = Math.random();  //return a number between 0 to 1
            //e.g. 0.25, 0.86, 0.91, 0.12, 0.83

            //(0.25 > 0.2)?
            this.field[y][x] = getProb >= probability ? fieldCharacter : hole;
          }
        }

        let hatX;
        let hatY;
        do {
          // Set the "hat" location
          //Set the hat position as random (x, y)
          hatY = Math.floor(Math.random() * row);
          hatX = Math.floor(Math.random() * col);   
        } while (hatX == 0 && hatY == 0);

        this.field[hatY][hatX] = hat;   //array needs a whole number : 0 to 9

        //set character position as [0][0]
        this.field[this.locationY][this.locationX] =  pathCharacter;
      }

      runGame() {

        //Keep asking user for input if the game is not end :
        //1) Char hits boundaries, 
        //2) Char gets the hat
        //3) Char drops into a hole
        let playing = true;
        while (playing)
        {
          this.field[this.locationY][this.locationX] = pathCharacter;
          this.print();
          this.askQuestion();

          //The player will keep playing unless either of the above conditions are met
          //(1) Char hits boundaries
          if (!this.isInBoundary()) {
            //Not true ========== false
            console.log("Out of boundary - Game End")
            playing = false;
          }
          else if (this.field[this.locationY][this.locationX] == hat)
          {
            console.log("Congrats, you found your hat!");
            playing = false;
          }
          else if (this.field[this.locationY][this.locationX] == hole) 
          {
            console.log("Sorry, you fell into a hole!");
            playing = false;
          }
        }
      }

      isInBoundary() {

        //the size of the boundary refer to the row and col that you set
        //0 to 9
        return (this.locationX >= 0 && this.locationY >= 0 
          && this.locationX < col && this.locationY < row)
      }
    
      print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
          }).join('\n');       //newline / break
          //join method will cover the array to string
        console.log(displayString);
      }
    
      askQuestion() {
        const answer = prompt('Which way? (u, d, l, r) : ').toUpperCase();
        //how to check if user press u or d or k or r
        //if else or switch
        //Move my Char
        switch (answer) {
          case 'U':
             //reset the field to the fieldCharacter
             this.field[this.locationY][this.locationX] = fieldCharacter;
             this.locationY -= 1;   //row
            break;
          case 'D':
              this.field[this.locationY][this.locationX] = fieldCharacter;
              this.locationY += 1;   //row
              break;
          case 'L':
              //Move my char to left (col)
              this.field[this.locationY][this.locationX] = fieldCharacter;
              this.locationX -= 1;   //col
              break;
          case 'R':
              //Move my char to right (col)
              this.field[this.locationY][this.locationX] = fieldCharacter;

              this.locationX += 1;   //col
              break;
          default:
            console.log("Please enter u, d, l ,r.")
            break;
         }
      }

} //End of Field Class

//Create an instance object for the Field
const myField = new Field();
myField.runGame();
