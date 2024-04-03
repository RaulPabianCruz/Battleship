import GameModule from './GameModule';

function DOMController() {
  let game = GameModule();

  function createGridSquare(row, col, selector, value) {
    let square = document.createElement('div');
    square.classList.add('grid-square');
    square.classList.add(selector);
    square.setAttribute('data-row', row);
    square.setAttribute('data-col', col);

    if (typeof value === 'string') square.classList.add('ship');

    return square;
  }

  function updateSquare(squareElem, value) {
    if (value === 1) squareElem.classList.add('hit');
    else squareElem.classList.add('miss');
  }

  function updateOpponentGrid(opponentSquare, coor1, coor2) {
    let opponentBoard = game.getCompBoard();
    let value = opponentBoard[coor1][coor2];
    updateSquare(opponentSquare, value);
  }

  function updatePlayerGrid(coor1, coor2) {
    let playerGrid = document.querySelector('.player.grid');
    let playerSquare = playerGrid.querySelector(
      `[data-row="${coor1}"][data-col="${coor2}"]`,
    );
    let playerBoard = game.getPlayerBoard();
    let value = playerBoard[coor1][coor2];
    updateSquare(playerSquare, value);
  }

  function gridClickHandler(event) {
    let square = event.target;
    let coor1 = Number(square.getAttribute('data-row'));
    let coor2 = Number(square.getAttribute('data-col'));

    game.playerAttack(coor1, coor2);
    updateOpponentGrid(square, coor1, coor2);
    //updateStatusText();

    [coor1, coor2] = game.compAttack();
    updatePlayerGrid(coor1, coor2);
    //updateStatusText();
  }

  function renderGrid(array, selector) {
    let grid = document.querySelector(`.${selector}.grid`);

    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[i].length; j += 1) {
        let gridSquare = createGridSquare(i, j, selector, array[i][j]);
        grid.appendChild(gridSquare);
      }
    }
    if (selector === 'opponent')
      grid.addEventListener('click', gridClickHandler);
  }

  function updateStatusText(statusMessage) {}

  game.placeShips();
  renderGrid(game.getPlayerBoard(), 'player');
  renderGrid(game.getCompBoard(), 'opponent');
  return { renderGrid };
}
export default DOMController;
