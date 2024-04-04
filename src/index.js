import './style.css';
import initializeLayout from './layout';
import DOMController from './DomInteraction';

initializeLayout();

let controller = DOMController();
controller.resetGameDisplay();

let resetBttn = document.querySelector('.reset-bttn');
resetBttn.addEventListener('click', controller.resetGameDisplay);
