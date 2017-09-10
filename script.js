const form = document.getElementById('form');
const fileUpload = document.getElementById('file-upload');
const words = document.getElementById('words');
const enterButton = document.getElementById('enter-button');
const startButton = document.getElementById('start-button');
const textArea = document.getElementById('text-area');
const reader = new FileReader();
const wordsList = [];

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
  wordsList.push(words.value);
  words.value = '';
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
