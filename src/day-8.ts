type Command = 'L' | 'R';
type Card = { [key: string]: [string, string] };

import * as path from 'path';
import * as fs from 'fs';

const input2 = fs.readFileSync(path.join(__dirname, '..', 'test', 'input-8.txt'), { encoding: 'utf-8' });

const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

function parseInput(input: string): [Command[], Card] {
  const lines = input.split('\n');

  return [getCommands(lines[0]), getCard(lines.slice(2))];
}

function getCommands(input: string): Command[] {
  return input.split('') as Command[];
}

function getCard(input: string[]): Card {
  const entries = input.map((line) => {
    const match = line.match(/^(.*?) = \((.*?),\s(.*)\)$/);
    if (!match) {
      throw new Error('wrong input');
    }
    const [_, a, b, c] = match;
    return [a, [b, c]];
  });

  return Object.fromEntries(entries);
}

function followPath(card: Card, commands: Command[]) {
  const entry = Object.keys(card)[0];

  let result = entry;
  let number = 0;

  while (result !== 'ZZZ') {
    result = commands.reduce((acc, command) => card[acc][command === 'L' ? 0 : 1], result);
    number += commands.length;
  }

  return number;
}

const [commands, card] = parseInput(input2);

console.log(followPath(card, commands));

// console.log(getCard(input.split('\n').slice(2)));
