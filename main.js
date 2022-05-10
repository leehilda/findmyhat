const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 5;
const col = 5;

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0; //coumn
    this.locationY = 0; //row
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter;
  }

  runGame() {
    let start = true;
    while (start) {
      this.print();
      this.askQuestion();
      if (!this.outsideBox()) {
        console.log('Out of bounds- Game Over!');
        start = false;
        break;
      } else if (this.isHole()) {
        console.log('Sorry, you fell down a hole!');
        start = false;
        break;
      } else if (this.isHat()) {
        console.log('Congrats, you found your hat!');
        start = false;
        break;
      }
      // Update the map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  askQuestion() {
    const answer = prompt('Which way? ').toLowerCase();
    switch (answer) {
      case 'u':
        this.locationY -= 1;
        break;
      case 'd':
        this.locationY += 1;
        break;
      case 'l':
        this.locationX -= 1;
        break;
      case 'r':
        this.locationX += 1;
        break;
      default:
        console.log('Enter u, d, l or r.');
        prompt ('where Next?');
        break;
    }
  }

  outsideBox() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  print() {
    const displayString = this.field.map(row => {
        return row.join('');
      }).join('\n');
    console.log(displayString);
  }

    static generateField(row, col, percentage) {
    const newArray = [];
    for(let y=0; y< row.length; y++){
        myArray.push([]);
    }
    for (let y = 0; y < row.length; y++) {
        newArray.push([]);
      for (let x = 0; x < col.length; x++) {
        newArray[x][y](fieldCharacter);
      }
      
    }

    // randomised hat
    
    //   let hatX= Math.floor(Math.random() * col);
    //   let hatY= Math.floor(Math.random() * row);

    //random 0
    
  }
}

const myfield = new Field(Field.generateField(10, 10, 0.1));
myfield.runGame();
