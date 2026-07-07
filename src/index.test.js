var test = require('node:test');
var spawnSync = require('node:child_process').spawnSync;
var assert = require('node:assert');

var EXPECTED_BYTES = Buffer.from('Hello, AI Coding Agent!\n');

test('stdout is byte-exact oracle', function() {
  var scriptPath = __dirname + '/index.js';
  var result = spawnSync(process.execPath, [scriptPath], {
    encoding: 'buffer'
  });

  assert.strictEqual(result.status, 0, 'Expected exit code 0, got ' + result.status);
  assert.deepStrictEqual(result.stdout, EXPECTED_BYTES, 'Expected ' + JSON.stringify(EXPECTED_BYTES) + ', got ' + JSON.stringify(result.stdout));
  assert.strictEqual(result.stderr.length, 0, 'Expected empty stderr, got ' + JSON.stringify(result.stderr));
});

