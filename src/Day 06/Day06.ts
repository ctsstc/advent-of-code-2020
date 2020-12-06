import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
export const lines = readFileSync(path)
  .toString()
  .split("\n");

  export const testLines = readFileSync(pathJoin(__dirname, 'example.txt'))
  .toString()
  .split("\n");

export function Grouper(lines: Array<string>): Array<Array<string>> {

  let group = [];
  return lines.reduce((groups, line, idx) => {

    if (line != '') {
      group.push(line);
    }

    if (line == '' || idx == lines.length - 1) {
      groups.push(group);
      group = [];
    }

    return groups;
  }, []);
}

function Unique(value, index, self) {
  return self.indexOf(value) === index;
}

export function Counter(groups: Array<Array<string>>): number {
  return groups.reduce((count, group) => {
    const chars = group.join('');
    const uniques = chars.split('').filter(Unique);
    return count + uniques.length;
  }, 0);
}

export function Hasher(groups: Array<Array<string>>) {
  return groups.map((lines) => {
    return lines.reduce((hash, line) => {
      const chars = line.split('');
      // console.log({chars, hash, line});

      chars.forEach((char) => {
        if (char in hash) {
          hash[char]++;
        }
        else {
          hash[char] = 1;
        }
      });

      return hash;
    }, {});
  });
}

export function CountHasher(hasher, grouper) {
  return hasher.reduce((count, hash, idx) => {
    const groupLineCount = grouper[idx].length;
    const matching = Object.values(hash).filter(value => value == groupLineCount);

    return count + matching.length;
  }, 0);
}
