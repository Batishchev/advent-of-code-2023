import * as fs from 'fs';
import * as path from 'path';

const hashPath = path.join(__dirname, '..', 'hash.json');
const hash: { [key: string]: number } = fs.existsSync(hashPath) ? require(hashPath) : {};

function compare(line: string, mask: string): boolean {
  if (line.length != mask.length) {
    return false;
  }

  for (let i = 0; i < line.length; i++) {
    if (
      (line[i] === '1' && mask[i] === '0') ||
      (line[i] === '0' && mask[i] === '1') ||
      (mask[i] === '1' && line[i] === '0') ||
      (mask[i] === '0' && line[i] === '1')
    ) {
      return false;
    }
  }

  return true;
}

// Функцию вызывают с маской, где точки в начале и конце удалены
function checkMask(value: number, mask: string) {
  // Если оставшихся групп > 1, а мы тут проверяем маску на одно конкретное число
  // Значит это ошибочный вариант, возвращаем 0
  if (mask.match(new RegExp(`#+.{${value},}#+`))) {
    return 0;
  }

  // Если только точки и знаки вопроса, можно заоптимизировать
  if (mask.indexOf('#') < 0) {
    return mask
      .split(/\.+/)
      .filter((v) => v.length >= value)
      .map((v) => v.length - value + 1)
      .reduce((acc, value) => acc + value, 0);
  }

  // Если нет разбиения посередине, оптимизируем
  if (mask.indexOf('.') === -1) {
    const sharp = mask.indexOf('#');
    if (sharp === -1) {
      return mask.length - value + 1;
    } else {
      const last = mask.lastIndexOf('#');
      const min = Math.max(0, last - value + 1);
      const max = Math.min(sharp + value - 1, mask.length - 1);
      return max - min - value + 2;
    }
  }

  // Если ни одна из оптимизаций не прошла, brute-force наше всё
  const { length } = mask;
  const binaryMask = mask.replace(/#/g, '1').replace(/\./g, '0');
  let result = 0;

  for (let i = length - value + 1; --i >= 0; ) {
    if (compare(`${'0'.repeat(i)}${'1'.repeat(value)}${'0'.repeat(length - value - i)}`, binaryMask)) {
      result++;
    }
  }

  return result;
}

function getMaskAndMappings(value: string, increasing = 1): [string, number[]] {
  const [line, m] = value.split(' ');
  const mapping = m.split(',').map((v) => parseInt(v, 10));
  const increasedLine = new Array(increasing).fill(line).join('?');
  const increasedMapping = new Array(increasing).fill(mapping).flat();
  return [increasedLine, increasedMapping];
}

export function distribute(_mask: string, _mappings?: number[], level = 0): number {
  const [preMask, mappings] = typeof _mappings === 'undefined' ? getMaskAndMappings(_mask) : [_mask, _mappings];
  const mask = preMask.replace(/^\.+/, '').replace(/\.+$/, '');
  const length = mask.length;
  const [value, ...rest] = mappings;
  const maybeResult = hash[`${_mask} ${mappings.join(',')}`];

  // Если такая маска есть в кэше, сразу возвращаем результат
  if (typeof maybeResult === 'number') {
    return maybeResult;
  }

  // Конечный случай рекурсии, все остальные случаи нужно свести к нему
  if (mappings.length == 1) {
    return checkMask(value, mask);
  }

  // Сколько нужно места, чтобы разместить все решётки, кроме самых первых из группы
  const restLength = rest.reduce((acc, value) => acc + value + 1, 0);
  // Оптимизация. Не нужно перебирать все возможные перестановки первой группы.
  const firstSharpIndex = mask.indexOf('#');
  // Максимальный индекс, до которого расставляем решётки, соответствующие первому числу из группы
  const max = Math.min(length - restLength, firstSharpIndex === -1 ? length - restLength : firstSharpIndex + value);
  let result = 0;

  for (let i = 0, j = value; j <= max; i++, j++) {
    const subValue = mask.slice(i, j);
    // Оптимизации
    const dotIndex = subValue.indexOf('.');
    if (dotIndex >= 0 && subValue.slice(0, dotIndex).indexOf('#') >= 0) {
      return result;
    }

    // Оптимизации
    if (dotIndex >= 0 || subValue.indexOf('.') >= 0 || mask[j] === '#' || mask[i - 1] === '#') {
      continue;
    }

    // Проваливаемся внутрь рекурсии
    result += distribute(mask.substring(j + 1), rest, level + 1);
  }

  // Для текущей маски посчитали результат, кладём его в кэш
  hash[`${_mask} ${mappings.join(',')}`] = result;

  return result;
}

export function sumDistribution(input: string, increasing = 1): number {
  return input
    .split(/\n/g)
    .map((value) => distribute(...getMaskAndMappings(value, increasing)))
    .reduce((acc, value) => acc + value, 0);
}


distribute('?###???????? 3,2,1');
