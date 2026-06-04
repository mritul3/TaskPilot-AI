import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fixEstimate } from './taskHelpers.js';

describe('fixEstimate', () => {
  it('returns null for empty values', () => {
    assert.equal(fixEstimate(null), null);
    assert.equal(fixEstimate(undefined), null);
    assert.equal(fixEstimate(''), null);
  });

  it('rounds to the nearest 15 minutes', () => {
    assert.equal(fixEstimate(44), 45);
    assert.equal(fixEstimate(46), 45);
    assert.equal(fixEstimate(52), 45);
    assert.equal(fixEstimate(53), 60);
  });

  it('clamps values between 5 and 480 minutes', () => {
    assert.equal(fixEstimate(2), 5);
    assert.equal(fixEstimate(500), 480);
    assert.equal(fixEstimate(120), 120);
  });

  it('returns null for non-numeric input', () => {
    assert.equal(fixEstimate('abc'), null);
  });
});
