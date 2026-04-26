'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var theme = require('./theme');

test('applyTheme returns plain message when isTTY is false', function () {
  var result = theme.applyTheme('hello', 'dark', { isTTY: false });
  assert.equal(result, 'hello');
});

test('applyTheme returns plain message when NO_COLOR is set', function () {
  process.env.NO_COLOR = '1';
  var result = theme.applyTheme('hello', 'dark', { isTTY: true });
  delete process.env.NO_COLOR;
  assert.equal(result, 'hello');
});

test('applyTheme returns plain message when TERM is dumb', function () {
  process.env.TERM = 'dumb';
  var result = theme.applyTheme('hello', 'dark', { isTTY: true });
  delete process.env.TERM;
  assert.equal(result, 'hello');
});

test('applyTheme returns ANSI-coloured message ending with reset when TTY', function () {
  delete process.env.NO_COLOR;
  delete process.env.TERM;
  var result = theme.applyTheme('hello', 'dark', { isTTY: true });
  assert.ok(result.includes('hello'));
  assert.ok(result.endsWith('\x1b[0m'));
});

test('applyTheme works with light theme', function () {
  delete process.env.NO_COLOR;
  delete process.env.TERM;
  var result = theme.applyTheme('hello', 'light', { isTTY: true });
  assert.ok(result.includes('hello'));
  assert.ok(result.endsWith('\x1b[0m'));
});

test('applyTheme throws on unknown theme', function () {
  assert.throws(function () {
    theme.applyTheme('hello', 'neon', { isTTY: true });
  }, /unknown theme/i);
});

test('ANSI_RESET exported correctly', function () {
  assert.equal(theme.ANSI_RESET, '\x1b[0m');
});
