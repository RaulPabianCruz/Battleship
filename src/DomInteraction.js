import GameModule from './GameModule';

function DOMController() {
  let game = GameModule();

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

  function updateStatusText() {
    let statusText = document.querySelector('.status-text');
    if (game.isGameOver()) {
      statusText.textContent = game.getResultsMessage();
    } else {
      let roundNumber = game.getRoundNumber();
      statusText.textContent = `Turn ${roundNumber}`;
    }
  }

  function gridClickHandler(event) {
    let square = event.target;
    let coor1 = Number(square.getAttribute('data-row'));
    let coor2 = Number(square.getAttribute('data-col'));

    game.playerAttack(coor1, coor2);
    updateOpponentGrid(square, coor1, coor2);

    if (!game.isGameOver()) {
      [coor1, coor2] = game.compAttack();
      updatePlayerGrid(coor1, coor2);
      game.increaseRoundNumber();
    }

    updateStatusText();
  }

  function createGridSquare(row, col, selector, value) {
    let square = document.createElement('div');
    square.classList.add('grid-square');
    square.classList.add(selector);
    square.setAttribute('data-row', row);
    square.setAttribute('data-col', col);

    if (typeof value === 'string') square.classList.add('ship');

    return square;
  }

  function renderGrid(array, selector) {
    let grid = document.querySelector(`.${selector}.grid`);
    grid.replaceChildren();

    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[i].length; j += 1) {
        let gridSquare = createGridSquare(i, j, selector, array[i][j]);
        grid.appendChild(gridSquare);
      }
    }
  }

  function resetGameDisplay() {
    game.resetGame();
    game.placeAllCompShips();
    renderGrid(game.getPlayerBoard(), 'player');
    renderGrid(game.getCompBoard(), 'opponent');
    updateStatusText();
  }

  function enableSquareListeners() {
    let opponentGrid = document.querySelector('.opponent.grid');
    let squareArray = opponentGrid.querySelectorAll('.grid-square');
    for (let square of squareArray)
      square.addEventListener('click', gridClickHandler);
  }

  function startGame() {
    if (game.isBoardSetupComplete()) {
      renderGrid(game.getPlayerBoard(), 'player');
      enableSquareListeners();
      updateStatusText();
    } else resetGameDisplay();
  }

  function getPromptCoordinates(shipName) {
    let response = prompt(
      `Enter which row and column to place your ${shipName} on (in the format (0-9),(0-9)):`,
    );
    if (response === null) return response;

    let coordinates = response.split(',');
    if (coordinates.length !== 2) {
      alert('Invalid coordinates, try again.');
      return getPromptCoordinates(shipName);
    }

    return [Number(coordinates[0]), Number(coordinates[1])];
  }

  function getPromptOrientation(shipName) {
    let isVertical = undefined;
    if (shipName.localeCompare('PatrolBoat') !== 0)
      isVertical = confirm(
        'Press Ok to place the ship vertically or press cancel to place it horizontally',
      );
    return isVertical;
  }

  function promptShipPlacements() {
    //here temporarily to prevent setup button from breaking an ongoing game.
    resetGameDisplay();

    const shipNames = game.getShipNames();
    let counter = 0;

    while (counter < shipNames.length) {
      let coordinates = getPromptCoordinates(shipNames[counter]);
      if (coordinates === null) break;

      let isVertical = getPromptOrientation(shipNames[counter]);

      let coor1, coor2;
      [coor1, coor2] = coordinates;

      let isShipPlaced = game.placePlayerShip(
        shipNames[counter],
        coor1,
        coor2,
        isVertical,
      );

      if (!isShipPlaced) {
        alert('Invalid ship placement, please try again.');
        continue;
      }
      counter += 1;
    }

    startGame();
  }

  return { resetGameDisplay, promptShipPlacements };
}
export default DOMController;
