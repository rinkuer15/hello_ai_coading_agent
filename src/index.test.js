'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var cp = require('child_process');
var path = require('path');

var ENTRY = path.join(__dirname, 'index.js');

function run(args, env) {
  return cp.spawnSync(process.execPath, [ENTRY].concat(args || []), {
    encoding: 'utf8',
    env: Object.assign({}, process.env, { NO_COLOR: '1' }, env || {}),
  });
}

test('default run prints greeting without colour', function () {
  var result = run([]);
  assert.equal(result.status, 0);
  assert.ok(result.stdout.includes('Hello, AI Coding Agent!'));
});

test('--help prints usage with dark, light, default keywords', function () {
  var result = run(['--help']);
  assert.equal(result.status, 0);
  assert.ok(result.stdout.includes('--theme'));
  assert.ok(result.stdout.includes('dark'));
  assert.ok(result.stdout.includes('light'));
  assert.ok(result.stdout.includes('default'));
});

test('--theme with invalid value exits 1 with error message', function () {
  var result = run(['--theme', 'neon']);
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes('Unknown theme'));
  assert.ok(result.stderr.includes('neon'));
});

test('--theme with no value exits 1 with error message', function () {
  var result = run(['--theme']);
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes('--theme requires a value'));
});

test('--theme with ANSI injection exits 1 and emits no ANSI clear-screen', function () {
  var result = run(['--theme', '\x1b[2J']);
  assert.equal(result.status, 1);
  assert.ok(!result.stdout.includes('\x1b[2J'));
});
