import 'jest';
import * as assert from 'assert';

import { toMatrix, transpose, rotateRight, rotateLeft } from '../src/util';

const input = `
123
456
789
-=*
`;

describe('util', function () {
  describe('util', () => {
    it('transpose', function () {
      const result = transpose(toMatrix(input));
      assert.equal(result.length, 3);
      assert.equal(result[0].length, 4);
      assert.equal(result[0].join(''), '147-');
      assert.equal(result[1].join(''), '258=');
      assert.equal(result[2].join(''), '369*');
    });

    it('rotate right', function () {
      const result = rotateRight(toMatrix(input));
      assert.equal(result.length, 3);
      assert.equal(result[0].length, 4);
      assert.equal(result[0].join(''), '-741');
      assert.equal(result[1].join(''), '=852');
      assert.equal(result[2].join(''), '*963');
    });

    it('rotate left', function () {
      const result = rotateLeft(toMatrix(input));
      assert.equal(result.length, 3);
      assert.equal(result[0].length, 4);
      assert.equal(result[0].join(''), '369*');
      assert.equal(result[1].join(''), '258=');
      assert.equal(result[2].join(''), '147-');
    });
  });
});
