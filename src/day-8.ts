type Command = 'L' | 'R';
type Card = { [key: string]: [string, string] };

function isSimple(value: number): boolean {
  for (let i = 2; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return true;
}

function simpleMultipliers(value: number): { [key: string]: number } {
  const res = [];
  while (!isSimple(value)) {
    for (var i = 2; !(isSimple(i) && value % i === 0); i++) {}
    res.push(i);
    value = value / i;
  }

  res.push(value);

  return res.reduce((acc, value) => {
    acc[value] += 1;
    return acc;
  }, Object.fromEntries(res.map((value) => [value, 0])));
}

function lcm(numbers: number[]): number {
  const multipliers = numbers.map(simpleMultipliers);
  const keys = Object.keys(multipliers.reduce((acc, value) => Object.assign(acc, value), {}));
  const result = keys.map((key) => [parseInt(key, 10), Math.max(...multipliers.map((m) => m[key] || 0))]);
  return result.reduce((acc, [a, b]) => acc * Math.pow(a, b), 1);
}

export function parseInput(input: string): [Card, Command[]] {
  const lines = input.split('\n');
  const commands: Command[] = lines[0].split('') as Command[];
  const map = lines.slice(2).map((line, index) => {
    const match = line.match(/^(.*?) = \((.*?),\s(.*)\)$/);
    if (!match) {
      throw new Error('wrong input');
    }
    const [_, a, b, c] = match;
    return [a, [b, c]];
  });

  return [Object.fromEntries(map), commands];
}

export function followPath(
  card: Card,
  commands: Command[],
  start: string = 'AAA',
  check: (value: string) => boolean = (value) => value === 'ZZZ'
) {
  for (var i = 0, current = start; !check(current); i++) {
    current = commands.reduce((acc, command) => card[acc][command === 'L' ? 0 : 1], current);
  }

  return commands.length * i;
}

export function followPaths(card: Card, commands: Command[], start: string[]) {
  const check = (value: string) => value[2] === 'Z';
  const paths = start.map((value) => followPath(card, commands, value, check));
  return lcm(paths);
}
