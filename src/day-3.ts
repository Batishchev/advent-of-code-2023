type MatrixElement =
  | {
      type: 'number';
      value: number;
      id: number;
    }
  | {
      type: 'symbol';
      value: string;
    }
  | {
      type: 'empty';
    };

let id = 0;

function nestedForEach(scheme: MatrixElement[][], callback: (value: MatrixElement, i: number, j: number) => void) {
  scheme.forEach((row, i) => row.forEach((value, j) => callback(value, i, j)));
}

function parseNumber(match: RegExpMatchArray): [MatrixElement, number[]] | undefined {
  if (typeof match[0] !== 'string' || typeof match.index !== 'number') {
    return;
  }

  const value = match[0];
  const { index } = match;

  return [
    { type: 'number', value: parseInt(value, 10), id: id++ },
    new Array(value.length).fill(0).map((_, i) => index + i)
  ];
}

function parseScheme(input: string): MatrixElement[][] {
  const lines = input.split('\n');
  const result: MatrixElement[][] = new Array<MatrixElement[]>(lines.length).fill([]);

  lines.forEach((line: string, index) => {
    // Все элементы пустые
    result[index] = new Array<MatrixElement>(line.length).fill({ type: 'empty' });

    // Все цифровые элементы
    [...line.matchAll(/\d+/g)]
      .map(parseNumber)
      .filter((value): value is [MatrixElement, number[]] => typeof value !== 'undefined')
      .forEach(([value, indexes]) => indexes.forEach((i) => (result[index][i] = value)));

    // Все символы
    [...line.matchAll(/[^\d\.]/g)].map((value) => {
      if (typeof value[0] === 'string' && typeof value.index === 'number') {
        result[index][value.index] = { type: 'symbol', value: value[0] };
      }
    });
  });

  return result;
}

function getNumbersAround(scheme: MatrixElement[][], i: number, j: number): number[] {
  const rowSlice = scheme.slice(Math.max(i - 1, 0), i + 2);
  const colSlice = rowSlice.map((row) => row.slice(Math.max(j - 1, 0), j + 2));
  const ids: { [key: string]: boolean } = {};
  return colSlice
    .flat()
    .map((value) => {
      if (value.type !== 'number' || ids[value.id]) {
        return undefined;
      }

      ids[value.id] = true;
      return value.value;
    })
    .filter((value): value is number => typeof value !== 'undefined');
}

export function sumScheme(input: string): number {
  const scheme = parseScheme(input);
  let sum = 0;

  nestedForEach(scheme, (value, i, j) => {
    if (value.type === 'symbol') {
      sum += getNumbersAround(scheme, i, j).reduce((acc, v) => acc + v, 0);
    }
  });

  return sum;
}

export function sumGears(input: string): number {
  const scheme = parseScheme(input);
  let sum = 0;

  nestedForEach(scheme, (value, i, j) => {
    if (value.type !== 'symbol' || value.value !== '*') {
      return;
    }

    const numbers = getNumbersAround(scheme, i, j);
    if (numbers.length === 2) {
      sum += numbers[0] * numbers[1];
    }
  });

  return sum;
}
