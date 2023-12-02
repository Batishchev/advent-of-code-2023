const reverse = (value: string): string => value.split('').reverse().join('');

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const regexString = digits.slice(1).join('|'); // one|two|three|four|five|six|seven|eight|nine

const digitRegex = new RegExp(regexString + '|\\d');
const reversedDigitRegex = new RegExp(reverse(regexString) + '|\\d');

const digitMap = Object.fromEntries(digits.map((value, index) => [value, `${index}`]));
const reversedDigitMap = Object.fromEntries(digits.map((value, index) => [reverse(value), `${index}`]));

export function sum(input: string): number {
  return input
    .split(/\n/)
    .map((value: string) => {
      const maybeFirst = value.match(digitRegex)?.[0];
      const maybeLast = reverse(value).match(reversedDigitRegex)?.[0];
      if (!maybeFirst && !maybeLast) {
        return undefined;
      }
      const digit1 = (maybeFirst || maybeLast) as string;
      const digit2 = (maybeLast || maybeFirst) as string;

      const value1 = digitMap[digit1] ? digitMap[digit1] : digit1;
      const value2 = reversedDigitMap[digit2] ? reversedDigitMap[digit2] : digit2;

      return parseInt(`${value1}${value2}`, 10);
    })
    .filter((value): value is number => typeof value !== 'undefined' && !isNaN(value))
    .reduce((acc: number, value: number) => acc + value, 0);
}
