type Range = [number, number]; //  inclusive, exclusive
type Mapping = [Range, number]; // range + shift
type Card = Mapping[];

function parseMatrix(input: string, name: string): number[][] {
  const stringMatrix = input.match(new RegExp(`${name} map:#(.*?)(##|$)`))?.[1];

  if (typeof stringMatrix !== 'string') {
    throw new Error('wrong input');
  }

  return stringMatrix.split('#').map((matrixLine) => matrixLine.split(/\s+/g).map((value) => parseInt(value, 10)));
}

function getCard(matrix: number[][]): Card {
  matrix.sort((a, b) => a[1] - b[1]);
  return matrix.map(([a, b, c]) => [[b, b + c], a - b]);
}

function mapValueOneCard(value: number, card: Card): number {
  const shift = card.find(([[beg, end]]) => value >= beg && value < end)?.[1] || 0;
  return value + shift;
}

function mapValueAllCards(value: number, cards: Card[]): number {
  return cards.reduce((acc, value) => mapValueOneCard(acc, value), value);
}

function mapRangeOneCard(value: Range, card: Card): Range[] {
  const [a, b] = value;
  const mappings = card.filter(([[x, y]]) => (a >= x && a < y) || (b >= x && b < y));

  const borders = mappings
    .map(([value]) => value)
    .concat([value])
    .flat()
    .filter((x) => x >= a && x <= b)
    .sort();

  const pairs: number[][] = borders.map((value, index) => [borders[index - 1], value]).slice(1);

  return pairs.map(([a, b]) => {
    const shift = mappings.find(([[x, y]]) => a >= x && a < y)?.[1] || 0;
    return [a + shift, b + shift];
  });
}

function mapRangeAllCards(value: Range, cards: Card[]): Range[] {
  return cards.reduce(
    (acc, card) => {
      return acc.map((value) => mapRangeOneCard(value, card)).flat();
    },
    [value]
  );
}

export class Mapper {
  cards: Card[];

  constructor(_input: string) {
    const input = _input.replace(/\n/g, '#');
    const names = (input.match(/##.*?\s+map/g) || []).map((v) => v.replace(/([#\s]+|map)/g, ''));
    this.cards = names.map(parseMatrix.bind(null, input)).map(getCard);
  }

  map(value: number): number {
    return mapValueAllCards(value, this.cards);
  }

  mapRange(value: Range) {
    return mapRangeAllCards(value, this.cards);
  }
}

export function lowestLocation(_input: string): number {
  const input = _input.replace(/\n/g, '#');
  const mapper = new Mapper(_input);
  const seeds = (input.match(/seeds: (.*?)##/)?.[1] || '').split(/\s+/g).map((v) => parseInt(v, 10));
  return Math.min(...seeds.map(mapper.map.bind(mapper)));
}

export function lowestLocationRange(_input: string): number {
  const input = _input.replace(/\n/g, '#');
  const mapper = new Mapper(_input);
  const seedRanges: Range[] = ((input.match(/seeds: (.*?)##/)?.[1] || '').match(/\d+\s+\d+/g) || []).map((pair) => {
    const [start, length] = pair.split(/\s+/g).map((v) => parseInt(v, 10));
    return [start, start + length];
  });
  const result = seedRanges.map(mapper.mapRange.bind(mapper));
  return Math.min(...result.flat().flat());
}
