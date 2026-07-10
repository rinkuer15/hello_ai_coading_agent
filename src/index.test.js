var test = require('node:test');
var assert = require('node:assert');
var child_process = require('node:child_process');

test('emits correct stdout oracle', function (t, done) {
  child_process.exec('node src/index.js', function (err, stdout, stderr) {
    assert.strictEqual(err, null);
    assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n');
    assert.strictEqual(stderr, '');
    done();
  });
});
