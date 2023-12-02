import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { sum } from '../src/day-1';

const input = fs.readFileSync(path.join(__dirname, 'input-1.txt'), { encoding: 'utf-8' });

describe('test', function () {
  describe('test', () => {
    it('input 1', function () {
      assert.equal(sum(input), 54980);
    });

    it('input 2', function () {
      assert.equal(
        sum(`two1nine
      eightwothree
      abcone2threexyz
      xtwone3four
      4nineeightseven2
      zoneight234
      7pqrstsixteen`),
        281
      );
    });

    it('input 3', function () {
      assert.equal(sum('rnbchhfk6884fivejtr5twonet'), 61);
    });
  });
});
