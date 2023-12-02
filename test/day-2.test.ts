import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { checkGames, sumGames } from '../src/day-2';

const input = fs.readFileSync(path.join(__dirname, 'input-2.txt'), { encoding: 'utf-8' });

describe('test 2', function () {
  describe('test 2', () => {
    it('input 1', function () {
      assert.equal(
        checkGames(
          `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
          [12, 13, 14]
        ),
        8
      );
    });
  });

  it('input 2', function () {
    assert.equal(checkGames(input, [12, 13, 14]), 2348);
  });

  it('input 3', function () {
    assert.equal(
      sumGames(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`),
      2286
    );
  });

  it('input 4', function () {
    assert.equal(sumGames(input), 76008);
  });
});
