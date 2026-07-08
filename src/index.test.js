var test = require('node:test');
var assert = require('node:assert');
var childProcess = require('node:child_process');
var fs = require('node:fs');

test('stdout oracle', function () {
  var result = childProcess.spawnSync(process.execPath, ['src/index.js']);
  assert.strictEqual(
    result.stdout.toString(),
    'Hello, AI Coding Agent!\n',
    'stdout oracle mismatch: expected exactly "Hello, AI Coding Agent!\\n"'
  );
  assert.strictEqual(
    result.status,
    0,
    'exit status must be 0'
  );
});

test('blank-line invariant', function () {
  var source = fs.readFileSync('src/index.js', 'utf8').replace(/\r\n/g, '\n');
  var lines = source.split('\n');
  // src/index.js is frozen to 5 lines; line index 2 (0-based) is always the closing } of main()
  assert.strictEqual(
    lines[3],
    '',
    'blank-line invariant: line[3] (after closing } of main()) must be empty'
  );
  assert.strictEqual(
    lines[4],
    'main();',
    'blank-line invariant: line[4] must be exactly "main();"'
  );
});

test('ES5 compliance backstop', function () {
  var source = fs.readFileSync('src/index.js', 'utf8');
  assert.ok(
    !/\bconst\b|\blet\b|=>|`|\bclass\b|\basync\b|\bawait\b/.test(source),
    'ES5 violation: forbidden syntax detected in src/index.js'
  );
});
