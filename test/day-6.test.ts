import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { availableSpeedParams } from '../src/day-6';

const input = fs.readFileSync(path.join(__dirname, 'input-6.txt'), { encoding: 'utf-8' });

describe('test 6', function () {
  describe('test 6', () => {
    it('input 1', function () {
      assert.equal(availableSpeedParams([7, 9]), 4);
    });

    it('input 2', function () {
      assert.equal(availableSpeedParams([15, 40]), 8);
    });

    it('input 3', function () {
      assert.equal(availableSpeedParams([30, 200]), 9);
    });

    it('input 4', function () {
      assert.equal(availableSpeedParams([71530, 940200]), 71503);
    });

    it('input 5', function () {
      assert.equal(availableSpeedParams([44806572, 208158110501102]), 34278221);
    });
  });
});
