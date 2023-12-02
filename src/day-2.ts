type GameSet = [number, number, number]; // r, g, b

interface IGame {
  id: number;
  sets: GameSet[];
}

function parseGame(input: string): IGame {
  const id = input.match(/Game\s+(\d+):.*/)?.[1];

  if (typeof id !== 'string') {
    throw new Error('input error');
  }

  const preSets = input.split(':')?.[1].split(';');

  if (typeof preSets === 'undefined') {
    throw new Error('input error');
  }

  const sets = preSets.map((value) =>
    [
      value.match(/(\d+?)\s+red/)?.[1] || '0',
      value.match(/(\d+?)\s+green/)?.[1] || '0',
      value.match(/(\d+?)\s+blue/)?.[1] || '0'
    ].map((value: string): number => parseInt(value, 10))
  ) as GameSet[];

  return { id: parseInt(id), sets };
}

function checkGame(gameset: GameSet, input: string): IGame & { correct: boolean } {
  const [gr, gg, gb] = gameset;
  const game = parseGame(input);

  return {
    ...game,
    correct: game.sets.findIndex(([r, g, b]) => r > gr || g > gg || b > gb) < 0
  };
}

export function checkGames(input: string, game: GameSet): number {
  const lines = input.split('\n');

  return lines
    .map(checkGame.bind(null, game))
    .filter(({ correct }) => correct)
    .reduce((acc, { id }) => acc + id, 0);
}

export function sumGames(input: string): number {
  const lines = input.split('\n');

  return (
    lines
      .map(parseGame)
      .map((game) =>
        game.sets
          // reduce чтобы получить max [r, g, b]
          .reduce((acc, value) => acc.map((v, index) => Math.max(v, value[index])) as GameSet, [0, 0, 0])
          // reduce чтобы перемножить r * g * b
          .reduce((acc, value) => acc * value, 1)
      )
      // reduce чтобы сложить всё вместе
      .reduce((acc, value) => acc + value, 0)
  );
}
