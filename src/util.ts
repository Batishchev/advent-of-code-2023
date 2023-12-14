export const nonEmpty = (value: string): boolean => value.trim().length > 0;
export const sum = (value: number[]) => value.reduce((acc, value) => acc + value, 0);
export const prod = (value: number[]) => value.reduce((acc, value) => acc * value, 1);
export const lines = (value: string): string[] => value.split(/\n/g).filter(nonEmpty);
export const chars = (value: string): string[] => value.split('');
export const toMatrix = (value: string): string[][] => lines(value).map(chars);
export const fromMatrix = (matrix: string[][], colJoin = '', rowJoin = '\n'): string =>
  matrix.map((v) => v.join(colJoin)).join(rowJoin);

export function transpose(matrix: string[][]): string[][] {
  const [x, y] = [matrix.length, matrix[0].length];
  const result = new Array(y);

  for (let j = 0; j < y; j++) {
    const value = new Array(x);
    for (let i = 0; i < x; value[i] = matrix[i++][j]) {}
    result[j] = value;
  }

  return result;
}

export const rotateRight = (matrix: string[][]): string[][] => transpose(matrix).map((value) => value.reverse());
export const rotateLeft = (matrix: string[][]): string[][] => transpose(matrix).reverse();
