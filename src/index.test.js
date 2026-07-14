'use strict';

var test = require('node:test');
var assert = require('node:assert');
var cp = require('node:child_process');
var path = require('path');

var INDEX_PATH = path.join(__dirname, 'index.js');

test('CLI baseline - stdout oracle', function() {
  var result = cp.spawnSync('node', [INDEX_PATH], { encoding: 'utf8' });
  assert.strictEqual(result.stdout, 'Hello, AI Coding Agent!\n');
  assert.strictEqual(result.status, 0);
});

test('CLI routing - no --serve flag invokes console.log path', function() {
  var result = cp.spawnSync('node', [INDEX_PATH], { encoding: 'utf8' });
  assert.ok(
    result.stdout.indexOf('Hello, AI Coding Agent!') !== -1,
    'stdout must contain oracle string when --serve is absent'
  );
  assert.strictEqual(result.status, 0);
});

test('CLI routing - --serve flag routes to startServer path', function() {
  var env = {};
  var k;
  for (k in process.env) {
    if (Object.prototype.hasOwnProperty.call(process.env, k)) {
      env[k] = process.env[k];
    }
  }
  env.PORT = '0';
  var result = cp.spawnSync('node', [INDEX_PATH, '--serve'], {
    encoding: 'utf8',
    timeout: 2000,
    killSignal: 'SIGTERM',
    env: env
  });
  assert.ok(
    result.stdout.indexOf('Hello, AI Coding Agent!') === -1,
    '--serve path must not print the CLI oracle to stdout'
  );
});
