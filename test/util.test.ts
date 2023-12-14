import 'jest';
import * as assert from 'assert';

import { matrix, transpose, rotate } from '../src/util';

const input = `
111111111
222222222
333333333
`;

describe('util', function () {
  describe('util', () => {
    it('transpose', function () {
      const result = transpose(matrix(input));
      assert.equal(result.length, 9);
      assert.equal(result[0].length, 3);
      assert.equal(result[0].join(''), '123');
      assert.equal(result[1].join(''), '123');
      assert.equal(result[2].join(''), '123');
      assert.equal(result[3].join(''), '123');
      assert.equal(result[4].join(''), '123');
      assert.equal(result[5].join(''), '123');
      assert.equal(result[6].join(''), '123');
      assert.equal(result[7].join(''), '123');
      assert.equal(result[8].join(''), '123');
    });

    it('rotate', function () {
      const result = rotate(matrix(input));
      assert.equal(result.length, 9);
      assert.equal(result[0].length, 3);
      assert.equal(result[0].join(''), '321');
      assert.equal(result[1].join(''), '321');
      assert.equal(result[2].join(''), '321');
      assert.equal(result[3].join(''), '321');
      assert.equal(result[4].join(''), '321');
      assert.equal(result[5].join(''), '321');
      assert.equal(result[6].join(''), '321');
      assert.equal(result[7].join(''), '321');
      assert.equal(result[8].join(''), '321');
    });
  });
});
