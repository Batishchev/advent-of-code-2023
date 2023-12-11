import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { sumPaths } from '../src/day-11';

const input1 = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
const input2 = fs.readFileSync(path.join(__dirname, 'input-11.txt'), { encoding: 'utf-8' });

describe('test 11', function () {
  describe('test 11', () => {
    it('input 1', function () {
      assert.equal(sumPaths(input1, 2), 374);
    });

    it('input 2', function () {
      assert.equal(sumPaths(input2, 2), 9543156);
    });

    it('input 3', function () {
      assert.equal(sumPaths(input1, 10), 1030);
    });

    it('input 4', function () {
      assert.equal(sumPaths(input1, 100), 8410);
    });

    it('input 5', function () {
      assert.equal(sumPaths(input2, 1000000), 625243292686);
    });
  });
});
