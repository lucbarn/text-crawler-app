const modalContainer = document.getElementById('modal-container');
const modalDescription = document.getElementById('modal-description');
const modalWords = document.getElementById('modal-words');
const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');
const modalWordsList = document.getElementById('modal-words-list');
const closingButtons = document.getElementsByClassName('closing-button');
const headerUl = document.getElementById('header-ul');
const pile = document.getElementById('pile');
const topLayer = document.getElementById('top-layer');
const middleLayer = document.getElementById('middle-layer');
const bottomLayer = document.getElementById('bottom-layer');
const words = document.getElementById('words');
const description = document.getElementById('description');
const form = document.getElementById('form');
const fileUpload = document.getElementById('file-upload');
const box = document.getElementById('box');
const enterButton = document.getElementById('enter-button');
const startButton = document.getElementById('start-button');
const textArea = document.getElementById('text-area');
const showMoreButton = document.getElementById('show-more');
const reader = new FileReader();
const wordsList = [];

const arrowSide = 30;
let ctx = left.getContext('2d');
ctx.strokeStyle ='blue';
ctx.lineWidth = 1;
ctx.moveTo(35, 5);
ctx.lineTo(35 - arrowSide * Math.sin(Math.PI / 3), 20);
ctx.lineTo(35, 35);
ctx.lineTo(35, 5);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.stroke();

ctx = right.getContext('2d');
ctx.strokeStyle ='blue';
ctx.lineWidth = 1;
ctx.moveTo(5, 5);
ctx.lineTo(5 + arrowSide * Math.sin(Math.PI / 3), 20);
ctx.lineTo(5, 35);
ctx.lineTo(5, 5);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.stroke();

for (let i = 0; i < closingButtons.length; i++) {
  closingButtons[i].addEventListener('click', function() {
    modalContainer.style.opacity = 0;
    window.setTimeout(function() {
      modalContainer.style.visibility = 'hidden';
    }, 500);
  });
}

leftArrow.addEventListener('click', previous);
rightArrow.addEventListener('click', next);

let headerUlVisible = false;

pile.addEventListener('click', function() {
  if (!headerUlVisible) {
    headerUl.style.transform = 'translateX(0%)';
    middleLayer.style.opacity = '0';
    topLayer.style.top = '50%';
    topLayer.style.transform = 'translateY(-50%) rotate(45deg)';
    topLayer.style.backgroundColor = 'rgb(227,86,48)';
    bottomLayer.style.bottom = '50%';
    bottomLayer.style.transform = 'translateY(50%) rotate(-45deg)';
    bottomLayer.style.backgroundColor = 'rgb(227,86,48)';
    headerUlVisible = true;
  } else {
    headerUl.style.transform = 'translateX(110%)';
    middleLayer.style.opacity = '1';
    topLayer.style.top = '5%';
    topLayer.style.transform = '';
    topLayer.style.backgroundColor = 'rgb(28,105,180)';
    bottomLayer.style.bottom = '5%';
    bottomLayer.style.transform = '';
    bottomLayer.style.backgroundColor = 'rgb(28,105,180)';
    headerUlVisible = false;
  }
});

words.addEventListener('click', function(event) {
  if (event.target.className == 'header-li-text') {
    modalDescription.style.display = 'none';
    modalWords.style.display = 'flex';
    renderWordsList();
    modalContainer.style.visibility = 'visible';
    modalContainer.style.opacity = 1;
  }
});

description.addEventListener('click', function(event) {
  if (event.target.className == 'header-li-text') {
    modalWords.style.display = 'none';
    modalDescription.style.display = 'flex';
    modalContainer.style.visibility = 'visible';
    modalContainer.style.opacity = 1;
  }
});

fileUpload.addEventListener('click', function() {
  this.value = '';
});

if (fileUpload.files.length > 0) {
  const uploadedFile = fileUpload.files[0];
  reader.readAsText(uploadedFile, 'UTF-8');
  reader.onload = function(event) {
    text = event.target.result;
    startButton.addEventListener('click', analyzeText);
  };
  reader.onerror = function() {
    textArea.innerText = 'There was an error reading the file!';
  };
}

fileUpload.addEventListener('change', function() {
  startButton.removeEventListener('click', analyzeText);
  const uploadedFile = this.files[0];
  reader.readAsText(uploadedFile, 'UTF-8');
  reader.onload = function(event) {
    text = event.target.result;
    startButton.addEventListener('click', analyzeText);
  };
  reader.onerror = function() {
    textArea.innerText = 'There was an error reading the file!';
  };
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (box.value) {
    if ((box.value.length < 40) && (wordsList.indexOf(box.value) === -1)) {
      wordsList.push(box.value);
    }
    box.value = '';
  }
});

showMoreButton.addEventListener('click', showResults);
