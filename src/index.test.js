'use strict';

var assert = require('node:assert');
var childProcess = require('node:child_process');
var path = require('path');

function testStdoutOracle() {
  var indexPath = path.join(__dirname, 'index.js');
  var result = childProcess.spawnSync('node', [indexPath], {
    encoding: 'utf8'
  });

  assert.strictEqual(result.status, 0, 'Exit code must be 0');
  assert.strictEqual(
    result.stdout,
    'Hello, AI Coding Agent!\n',
    'Stdout must be byte-exactly: Hello, AI Coding Agent!\\n'
  );
  assert.strictEqual(result.stderr, '', 'Stderr must be empty');
}

testStdoutOracle();
