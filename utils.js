function createVariants(words) {
  // Given an array of words, return a set that contains some variants of
  // each word. For example, an -s is added to the end of each word to represent
  // the third-person singular. At the moment it is still a naive approach, since
  // the same suffixes are added to every word.
  const variants = new Set();
  const suffixes = ['', 's', 'ing', 'ed', 'd'];
  const punctuationMarks = [',', '.', ':', ';', ')', '?', '!'];
  for (let word of words) {
    for (let suffix of suffixes) {
      variants.add(word.trim().toLowerCase() + suffix);
      for (let punctuationMark of punctuationMarks) {
        variants.add(word.trim().toLowerCase() + suffix + punctuationMark);
      }
    }
  }
  return variants;
}

function *crawlerGenerator(wordsList, text) {
  const textWords = text.split(/\s+/g);
  const variants = createVariants(wordsList);
  for (let i = 0; i < textWords.length; i++) {
    if (variants.has(textWords[i].toLowerCase())) {
      let j = i-1;
      let k = i;
      while ((j >= 0) && ('.;:?!'.indexOf(textWords[j].charAt(textWords[j].length - 1)) === -1)) {
        j--;
      }
      while ((k < textWords.length) && ('.;:?!'.indexOf(textWords[k].charAt(textWords[k].length - 1)) === -1)) {
        k++;
      }
      yield (`${textWords[i].replace(/\.|,|;|:|\?|!/g, '').toUpperCase()}: ` + textWords.slice(j+1,i).join(' ') + ` <strong>${textWords[i]}</strong> ` + textWords.slice(i+1,k+1).join(' '));
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

function lines(string, fontSize, containerWidth) {
  // return an estimate of the number of lines required to
  // display a given string
  return Math.ceil((string.length * fontSize) / containerWidth);
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
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
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
  changeArrowsStyle();
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
    changeArrowsStyle();
  }
}
