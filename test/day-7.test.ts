import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { getWinning, getWinningJoker } from '../src/day-7';

const input = fs.readFileSync(path.join(__dirname, 'input-7.txt'), { encoding: 'utf-8' });

describe('test 7', function () {
  describe('test 7', () => {
    it('input 1', function () {
      assert.equal(
        getWinning(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
      `),
        6440
      );
    });

    it('input 2', function () {
      assert.equal(getWinning(input), 249390788);
    });

    it('input 3', function () {
      assert.equal(
        getWinningJoker(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
      `),
        5905
      );
    });

    it('input 4', function () {
      assert.equal(getWinningJoker(input), 248750248);
    });


    // it('input 3', function () {
    //   assert.equal(availableSpeedParams([30, 200]), 9);
    // });

    // it('input 4', function () {
    //   assert.equal(availableSpeedParams([71530, 940200]), 71503);
    // });

    // it('input 5', function () {
    //   assert.equal(availableSpeedParams([44806572, 208158110501102]), 34278221);
    // });
  });
});
