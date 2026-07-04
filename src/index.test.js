var test = require('node:test');
var spawnSync = require('node:child_process').spawnSync;
var assert = require('node:assert');
var path = require('node:path');

var EXPECTED = 'Hello, AI Coding Agent!\n';

test('main() prints exact greeting and exits 0', function() {
  var scriptPath = path.resolve(__dirname, '..', 'src', 'index.js');
  var result = spawnSync(process.execPath, [scriptPath], {
    encoding: 'utf8'
  });
  
  assert.strictEqual(result.status, 0, 'Expected exit code 0, got ' + result.status);
  assert.strictEqual(result.stdout, EXPECTED, 'Expected ' + JSON.stringify(EXPECTED) + ', got ' + JSON.stringify(result.stdout));
});
