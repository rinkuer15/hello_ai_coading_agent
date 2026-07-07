var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');
var path = require('node:path');
var fs = require('node:fs');

var indexPath = path.join(__dirname, 'index.js');

test('oracle: stdout is byte-exact', function () {
  var result = childProcess.spawnSync(process.execPath, [indexPath]);
  assert.strictEqual(result.stdout.toString(), 'Hello, AI Coding Agent!\n');
});

test('oracle: exit code is 0', function () {
  var result = childProcess.spawnSync(process.execPath, [indexPath]);
  assert.strictEqual(result.status, 0);
});

test('structure: mandatory blank line present', function () {
  var source = fs.readFileSync(indexPath, 'utf8');
  var lines = source.replace(/\r\n/g, '\n').split('\n');
  if (lines[lines.length - 1] === '') {
    lines.pop();
  }
  assert.strictEqual(lines[lines.length - 1], 'main();');
  assert.strictEqual(lines[lines.length - 2], '');
});

test('compliance: no ES6+ keywords in source', function () {
  // Known limitation: scans raw source; string/comment contents
  // may false-positive. Accepted trade-off given the 5-line static oracle.
  var source = fs.readFileSync(indexPath, 'utf8');
  var forbidden = ['const ', 'let ', '=>', '`', 'class ', 'async ', 'await ', '...'];
  var i;
  for (i = 0; i < forbidden.length; i++) {
    assert.strictEqual(
      source.indexOf(forbidden[i]),
      -1,
      'ES6+ syntax found: ' + forbidden[i]
    );
  }
});
