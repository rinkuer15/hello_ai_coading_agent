var test = require('node:test');
var assert = require('node:assert');
var child_process = require('node:child_process');

test('landing page contains project name', function () {
  var result = child_process.spawnSync(process.execPath, ['src/index.js'], { encoding: 'utf8' });
  assert.ok(result.stdout.includes('Hello, AI Coding Agent!'));
});

test('landing page contains npm test command', function () {
  var result = child_process.spawnSync(process.execPath, ['src/index.js'], { encoding: 'utf8' });
  assert.ok(result.stdout.includes('npm test'));
});

test('landing page contains npm run lint command', function () {
  var result = child_process.spawnSync(process.execPath, ['src/index.js'], { encoding: 'utf8' });
  assert.ok(result.stdout.includes('npm run lint'));
});

test('landing page contains src/index.js reference', function () {
  var result = child_process.spawnSync(process.execPath, ['src/index.js'], { encoding: 'utf8' });
  assert.ok(result.stdout.includes('src/index.js'));
});
