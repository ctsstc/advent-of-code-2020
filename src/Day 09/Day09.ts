


export function Solver(linesStr: string[], preambleLength: number): number {
  const lines = linesStr.map(line => parseInt(line));
  // const usedLines: number[] = [];

  for(let i = 0; i < lines.length - preambleLength; i++) {
    const sliceStart = i;
    const sliceEnd = i + preambleLength;
    const current = lines[i + preambleLength];

    const frame = lines.slice(sliceStart, sliceEnd);

    // console.log({current, frame});

    // could use a permutation and sum them
    // https://stackoverflow.com/questions/23305747/javascript-permutation-generator-with-permutation-length-parameter
    // not what we need though, we need uniqueness
    for(let ii = 0; ii < frame.length; ii++) {
      const currentLineIdx = i + ii;
      // if (usedLines.includes(currentLineIdx)) { continue; }

      const frameCurrent = frame[ii];
      const diff = current - frameCurrent;

      // console.log({frameCurrent, diff });

      if (frame.includes(diff)) { // && !usedLines.includes(frame.indexOf(diff))) {
        // usedLines.push(currentLineIdx);
        break;
      }

      if (ii == frame.length - 1) {
        return current;
      }
    }
  }

  return -1;
}
