var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');
var path = require('node:path');

test('stdout is exactly "Hello, AI Coding Agent!\\n"', function (t) {
  var result = childProcess.spawnSync('node', [path.join('src', 'index.js')], {
    encoding: 'utf8'
  });

  assert.strictEqual(result.stdout, 'Hello, AI Coding Agent!\n');
  assert.strictEqual(result.status, 0);
});
