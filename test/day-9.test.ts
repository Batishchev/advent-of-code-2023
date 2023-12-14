import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { getLastValue, sumAllFirstValues, sumAllLastValues, getNumbers } from '../src/day-9';

const input = fs.readFileSync(path.join(__dirname, 'input-9.txt'), { encoding: 'utf-8' });

describe('test 9', function () {
  describe('test 9', () => {
    it('input 1', function () {
      assert.equal(sumAllLastValues('0 3 6 9 12 15'), 18);
    });

    it('input 2', function () {
      assert.equal(sumAllLastValues('1 3 6 10 15 21'), 28);
    });

    it('input 3', function () {
      assert.equal(sumAllLastValues('10 13 16 21 30 45'), 68);
    });

    it('input 4', function () {
      assert.equal(sumAllLastValues(input), 1641934234);
    });

    it('input 5', function () {
      assert.equal(sumAllFirstValues('0 3 6 9 12 15'), -3);
    });

    it('input 6', function () {
      assert.equal(sumAllFirstValues('1 3 6 10 15 21'), 0);
    });

    it('input 7', function () {
      assert.equal(sumAllFirstValues('10 13 16 21 30 45'), 5);
    });

    it('input 8', function () {
      assert.equal(sumAllFirstValues(input), 975);
    });
  });
});
