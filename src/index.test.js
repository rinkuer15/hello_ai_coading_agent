var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');
var path = require('node:path');

test('stdout oracle outputs byte-exact expected string', function () {
  var result = childProcess.spawnSync('node', [path.join(__dirname, 'index.js')], {
    encoding: 'utf8'
  });

  assert.strictEqual(
    result.stdout,
    'Hello, AI Coding Agent!\n',
    'stdout oracle mismatch: expected byte-exact "Hello, AI Coding Agent!\\n"'
  );

  assert.strictEqual(
    result.status,
    0,
    'exit code mismatch: expected 0'
  );
});
