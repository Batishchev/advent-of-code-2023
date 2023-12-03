import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { sumGears, sumScheme } from '../src/day-3';

const input = fs.readFileSync(path.join(__dirname, 'input-3.txt'), { encoding: 'utf-8' });

describe('test 3', function () {
  describe('test 3', () => {
    it('input 1', function () {
      assert.equal(
        sumScheme(
          `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
        ),
        4361
      );
    });

    it('input 2', function () {
      assert.equal(sumScheme(input), 507214);
    });

    it('input 3', function () {
      assert.equal(
        sumGears(
          `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
        ),
        467835
      );
    });

    it('input 4', function () {
      assert.equal(sumGears(input), 72553319);
    });
  });
});
