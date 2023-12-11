type Position = [number, number];
type Matrix = Position[][][];

import * as path from 'path';
import * as fs from 'fs';

const PIPES: { [key: string]: [boolean, boolean, boolean, boolean] } = {
  '|': [true, false, true, false],
  '-': [false, true, false, true],
  L: [true, true, false, false],
  J: [true, false, false, true],
  '7': [false, false, true, true],
  F: [false, true, true, false],
  S: [true, true, true, true]
};

function getConnectors(value: string): number[] {
  return (PIPES[value] || [false, false, false, false])
    .map((value, index) => (value === true ? index : undefined))
    .filter((value): value is number => typeof value === 'number');
}

export function parseInput(input: string): [string[][], Matrix, Position] {
  const rows = input.split(/\n/g).filter((line) => line.trim().length > 0);
  const rawMatrix = rows.map((row) => row.split(''));
  let sPosition: Position = [0, 0];

  const matrix = rawMatrix.map((row, i) => {
    return row.map((value, j) => {
      if (value === 'S') {
        sPosition = [i, j];
      }
      return getConnectors(value)
        .map((value) => [value, i + (value % 2 === 0 ? value - 1 : 0), j + (value % 2 === 1 ? 2 - value : 0)])
        .filter(([_, x, y]) => x >= 0 && x < rawMatrix.length && y >= 0 && y < row.length)
        .filter(([v, x, y]) => getConnectors(rawMatrix[x][y]).indexOf((v + 2) % 4) >= 0)
        .map(([_, x, y]): Position => [x, y]);
    });
  });

  const [i, j] = sPosition;

  const area = [rawMatrix[i - 1]?.[j], rawMatrix[i]?.[j + 1], rawMatrix[i + 1]?.[j], rawMatrix[i]?.[j - 1]]
    .map((value, index): [number, string] => [index, value])
    .filter(([i, v]) => typeof v !== 'undefined')
    .map(([i, v]) => {
      const connectors = getConnectors(v);
      return connectors.indexOf((i + 2) % 4) >= 0 ? '1' : '0';
    })
    .join('');

  const s =
    area === '1010'
      ? '|'
      : area === '0101'
      ? '-'
      : area === '1100'
      ? 'L'
      : area === '1001'
      ? 'J'
      : area === '0011'
      ? '7'
      : area === '0110'
      ? 'F'
      : 'S';

  rawMatrix[i][j] = s;

  return [rawMatrix, matrix, sPosition];
}

export function getPipeLoop(matrix: Matrix, sPosition: Position): Position[] {
  const hashPath = (path: number[]) => path.join('#');
  const history: { [key: string]: Position } = {}; //Object.fromEntries([[hashPath(sPosition), sPosition]]);
  let [x, y] = sPosition;

  do {
    const nextPath: Position = matrix[x][y].filter((value) => !history[hashPath(value)])[0];
    [x, y] = nextPath;
    history[hashPath(nextPath)] = nextPath;
  } while (x !== sPosition[0] || y !== sPosition[1]);

  return Object.values(history);
}

export function getInnerArea(input: string): number {
  const [rawMatrix, matrix, sPosition] = parseInput(input);
  const rows = input.split(/\n/g).filter((line) => line.trim().length > 0);
  // const rawMatrix = rows.map((row) => row.split(''));
  const hashPath = (path: number[]) => path.join('#');
  const mainLoop = getPipeLoop(matrix, sPosition);
  const hash = Object.fromEntries(mainLoop.map((p) => [hashPath(p), p]));

  // let current: 'field' | 'outer' | 'inner' = 'field';

  let res = 0;

  for (let i = 0; i < rawMatrix.length; i++) {
    let inner = false;
    let c = [0, 0];
    let line = '';
    for (let j = 0; j < rawMatrix[i].length; j++) {
      let value = rawMatrix[i][j];
      if (hash[hashPath([i, j])]) {
        if (value === '7') {
          line += '┐';
        } else if (value === 'J') {
          line += '┘';
        } else if (value === 'F') {
          line += '┌';
        } else if (value === 'L') {
          line += '└';
        } else {
          line += value;
        }
        const connectors = getConnectors(value);
        const up = connectors.indexOf(0) >= 0;
        const down = connectors.indexOf(2) >= 0;

        if (up || down) {
          c[0] += up ? 1 : 0;
          c[1] += down ? 1 : 0;

          if (c[0] >= 2 || c[1] >= 2) {
            c = [0, 0];
          } else if (c[0] > 0 && c[1] > 0) {
            inner = !inner;
            c = [0, 0];
          }
        }
      } else if (inner) {
        res++;
        line += '#';
      } else {
        line += 'o';
      }
    }
    console.log(line);
  }

  return res;

  /*
  const t = rawMatrix.map((row, i) => {
    let inner = false;
    const newRow = row.map((value, j) => {
      if (hash[hashPath([i, j])]) {
        inner = !inner;
      }

      } else if (value === '.') {
        return inner ? '#' : ' ';
      }
      return ' ';
    });
    console.log(newRow.join(''));
    return newRow;
  });

  const t2 = rawMatrix.map((row, i) => row.slice());

  for (let i = 0; i < rawMatrix.length; i++) {
    for (let j = 0; j < rawMatrix.length; j++) {
      const temp = rawMatrix[j][i];
      rawMatrix[j][i] = rawMatrix[i][j];
      rawMatrix[i][j] = temp;
    }
  }

  const t3 = t2.map((row, i) => {
    let inner = false;
    const newRow = row.map((value, j) => {
      if (hash[hashPath([i, j])]) {
        if (!hash[hashPath([i, j - 1])]) {
          inner = !inner;
        }
        return 'P';
      } else if (value === '.') {
        return inner ? '#' : ' ';
      }
      return ' ';
    });
    console.log(newRow.join(''));
    return newRow;
  });

  for (let i = 0; i < t3.length; i++) {
    for (let j = 0; j < t3.length; j++) {
      const temp = t3[j][i];
      t3[j][i] = t3[i][j];
      t3[i][j] = temp;
    }
  }

  let result = 0;
  for (let i = 0; i < rawMatrix.length; i++) {
    for (let j = 0; j < rawMatrix[i].length; j++) {
      if (t[i][j] === t3[i][j] && t[i][j] === '#') {
        result++;
      }
    }
  }

  return result;
  */
}

const input = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const input3 = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const input4 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const input2 = fs.readFileSync(path.join(__dirname, '..', 'test', 'input-10.txt'), { encoding: 'utf-8' });

//console.log(JSON.stringify(getPipeLoop(...parseInput(input)).length, null, 2));

console.log(getInnerArea(input2));
