var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');
var fs = require('node:fs');
var path = require('node:path');

var indexPath = path.join(__dirname, 'index.js');

test.describe('runtime', function () {
  test.it('stdout is the byte-exact oracle', function (t, done) {
    var child = childProcess.execFile('node', [indexPath], function (err, stdout, stderr) {
      assert.strictEqual(err, null);
      assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n');
      assert.strictEqual(stderr, '');
      done();
    });
  });

  test.it('exits with code 0', function (t, done) {
    var child = childProcess.spawn('node', [indexPath]);
    child.on('close', function (code) {
      assert.strictEqual(code, 0);
      done();
    });
  });
});

test.describe('governance', function () {
  test.it('exactly one blank line between closing } and main() call', function () {
    var source = fs.readFileSync(indexPath, 'utf8');
    // Normalize CRLF to LF so the regex works on Windows checkouts
    source = source.replace(/\r\n/g, '\n');
    assert.ok(
      /\}\n\nmain\(\);/.test(source),
      'Expected exactly one blank line between } and main();'
    );
  });

  test.it('source contains no ES6+ syntax', function () {
    var source = fs.readFileSync(indexPath, 'utf8');
    var forbidden = [
      [/\bconst\b/, 'const'],
      [/\blet\b/, 'let'],
      [/=>/, 'arrow function'],
      [/[\x60]/, 'template literal (backtick)'],
      [/\bclass\b/, 'class'],
      [/\.\.\./, 'spread/rest'],
      [/\basync\b/, 'async'],
      [/\bawait\b/, 'await']
    ];
    var i;
    for (i = 0; i < forbidden.length; i++) {
      assert.ok(
        !forbidden[i][0].test(source),
        'Found forbidden ES6+ syntax: ' + forbidden[i][1]
      );
    }
  });
});
