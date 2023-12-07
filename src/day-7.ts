type Hand = {
  value: string;
  rank: number;
};

const handRanks = ['11111', '2111', '221', '311', '32', '41', '5'];
const cardsPriority = '23456789TJQKA'.split('');
const jokerCardsPriority = 'J23456789TQKA'.split('');

function getHandHash(hand: string): { [key: string]: number } {
  const chars = hand.split('');
  return chars.reduce((acc, value) => {
    acc[value] += 1;
    return acc;
  }, Object.fromEntries(chars.map((v) => [v, 0])));
}

function getRank(hand: string): number {
  const handHash = getHandHash(hand);
  const mapping = Object.values(handHash)
    .sort((a, b) => b - a)
    .join('');
  return handRanks.indexOf(mapping);
}

function getRankJoker(hand: string): number {
  const handHash = getHandHash(hand);
  const jokers = handHash['J'] || 0;
  delete handHash['J'];
  const [first, ...rest] = Object.values(handHash).sort((a, b) => b - a);
  return handRanks.indexOf([(first || 0) + jokers, ...rest].join(''));
}

function compareCards(a: string, b: string, priorities: string[]): number {
  for (let i = 0; i < a.length && i < b.length; i++) {
    const res = priorities.indexOf(a[i]) - priorities.indexOf(b[i]);
    if (res !== 0) {
      return res;
    }
  }
  return 0;
}

function getHands(input: string, ranking: (hand: string) => number): [Hand, number][] {
  return input
    .split(/\n/g)
    .filter((v) => v.trim().length > 0)
    .map((v) => v.split(/\s+/g))
    .map<[Hand, number]>(([value, bid]) => [{ value, rank: ranking(value) }, parseInt(bid, 10)]);
}

export function getWinning(input: string): number {
  const hands = getHands(input, getRank).sort((a, b) => {
    return a[0].rank - b[0].rank || compareCards(a[0].value, b[0].value, cardsPriority);
  });
  return hands.reduce((acc, value, index) => acc + value[1] * (index + 1), 0);
}

export function getWinningJoker(input: string): number {
  const hands = getHands(input, getRankJoker).sort((a, b) => {
    return a[0].rank - b[0].rank || compareCards(a[0].value, b[0].value, jokerCardsPriority);
  });
  return hands.reduce((acc, value, index) => acc + value[1] * (index + 1), 0);
}
