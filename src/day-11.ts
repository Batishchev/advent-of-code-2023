function transpose(matrix: string[][]): string[][] {
  const [x, y] = [matrix.length, matrix[0].length];
  const result = [];

  for (let j = 0; j < y; j++) {
    const value = new Array(x);
    for (let i = 0; i < x; value[i] = matrix[i++][j]) {}
    result.push(value);
  }
  return result;
}

function markEmptySpace(matrix: string[][]) {
  const empty: number[] = matrix
    .map((value, index): [string[], number] => [value, index])
    .filter(([value]) => value.indexOf('#') < 0)
    .map(([, index]) => index);
  empty.forEach((value) => matrix.splice(value, 1, new Array(matrix[0].length).fill('E')));
}

export function getUniverse(input: string): string[][] {
  const matrix = input
    .split(/\n/g)
    .filter((value) => value.trim().length > 0)
    .map((value) => value.split(''));

  markEmptySpace(matrix);
  const tMatrix = transpose(matrix);
  markEmptySpace(tMatrix);
  return transpose(tMatrix);
}

export function getCoords(universe: string[][], growingSpeed: number = 1): number[][] {
  const result: number[][][] = [];

  let emptyRows = 0;
  for (let i = 0; i < universe.length; i++) {
    if (universe[i].indexOf('.') < 0 && universe[i].indexOf('#') < 0) {
      emptyRows++;
      continue;
    }

    const row = universe[i];
    const coords = row
      .map((v, j): undefined | number[] => {
        const e = row.slice(0, j).filter((v) => v === 'E').length;
        if (v !== '#') {
          return undefined;
        }

        return [i - emptyRows + emptyRows * growingSpeed, j - e + e * growingSpeed];
      })
      .filter((value): value is number[] => typeof value !== 'undefined');

    result.push(coords);
  }

  return result.flat();
}

export function sumPaths(input: string, growingSpeed = 1): number {
  const universe = getUniverse(input);
  const coords = getCoords(universe, growingSpeed);

  let result = 0;
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [a, b] = coords[i];
      const [c, d] = coords[j];
      result += Math.abs(a - c) + Math.abs(b - d);
    }
  }
  return result;
}
