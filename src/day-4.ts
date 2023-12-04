interface ICard {
  id: number;
  winning: number[];
  numbers: number[];
}

function parseNumbers(line: string): number[] {
  return line
    .trim()
    .split(/\s+/)
    .map((value) => parseInt(value, 10));
}

function parseCard(line: string): ICard {
  const [name, winningLine, numbersLine] = line.match(/[^:|]+/g) || [];
  const id = parseInt((name || '0').replace(/\D/g, ''), 10);
  const winning = parseNumbers(winningLine);
  const numbers = parseNumbers(numbersLine);

  return { id, winning, numbers };
}

function cardIntersection(card: ICard): number {
  const { winning, numbers } = card;
  return numbers.filter((value) => winning.includes(value)).length;
}

function cardValue(card: ICard): number {
  const inter = cardIntersection(card);
  return inter <= 0 ? 0 : Math.pow(2, inter - 1);
}

export function sumCards(input: string): number {
  const cards = input.split('\n').map(parseCard);
  return cards.map(cardValue).reduce((acc, value) => acc + value, 0);
}

export function checkCardCopies(input: string): number {
  const cards = input.split('\n').map(parseCard);
  const copies = Object.fromEntries(cards.map(({ id }) => [id, 1]));
  cards.forEach((card) => {
    const inter = cardIntersection(card);

    if (inter <= 0) {
      return;
    }

    new Array(inter)
      .fill(0)
      .map((_, i) => card.id + i + 1)
      .forEach((value) => (copies[value] += 1 * copies[card.id]));
  });

  return Object.entries(copies)
    .filter(([key, value]) => parseInt(key, 10) <= cards.length)
    .map(([key, value]) => value)
    .reduce((acc, value) => acc + value, 0);
}
