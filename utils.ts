export function createVariants(words: string[]): Set<string> {
  // Given an array of words, return a set that contains some variants of
  // each word. For example, an -s is added to the end of each word to represent
  // the third-person singular.
  const variants = new Set();
  const baseSuffixes = ['', 's', 'ing', 'ed', 'd'];
  const punctuationMarks = [',', '.', ':', ';', ')', '?', '!', '"'];
  let suffixes;
  for (let word of words) {
    // add cases for doubled final letter
    suffixes = baseSuffixes.concat([word[word.length - 1] + 'ing', word[word.length - 1] + 'ed']);
    for (let suffix of suffixes) {
      variants.add(word.trim().toLowerCase() + suffix);
      for (let punctuationMark of punctuationMarks) {
        variants.add(word.trim().toLowerCase() + suffix + punctuationMark);
      }
    }
  }
  return variants;
}

export function *crawlerGenerator(wordsList: string[], text: string): IterableIterator<string> {
  // Given a list of words and a string, yield the phrases of the string that contain at least
  // one word of the list
  const textWords = text.split(/\s+/g);
  const variants = createVariants(wordsList);
  let j = 0;
  let k = 0;
  while ((k < textWords.length) && ('.;:?!'.indexOf(textWords[k].charAt(textWords[k].length - 1)) === -1)) {
    k++;
  }
  for (let i = 0; i < textWords.length; i++) {
    if (variants.has(textWords[i].toLowerCase())) {
      yield (`${textWords[i].replace(/\.|,|;|:|\?|!/g, '').toUpperCase()}: ` + textWords.slice(j,i).join(' ') + ` <strong>${textWords[i]}</strong> ` + textWords.slice(i+1,k+1).join(' '));
    }
    if (i === k) {
      j = i+1;
      k = i+1;
      while ((k < textWords.length) && ('.;:?!'.indexOf(textWords[k].charAt(textWords[k].length - 1)) === -1)) {
        k++;
      }
    }
  }
}

export function lines(string: string, fontSize: number, containerWidth: number): number {
  // Given a string, the font size and the width of the container, return an estimate
  // of the number of lines needed to display the string in the container
  return Math.ceil((string.length * fontSize) / containerWidth);
}
