'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var child_process = require('node:child_process');
var path = require('node:path');

var INDEX_PATH = path.join(__dirname, 'index.js');
var EXPECTED_STDOUT = 'Hello, AI Coding Agent!\n';

test('stdout matches byte-exact oracle', function (t, done) {
  child_process.execFile('node', [INDEX_PATH], function (err, stdout, stderr) {
    assert.ifError(err);
    assert.strictEqual(stdout, EXPECTED_STDOUT);
    assert.strictEqual(stderr, '');
    done();
  });
});

test('exits with code 0', function (t, done) {
  var child = child_process.spawn('node', [INDEX_PATH]);
  child.on('close', function (code) {
    assert.strictEqual(code, 0);
    done();
  });
});
