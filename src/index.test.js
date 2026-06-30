const { test } = require('node:test');
const { spawn } = require('child_process');
const assert = require('node:assert');

test('index.js produces correct output', async () => {
  await new Promise((resolve, reject) => {
    const child = spawn('node', ['src/index.js']);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      try {
        assert.strictEqual(code, 0, `Expected exit code 0, got ${code}`);
        assert.strictEqual(stdout, 'Hello, AI Coding Agent!\n', `Expected "Hello, AI Coding Agent!\\n", got ${JSON.stringify(stdout)}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    child.on('error', reject);
  });
});
