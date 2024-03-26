function shipFactory(length) {
  if (typeof length !== 'number' || length < 2 || length > 5)
    throw new Error('Invalid ship length.');
  let hitsRemaining = length;

  function hit() {
    hitsRemaining -= 1;
  }

  function isSunk() {
    return hitsRemaining <= 0;
  }

  function getLength() {
    return length;
  }

  return { hit, isSunk, getLength };
}
export default shipFactory;
