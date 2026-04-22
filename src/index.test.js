import { test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from './index.js';

test('main is a function', () => {
  assert.ok(typeof main === 'function');
});
