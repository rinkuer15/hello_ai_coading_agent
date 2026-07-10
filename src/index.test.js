var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');

test('stdout is byte-exact oracle string', function (t, done) {
  var child = childProcess.execFile('node', ['src/index.js'], function (error, stdout, stderr) {
    assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n');
    done();
  });
});

test('exit code is 0', function (t, done) {
  var child = childProcess.execFile('node', ['src/index.js'], function (error, stdout, stderr) {
    assert.strictEqual(error, null);
    done();
  });
});
