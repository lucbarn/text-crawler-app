const modalContainer = document.getElementById('modal-container');
const modalDescription = document.getElementById('modal-description');
const modalWords = document.getElementById('modal-words');
const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');
const modalWordsList = document.getElementById('modal-words-list');
const closingButtons = document.getElementsByClassName('closing-button');
const wordsVar = document.getElementById('words');
const descriptionVar = document.getElementById('description');
const formVar = document.getElementById('form');
const fileUpload = document.getElementById('file-upload');
const boxVar = document.getElementById('box');
const enterButton = document.getElementById('enter-button');
const startButton = document.getElementById('start-button');
const textArea = document.getElementById('text-area');
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

wordsVar.addEventListener('click', function(event) {
  if (event.target.className == 'header-li-text') {
    modalDescription.style.display = 'none';
    modalWords.style.display = 'flex';
    renderWordsList();
    modalContainer.style.visibility = 'visible';
    modalContainer.style.opacity = 1;
  }
});

descriptionVar.addEventListener('click', function(event) {
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

formVar.addEventListener('submit', function(event) {
  event.preventDefault();
  if (boxVar.value) {
    if ((boxVar.value.length < 40) && (wordsList.indexOf(boxVar.value) === -1)) {
      wordsList.push(boxVar.value);
    }
    boxVar.value = '';
  }
});

function crawler(strings, text) {
  const words = text.split(/\s+/g);
  const res = [];
  const variants = {};
  for (let word of strings) {
    for (let suffix of ['', 's', 'ing', 'ed', 'd']) {
      variants[word + suffix] = 1;
      for (let punctuationMark of [',', '.', ':', ';', ')', '?', '!']) {
        variants[word + suffix + punctuationMark] = 1;
      }
    }
  }
  for (let i = 0; i < words.length; i++) {
    if (variants[words[i]] === 1) {
      let j = i-1;
      let k = i;
      while ((j >= 0) && ('.;:?!'.indexOf(words[j].charAt(words[j].length - 1)) === -1)) {
        j--;
      }
      while ((k < words.length) && ('.;:?!'.indexOf(words[k].charAt(words[k].length - 1)) === -1)) {
        k++;
      }
      // res.push(`${words[i].toUpperCase()}: ` + words.slice(j+1,k+1).join(' '));
      res.push(`${words[i].replace(/\.|,|;|:|\?|!/g, '').toUpperCase()}: ` + words.slice(j+1,i).join(' ') + ` <strong>${words[i]}</strong> ` + words.slice(i+1,k+1).join(' '));
    }
  }
  return res;
}

function analyzeText() {
  phrases = crawler(wordsList, text);
  textArea.innerHTML = '';
  for (const phrase of phrases) {
    textArea.innerHTML += `<p>${phrase}</p>`;
  }
}

let i = 0;

function lines(string) {
  // modalContainer.clientWidth * 0.6 -> width of modal-words
  // modalWords' width * 0.7 -> max width of modal-words-list
  // 24 -> estimate of the width of upper case W (24px)
  return Math.ceil((string.length * 24) / (modalContainer.clientWidth * 0.6 * 0.7));
}

function deleteWord(element) {
  wordsList.splice(element.getAttribute('wordsListIndex'), 1);
  n = modalWordsList.childElementCount;
  if ((n === 1) && (wordsList.length != 0)) {
    previous();
  } else {
    renderWordsList();
  }
}

function renderWordsList() {
  // 0.8 -> max modalWordsList height is 80% of its container's height
  if (wordsList.length == 0) {
    modalWordsList.innerText = 'No results';
    i = 0;
  } else {
    n = modalWordsList.childElementCount;
    i -= n;
    next();
  }
}

function next() {
  // 80% of the height of modalWords, which is 80% of the
  // height of modalContainer
  let spaceLeft = modalContainer.clientHeight * 0.8 * 0.8;
  const tempList = [];
  while (i < wordsList.length) {
    // 30 -> line-height
    // 20 -> 10 + 10 = margin-top + margin-bottom
    const estimatedLiHeight = lines(wordsList[i]) * 30 + 20;
    if (estimatedLiHeight > spaceLeft) {
      break;
    } else {
      tempList.push(wordsList[i]);
      spaceLeft -= estimatedLiHeight;
      i++;
    }
  }
  if (tempList.length > 0) {
    modalWordsList.innerHTML = '';
    let word;
    for (let k = 0; k < tempList.length; k++) {
      word = tempList[k];
      modalWordsList.innerHTML += `<li class="words-container-li">
                                     <div class="word-container"
                                          wordsListIndex="${i - tempList.length + k}"
                                          onclick="deleteWord(this)">${word}</div>
                                   </li>`;
    }
  }
}

function previous() {
  let spaceLeft = modalContainer.clientHeight * 0.8 * 0.8;
  n = modalWordsList.childElementCount;
  if (i > n) {
    i -= n;
    j = i-1;
    const tempList = [];
    while (j >= 0) {
      // 30 -> line-height
      // 20 -> 10 + 10 = margin-top + margin-bottom
      const estimatedLiHeight = lines(wordsList[j]) * 30 + 20;
      if (estimatedLiHeight > spaceLeft) {
        break;
      } else {
        tempList.push(wordsList[j]);
        spaceLeft -= estimatedLiHeight;
        j--;
      }
    }
    if (tempList.length > 0) {
      tempList.reverse();
      modalWordsList.innerHTML = '';
      let word;
      for (let k = 0; k < tempList.length; k++) {
        word = tempList[k];
        modalWordsList.innerHTML += `<li class="words-container-li">
                                       <div class="word-container"
                                            wordsListIndex="${i - tempList.length + k}"
                                            onclick="deleteWord(this)">${word}</div>
                                     </li>`;
      }
    }
  }
}
