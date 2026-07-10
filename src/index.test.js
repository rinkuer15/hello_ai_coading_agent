var test = require('node:test');
var assert = require('node:assert');
var child_process = require('node:child_process');

test('stdout is byte-exact oracle', function () {
  var result = child_process.execSync('node src/index.js', { encoding: 'utf8' });
  assert.strictEqual(result, 'Hello, AI Coding Agent!\n');
});

test('exit code is 0', function () {
  var status = child_process.spawnSync('node', ['src/index.js']).status;
  assert.strictEqual(status, 0);
});
