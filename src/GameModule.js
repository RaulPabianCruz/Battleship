import GameBoardFactory from './GameboardFactory';
import PlayerFactory from './PlayerFactory';

function GameModule() {
  let playerBoard;
  let compBoard;
  let comp;
  let playerTurn;
  let roundNumber;

  function resetGame() {
    comp = PlayerFactory();
    playerBoard = GameBoardFactory();
    compBoard = GameBoardFactory();
    playerTurn = true;
    roundNumber = 1;
  }

  function placePlayerShip(shipName, coor1, coor2, isVertical = true) {
    let isShipPlaced;
    try {
      switch (shipName) {
        case 'Carrier':
          playerBoard.placeCarrier(coor1, coor2, isVertical);
          isShipPlaced = true;
          break;
        case 'Battleship':
          playerBoard.placeBattleship(coor1, coor2, isVertical);
          isShipPlaced = true;
          break;
        case 'Destroyer':
          playerBoard.placeDestroyer(coor1, coor2, isVertical);
          isShipPlaced = true;
          break;
        case 'Submarine':
          playerBoard.placeSubmarine(coor1, coor2, isVertical);
          isShipPlaced = true;
          break;
        case 'PatrolBoat':
          playerBoard.placePatrolBoat(coor1, coor2);
          isShipPlaced = true;
          break;
        default:
          isShipPlaced = false;
      }
    } catch (error) {
      isShipPlaced = false;
    }
    return isShipPlaced;
  }

  function placeCompShip(shipName) {
    let shipIsPlaced = false;
    while (!shipIsPlaced) {
      let coor1, coor2, isVertical;
      [coor1, coor2, isVertical] = comp.getShipPlacement();
      try {
        switch (shipName) {
          case 'Carrier':
            compBoard.placeCarrier(coor1, coor2, isVertical);
            break;
          case 'Battleship':
            compBoard.placeBattleship(coor1, coor2, isVertical);
            break;
          case 'Destroyer':
            compBoard.placeDestroyer(coor1, coor2, isVertical);
            break;
          case 'Submarine':
            compBoard.placeSubmarine(coor1, coor2, isVertical);
            break;
          default:
            compBoard.placePatrolBoat(coor1, coor2);
        }
        shipIsPlaced = true;
      } catch (error) {
        //console.log(`Error placing ${shipName}.`);
      }
    }
  }

  function placeAllCompShips() {
    placeCompShip('Carrier');
    placeCompShip('Battleship');
    placeCompShip('Destroyer');
    placeCompShip('Submarine');
    placeCompShip('PatrolBoat');
  }

  function togglePlayerTurn() {
    playerTurn = !playerTurn;
  }

  function isPlayerTurn() {
    return playerTurn;
  }

  function increaseRoundNumber() {
    roundNumber += 1;
  }

  function getRoundNumber() {
    return roundNumber;
  }

  function compAttack() {
    let attackCoors = comp.attackEnemy();
    playerBoard.receiveAttack(attackCoors[0], attackCoors[1]);
    togglePlayerTurn();
    return attackCoors;
  }

  function playerAttack(coor1, coor2) {
    compBoard.receiveAttack(coor1, coor2);
    togglePlayerTurn();
  }

  function getPlayerBoard() {
    return playerBoard.getGameboard();
  }

  function getCompBoard() {
    return compBoard.getGameboard();
  }

  function isGameOver() {
    return playerBoard.haveAllShipsSunk() || compBoard.haveAllShipsSunk();
  }

  function getResultsMessage() {
    if (isGameOver()) {
      if (compBoard.haveAllShipsSunk()) return 'Congrats you win!';
      return 'You lose!';
    }
    return undefined;
  }

  resetGame();
  return {
    resetGame,
    placePlayerShip,
    placeAllCompShips,
    isPlayerTurn,
    increaseRoundNumber,
    getRoundNumber,
    getPlayerBoard,
    getCompBoard,
    playerAttack,
    compAttack,
    isGameOver,
    getResultsMessage,
  };
}

export default GameModule;
