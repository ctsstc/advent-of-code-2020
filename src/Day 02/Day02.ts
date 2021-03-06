import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const path = pathJoin(__dirname, 'input.txt');
export const lines = readFileSync(path)
  .toString()
  .split("\n");

const passwords = lines.map(str => parser(str));
export const validPasswords = passwords.filter(validate);
export const validPasswords2 = passwords.filter(validatePart2);

interface Password {
  lower: number,
  upper: number,
  char: string,
  pass: string
}

function parser(str: string): Password {
  const [range, charPart, pass] = str.split(' ');
  const [lowerChar, upperChar] = range.split('-');
  const lower = parseInt(lowerChar);
  const upper = parseInt(upperChar);
  const [char] = charPart.split(':');

  const password: Password = { lower, upper, char, pass };
  return password;
}

function validate(password: Password) {
  const passwordHash = password.pass.split('').reduce((hash, char) => {
    if (char in hash) {
      hash[char]++;
    }
    else {
      hash[char] = 1;
    }
    return hash;
  }, {});

  const charCount = passwordHash[password.char];
  return charCount >= password.lower && charCount <= password.upper;
}

function validatePart2(password: Password) {
  const char1 = password.pass[password.lower - 1];
  const char2 = password.pass[password.upper - 1];

  // console.log({char1, char2, password});

  return (
    (char1 == password.char && char2 != password.char) ||
    (char1 != password.char && char2 == password.char)
  );
}