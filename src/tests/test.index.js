const units = require('../index.js'); // eslint-disable-line
const BigNumber = require('bn.js'); // eslint-disable-line
const ActualBigNumber = require('bignumber.js');
const assert = require('chai').assert; // eslint-disable-line

describe('getValueOfUnit', () => {
  it('should throw when undefined or not string', () => {
    function invalidFromBase() {
      units.fromBase(1000000000000000000, 'something');
    }
    assert.throws(invalidFromBase, Error);
  });
});

describe('toBase', () => {
  it('should handle edge cases', () => {
    assert.equal(units.toBase(0, 'base').toString(10), '0');
    assert.equal(units.toBase('0.0', 'base').toString(10), '0');
    assert.equal(units.toBase('.3', 'veo').toString(10), '30000000');
    assert.throws(() => units.toBase('.', 'base'), Error);
    assert.throws(
      () => units.toBase('1.243842387924387924897423897423', 'veo'),
      Error
    );
    assert.throws(() => units.toBase('8723.98234.98234', 'veo'), Error);
  });

  it('should return the correct value', () => {
    assert.equal(units.toBase(1, 'base').toString(10), '1');
    assert.equal(units.toBase(1, 'veo').toString(10), '100000000');

    assert.throws(() => {
      units.toBase(1, 'veo1');
    }, Error);
  });
});

describe('numberToString', () => {
  it('should handle edge cases', () => {
    // assert.throws(() => units.numberToString(null), Error);
    assert.throws(() => units.numberToString(undefined), Error);
    // assert.throws(() => units.numberToString(NaN), Error);
    assert.throws(() => units.numberToString({}), Error);
    assert.throws(() => units.numberToString([]), Error);
    assert.throws(() => units.numberToString('-1sdffsdsdf'), Error);
    assert.throws(() => units.numberToString('-0..-...9'), Error);
    assert.throws(() => units.numberToString('fds'), Error);
    assert.throws(() => units.numberToString(''), Error);
    assert.throws(() => units.numberToString('#'), Error);
    assert.equal(units.numberToString(55), '55');
    assert.equal(units.numberToString(1), '1');
    assert.equal(units.numberToString(-1), '-1');
    assert.equal(units.numberToString(0), '0');
    assert.equal(units.numberToString(-0), '0');
    assert.equal(units.numberToString(new ActualBigNumber(10.1)), '10.1');
    assert.equal(units.numberToString(new ActualBigNumber(10000)), '10000');
    assert.equal(units.numberToString(new BigNumber(10000)), '10000');
    assert.equal(units.numberToString(new BigNumber('-1')), '-1');
    assert.equal(units.numberToString(new BigNumber('1')), '1');
    assert.equal(units.numberToString(new BigNumber(0)), '0');
  });
});

describe('fromBase', () => {
  it('should handle options', () => {
    assert.equal(
      units.fromBase(10000000, 'base', { commify: true }),
      '10,000,000'
    );
  });

  it('should return the correct value', () => {
    assert.equal(
      units.fromBase(1000000000000000000, 'base'),
      '1000000000000000000'
    );
    assert.equal(units.fromBase(100000000, 'veo'), '1');
  });
});
