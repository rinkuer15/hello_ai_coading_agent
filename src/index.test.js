var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');
var path = require('node:path');

var indexPath = path.join(__dirname, 'index.js');

test('stdout oracle outputs exact bytes and exits 0', function (t, done) {
  var proc = childProcess.spawn('node', [indexPath]);
  var stdout = '';
  var stderr = '';

  proc.on('error', function (err) {
    done(new Error('failed to spawn node: ' + err.message));
  });

  proc.stdout.on('data', function (chunk) {
    stdout += chunk;
  });

  proc.stderr.on('data', function (chunk) {
    stderr += chunk;
  });

  proc.on('close', function (code) {
    assert.strictEqual(code, 0, 'exit code must be 0');
    assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n', 'stdout must be byte-exact');
    assert.strictEqual(stderr, '', 'stderr must be empty');
    done();
  });
});
