const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startCells = ["", "", "", "", "", "", "", "", ""];

let shape = "circle";
infoDisplay.textContent = "Circle starts first";

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    //square -> class element
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addSymbol);
    gameboard.append(cellElement);
  });
}
createBoard();
addSymbol();

function addSymbol(e) {
  //console.log(e.target);
  //append symbol inside of its div
  const symbol = document.createElement("div");
  symbol.classList.add(shape);
  e.target.append(symbol);
  shape = shape === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "Now, " + shape + "'s turn";
  e.target.removeEventListener("click", addSymbol);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  console.log(allSquares[4]);

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Won";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Won";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}
