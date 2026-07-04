const { test } = require('node:test');
const { spawn } = require('child_process');
const assert = require('node:assert');
const path = require('path');

var EXPECTED = 'Hello, AI Coding Agent!\n';

test('stdout is byte-exact oracle output', async () => {
  await new Promise((resolve, reject) => {
    const scriptPath = path.resolve(__dirname, '..', 'src', 'index.js');
    const child = spawn('node', [scriptPath]);
    let stdout = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.on('close', (code) => {
      try {
        assert.strictEqual(code, 0, `Expected exit code 0, got ${code}`);
        assert.strictEqual(stdout, EXPECTED, `Expected ${JSON.stringify(EXPECTED)}, got ${JSON.stringify(stdout)}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    child.on('error', reject);
  });
});
