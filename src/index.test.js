var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');

test('stdout oracle outputs exact expected string', function (t, done) {
  var child = childProcess.execFile('node', ['src/index.js'], function (err, stdout, stderr) {
    assert.strictEqual(err, null);
    assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n');
    assert.strictEqual(stderr, '');
    done();
  });
});
