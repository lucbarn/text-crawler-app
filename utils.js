function *crawlerGenerator(strings, text) {
  const words = text.split(/\s+/g);
  const variants = {};
  for (let word of strings) {
    for (let suffix of ['', 's', 'ing', 'ed', 'd']) {
      variants[word.toLowerCase() + suffix] = 1;
      for (let punctuationMark of [',', '.', ':', ';', ')', '?', '!']) {
        variants[word.toLowerCase() + suffix + punctuationMark] = 1;
      }
    }
  }
  for (let i = 0; i < words.length; i++) {
    if (variants[words[i].toLowerCase()] === 1) {
      let j = i-1;
      let k = i;
      while ((j >= 0) && ('.;:?!'.indexOf(words[j].charAt(words[j].length - 1)) === -1)) {
        j--;
      }
      while ((k < words.length) && ('.;:?!'.indexOf(words[k].charAt(words[k].length - 1)) === -1)) {
        k++;
      }
      yield (`${words[i].replace(/\.|,|;|:|\?|!/g, '').toUpperCase()}: ` + words.slice(j+1,i).join(' ') + ` <strong>${words[i]}</strong> ` + words.slice(i+1,k+1).join(' '));
    }
  }
}

let crawler;
let phrase;

function analyzeText() {
  crawler = crawlerGenerator(wordsList, text);
  phrase = crawler.next();
  textArea.innerHTML = '';
  showResults();
}

function showResults() {
  for (let i = 0; i < 20; i++) {
    if (phrase.done) {
      break;
    } else {
      textArea.innerHTML += `<p>${phrase.value}</p>`;
      phrase = crawler.next();
    }
  }
  if (phrase.done && (showMoreButton.style.display === 'flex')) {
    showMoreButton.style.display = 'none';
  } else if (!phrase.done && (showMoreButton.style.display != 'flex')) {
    showMoreButton.style.display = 'flex';
  }
}

// i -> index of the next word to be displayed
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
