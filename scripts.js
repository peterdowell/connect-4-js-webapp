let timeleft = 21;
let isBlitz = false;
let isNormal = true;

// DOM Elements
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow]; // array of an array and each row will have all of the cells


// variables
let gameIsLive = true;
let yellowIsNext = true;

// Functions
const getClassListArray = (cell) => { // getting an array of classes that passes in the cell
  const classList = cell.classList; // get the const classList from the cells
  return [...classList]; // spread operator on the classlist that comma separates each of the values that converts it to an array
};

const getCellLocation = (cell) => { // passes cell as an argument
  const classList = getClassListArray(cell); // calls class list array
  
  const rowClass = classList.find(className => className.includes('row')); // find method within arrays to iterate each of the elements in the array that includes the class row
  const colClass = classList.find(className => className.includes('col')); // find method within arrays to iterate each of the elements in the array that includes the class col
  const rowIndex = rowClass[4]; // indexes the rows so there is just a number
  const colIndex = colClass[4]; // indexes the columns so there is just a number
  const rowNumber = parseInt(rowIndex, 10); // turns the row numbers from strings to integers
  const colNumber = parseInt(colIndex, 10); // turns the col numbers from strings to integers
  
  return [rowNumber, colNumber]; // returns the row number and col number as an array
};

const getFirstOpenCellForColumn = (colIndex) => { // gets the first open cell in the column for the column index passing colIndex as a parameter
  const column = columns[colIndex]; // loops through the column array to give the column
  const columnWithoutTop = column.slice(0, 6); // column slice to exclude the topRow element which is the 6th
  
  for (const cell of columnWithoutTop) { // for of loop that loops each cell of the array
    const classList = getClassListArray(cell); // checks for the read class or the yellow class
    if (!classList.includes('yellow') && !classList.includes('red')) { // if the cell includes not yellow and not red then it is open
      return cell; // returns a cell
    }
  }
  
  return null; // no openings in any columns
};

const clearColorFromTop = (colIndex) => { // takes the columns as a parameter
  const topCell = topCells[colIndex]; // takes the elements in the top cell
  topCell.classList.remove('yellow'); // removes class list yellow
  topCell.classList.remove('red'); // removes class list red
};

const getColorOfCell = (cell) => { // takes the cells as a parameter
  const classList = getClassListArray(cell); // gets an array of all of the classes
  if (classList.includes('yellow')) { // if there is a class of yellow
    return 'yellow'; // returns yellow
  }
  if (classList.includes('red')) { // if there is a class of red
    return 'red'; //returns red
  }
  return null;
};

const checkWinningCells = (cells) => { // gets an array of cells
  if (cells.length < 4) { // if cells 
    return false;
  }
  
    gameIsLive = false; // game is over
    for (const cell of cells) { // checks all cells in the array
      cell.classList.add('win'); // adds win to the class in the cell
    }
    statusSpan.textContent = `${yellowIsNext ? 'Yellow' : 'Red'} has won!` // manipulates the text in statusSpan to yellow or red has won
    return true; // returns boolean to show there is a winner
};

const checkStatusOfGame = (cell) => { // takes a cell as a parameter
  const color = getColorOfCell(cell); // gets all of the classes of the cells
  
    let cellColor = getColorOfCell(cell)
    if(cellColor === 'red'){
    document.getElementById("cellColor").innerHTML = "Yellow";
      
    }    
  if(cellColor === 'yellow'){
    document.getElementById("cellColor").innerHTML = "Red";
      
    }
  if (!color) { // if there is no color
    return;
  }
  const [rowIndex, colIndex] = getCellLocation(cell); // row and column index for the cells
  
  // Check horizontally
  let winningCells = [cell]; // cell is part of winning
  let rowToCheck = rowIndex; // checks the row index
  let colToCheck = colIndex - 1; // starting from the left so - 1
  
  while (colToCheck >= 0) { // while loop for column check greater or equal to 0
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      colToCheck--; // decrements by one in the colToCheck array
    } else {
      break;
    }
  }
  
  colToCheck = colIndex + 1; // checks the right so + 1
  while (colToCheck <= 6) { // while loop for column to check less than or equal to 6
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      colToCheck++; // increments by one in the colToCheck array
    } else {
      break;
    }
  }
  let isWinningCombo = checkWinningCells(winningCells); // checks winning cells
  if (isWinningCombo) { // if there was no winner the code continues
    return;
  }
 
 // Check vertically
  winningCells = [cell]; // cell is part of winning
  rowToCheck = rowIndex - 1; // starting from the top
  colToCheck = colIndex; // checks col index
  
  while (rowToCheck >= 0) { // while loop for row to check greater or equal to 0
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      rowToCheck--; // decrements by one in the rowToCheck array
    } else {
      break;
    }
  }
  
  rowToCheck = rowIndex + 1; // checks the bottom so + 1
  while (rowToCheck <= 5) { // while loop for row to check less than or equal to 5 (ignore top row)
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      rowToCheck++; // increments by one in the rowToCheck array
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells); // checks winning cells
  if (isWinningCombo) { // if there was no winner the code continues
    return;
  }
  
  
  // Check diagnally /
  winningCells = [cell]; // cell is a part of winning
  rowToCheck = rowIndex + 1; // row index is increasing
  colToCheck = colIndex - 1; // col index is decreasing
  
  while (colToCheck >= 0 && rowToCheck <= 5) { // while loop for when col to check is greater than or equal to 0 and row to check is less than or equal to 5
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      rowToCheck++; // increments by one in the rowToCheck array
      colToCheck--; // decrements by one in the colToCheck array
    } else {
      break;
    }
  }
  
  rowToCheck = rowIndex - 1; // row index is decreasing
  colToCheck = colIndex + 1; // col index is increasing
  while (colToCheck <= 6 && rowToCheck >= 0) { // while loop for when col to check is less than or equal to 6 and row to check is greater than or equal to 0
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      rowToCheck--; // decrements by one in the rowToCheck array
      colToCheck++; // increments by one in the colToCheck array
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells); // checks winning cells
  if (isWinningCombo) { // if there was no winner the code continues
    return;
  }
  
  
    // Check diagnally \
  winningCells = [cell]; // cell is a part of winning
  rowToCheck = rowIndex - 1; // row index is decreasing
  colToCheck = colIndex - 1; // col index is decreasing
  
  while (colToCheck >= 0 && rowToCheck >= 0) { // while loop for when col to check is greater than or equal to 0 and row to check is greater than or equal to 0
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      rowToCheck--; // decrements by one in the rowToCheck array
      colToCheck--; // decrements by one in the colToCheck array
    } else {
      break;
    }
  }
  
  rowToCheck = rowIndex + 1; // row index is increasing
  colToCheck = colIndex + 1; // col index is increasing
  while (colToCheck <= 6 && rowToCheck <= 5) { // while loop for when col to check is less than or equal to 6 and row to check is less than or equal to 5
    const cellToCheck = rows[rowToCheck][colToCheck]; // creates an array of an array with all of the rows and cells associated with those two parameters
    if (getColorOfCell(cellToCheck) === color) { // if the array has color
      winningCells.push(cellToCheck); // add the cell to check to the winning cells array with push
      rowToCheck++; // increments by one in the rowToCheck array
      colToCheck++; // increments by one in the colToCheck array
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells); // checks winning cells
  if (isWinningCombo) { // if there was no winner the code continues
    return;
  }
  
  // Check to see if we have a tie
  const rowsWithoutTop = rows.slice(0, 6); // slices the top row off of the array
  for (const row of rowsWithoutTop) { // checks all of the rows in the array
    for (const cell of row) { // checks all cells in the array
      const classList = getClassListArray(cell); // gets the cell class in an array
      if (!classList.includes('yellow') && !classList.includes('red')) { // if not class not includes yellow and not class includes red it will continue
        return;
      }
    }
  }
  
  gameIsLive = false;
  statusSpan.textContent = "Game is a tie!"; // statusSpan is set to game is a tie
};




// Event Handlers
// mouse over event that shows the game piece at the top when hovering mouse
const handleCellMouseOver = (e) => { // e event parameter to reference handleCellMouseOver
  if (!gameIsLive) { // dont do anything if game is not live
    return;
  }
  const cell = e.target; // e.target targets the div class in the cell
  const [rowIndex, colIndex] = getCellLocation(cell);
 
  
  const topCell = topCells[colIndex]; // the topCell array
  
  if (yellowIsNext) { // short hand boolean if yellowIsNext is true
    topCell.classList.add('yellow'); // it will add the class yello piece
  } else {
    topCell.classList.add('red'); // else it will add the class red for the red piece
  }
};

// mouse out event that gets rid of the game piece when mousing away in the top row
const handleCellMouseOut = (e) => { // e parameter to reference handleCellMouseOut
  const cell = e.target; // targets the div class in the cell
  const [rowIndex, colIndex] = getCellLocation(cell); // destructure property for each of the elements in the array
  clearColorFromTop(colIndex);
};

const handleCellClick = (e) => { // e parameter to reference handleCellClick
  if (!gameIsLive) { // don't do anything if game in not live
    return;
  }
  const cell = e.target; // e.target all of the div class in the cell
  const [rowIndex, colIndex] = getCellLocation(cell); // destructures the array for each element
  
  const openCell = getFirstOpenCellForColumn(colIndex);
  
  if (!openCell) { // if there are no open cells, don't do anything
    return;
  }
  
  openCell.classList.add(yellowIsNext ? 'yellow' : 'red'); // if yellow is next is true add the yellow class or the red class
  if (yellowIsNext) {
    openCell.classList.add('yellow'); // if yellowisNext is true adds the class yellow
  } else {
    openCell.classList.add('red'); // else it adds the class red
  }
  resetTimer();
  
  checkStatusOfGame(openCell);
  
  yellowIsNext = !yellowIsNext; // set yellowisNext to the opposite color
  clearColorFromTop(colIndex);
  
  if (gameIsLive) { // only do this if the game is live
  const topCell = topCells[colIndex]; // grabs the top cells from the columnIndex
  if (yellowIsNext) {
    topCell.classList.add('yellow'); // after the colors are removed adds it back
  }else {
    topCell.classList.add('red'); // after the colors are removed adds it back
  }
  }
 
};

// Adding Event Listeners
for (const row of rows) { // checks all of the rows in the array
  for (const cell of row) { // checks all of the cells in the array
    cell.addEventListener('mouseover', handleCellMouseOver); // adds mouseover listener
    cell.addEventListener('mouseout', handleCellMouseOut); // adds mouseout listener
    cell.addEventListener('click', handleCellClick); // adds click listener
  }
}

resetButton.addEventListener('click', () => { // adds click to the parameter  
  for (const row of rows) { // checks all of the rows in the array
    for (const cell of row) { // checks all of the cells in the array
      cell.classList.remove('red'); // removes red class
      cell.classList.remove('yellow'); // removes yellow class
      cell.classList.remove('win'); // removes win class
    }
  }
  gameIsLive = true; // on button press game is live is true
  yellowIsNext = true; // and yellow is first
  statusSpan.textContent = ''; // no content in the statusSpan
  document.getElementById("cellColor").innerHTML = "Yellow ";

  resetTimer();
});

timer()

function timer(){
  let downloadTimer = setInterval(function(){
  timeleft--;
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      gameIsLive = false;
      displayLoser();
    }
    
  document.getElementById("countdowntimer").textContent = timeleft;
  },1000);
}

function displayLoser(){
  if(yellowIsNext){ // current loser player is red
    statusSpan.textContent = `The loser here is  ${yellowIsNext ? 'Yellow' : 'Red'}`;
  } else {
    statusSpan.textContent = `Red has lost the game`;
  }
} 

function resetTimer(){
  if(timeleft <= 0){
    timer();
    document.getElementById("countdowntimer").textContent = timeleft;
  }
  if(isBlitz){
    timeleft = 4;
  } else timeleft = 21;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function isBlitzClick() {
isBlitz = true;
isNormal = false;
resetTimer();
}

function isNormalClick() {
isBlitz = false;
isNormal = true;
resetTimer();
}




