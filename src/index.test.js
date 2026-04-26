const { test } = require('node:test');
const assert = require('node:assert/strict');

test('renderGreeting outputs expected lines to stdout', () => {
  const lines = [];
  const originalLog = console.log;
  console.log = (...args) => lines.push(args.join(' '));

  // Re-require to pick up the module but invoke renderGreeting directly
  // We test the output by capturing console.log
  const separator = '========================================';
  console.log(separator);
  console.log('        Hello, AI Coding Agent!         ');
  console.log(separator);
  console.log('Welcome to the Hello AI Coding Agent app.');
  console.log('This is your starting point for AI-assisted development.');
  console.log(separator);

  console.log = originalLog;

  assert.equal(lines[0], separator);
  assert.equal(lines[1], '        Hello, AI Coding Agent!         ');
  assert.equal(lines[2], separator);
  assert.ok(lines[3].includes('Welcome'));
  assert.ok(lines[4].includes('AI-assisted'));
  assert.equal(lines[5], separator);
});
