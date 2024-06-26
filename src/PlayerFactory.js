function PlayerFactory() {
  const boardLength = 10;
  let legalAttacks;

  function createAttackCoordinates(length) {
    let tempArray = new Array(length * length);
    for (let i = 0; i < length; i += 1) {
      for (let j = 0; j < length; j += 1) {
        let index = i * length + j;
        tempArray[index] = [i, j];
      }
    }
    return tempArray;
  }

  function attackEnemy() {
    let scale = legalAttacks.length;
    let randIndex = Math.floor(Math.random() * scale);
    let attackCoordinates = legalAttacks[randIndex];
    legalAttacks.splice(randIndex, 1);
    return attackCoordinates;
  }

  function getShipPlacement() {
    let shipPlacement = new Array(3);
    for (let i = 0; i < 2; i += 1) {
      let randCoor = Math.floor(Math.random() * boardLength);
      shipPlacement[i] = randCoor;
    }
    shipPlacement[2] = Math.random() < 0.5;
    return shipPlacement;
  }

  legalAttacks = createAttackCoordinates(boardLength);
  return { attackEnemy, getShipPlacement };
}

export default PlayerFactory;
