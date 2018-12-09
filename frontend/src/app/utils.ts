export function lines(string: string, fontSize: number, containerWidth: number): number {
  // Given a string, the font size and the width of the container, return an estimate
  // of the number of lines needed to display the string in the container
  return Math.ceil((string.length * fontSize) / containerWidth);
}
