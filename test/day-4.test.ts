import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { checkCardCopies, sumCards } from '../src/day-4';

const input = fs.readFileSync(path.join(__dirname, 'input-4.txt'), { encoding: 'utf-8' });

describe('test 4', function () {
  describe('test 4', () => {
    it('input 1', function () {
      assert.equal(
        sumCards(
          `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
        ),
        13
      );
    });

    it('input 2', function () {
      assert.equal(sumCards(input), 23941);
    });

    it('input 3', function () {
      assert.equal(
        checkCardCopies(
          `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
        ),
        30
      );
    });

    it('input 4', function () {
      assert.equal(checkCardCopies(input), 5571760);
    });
  });
});
