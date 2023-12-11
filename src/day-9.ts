function getDiff(numbers: number[]): number[] {
  return numbers.map((value, index) => value - numbers[index - 1]).slice(1);
}

function getHistory(numbers: number[]): number[][] {
  const history = [];
  for (var diffs = numbers; !diffs.every((value) => value === 0); diffs = getDiff(diffs)) {
    history.push(diffs);
  }
  return history;
}

export function getNumbers(input: string): number[][] {
  return input.split(/\n/g).map((value) => value.split(/\s+/g).map((v) => parseInt(v, 10)));
}

export function getLastValue(numbers: number[]): number {
  return getHistory(numbers).reduce((acc, value) => acc + value[value.length - 1], 0);
}

export function getFirstValue(numbers: number[]): number {
  return getHistory(numbers).reduceRight((acc, value) => value[0] - acc, 0);
}

export function sumAllLastValues(input: string): number {
  return getNumbers(input)
    .map(getLastValue)
    .reduce((acc, value) => acc + value, 0);
}

export function sumAllFirstValues(input: string): number {
  return getNumbers(input)
    .map(getFirstValue)
    .reduce((acc, value) => acc + value, 0);
  // .map((value) => getLastValue(value.reverse()))
}
