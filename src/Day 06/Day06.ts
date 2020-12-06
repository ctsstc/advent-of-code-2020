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

// export function Counter(groups: <Array<Array<string>>): number {
//   return 5;
//   // line.split('').forEach(character => {
//   //   if (!(character in group)) {
//   //     group[character] = true;
//   //   }
//   // });
// }