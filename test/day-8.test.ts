import 'jest';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { parseInput, followPath, followPaths } from '../src/day-8';

const input = fs.readFileSync(path.join(__dirname, 'input-8.txt'), { encoding: 'utf-8' });

describe('test 8', function () {
  describe('test 8', () => {
    it('input 1', function () {
      const value = followPath.bind(null, ...parseInput(input));
      assert.equal(value(), 18023);
    });

    it('input 2', function () {
      const [card, commands] = parseInput(input);
      const entry = Object.keys(card).filter((k) => k[2] === 'A');
      assert.equal(followPaths(card, commands, entry), 14449445933179);
    });
  });
});
