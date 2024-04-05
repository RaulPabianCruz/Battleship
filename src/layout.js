function initializeHeader() {
  let header = document.querySelector('.header');
  let h2 = document.createElement('h2');
  h2.classList.add('header-title');
  h2.textContent = 'Battleship, The Game';
  header.append(h2);
}

function initializeStatus() {
  let status = document.querySelector('.status-container');
  let h3 = document.createElement('h3');
  h3.classList.add('status-text');
  status.append(h3);
}

function intializeGridContent() {
  let gridContent = document.querySelector('.grid-content');
  let playerSection = createSection('player');
  let opponentSection = createSection('opponent');
  gridContent.appendChild(playerSection);
  gridContent.appendChild(opponentSection);
}

function createSection(playerString) {
  let section = document.createElement('div');
  section.classList.add(`${playerString}`);
  section.classList.add('grid-section-container');

  let sectionTitle = document.createElement('h4');
  sectionTitle.textContent = `${playerString} board:`;
  sectionTitle.classList.add(`${playerString}`);
  sectionTitle.classList.add('grid-title');

  let sectionGrid = document.createElement('div');
  sectionGrid.classList.add(`${playerString}`);
  sectionGrid.classList.add('grid');

  section.appendChild(sectionTitle);
  section.appendChild(sectionGrid);
  return section;
}

function intializeFooter() {
  let buttonArea = document.querySelector('.button-container');
  let resetBttn = document.createElement('button');
  resetBttn.textContent = 'Reset';
  resetBttn.classList.add('reset-bttn');

  let setupBttn = document.createElement('button');
  setupBttn.textContent = 'Setup Board';
  setupBttn.classList.add('set-up-bttn');

  buttonArea.appendChild(resetBttn);
  buttonArea.appendChild(setupBttn);
}

function initializeLayout() {
  initializeHeader();
  initializeStatus();
  intializeGridContent();
  intializeFooter();
}

export default initializeLayout;
