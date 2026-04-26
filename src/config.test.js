'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var fs = require('fs');
var os = require('os');
var path = require('path');
var config = require('./config');

function tempConfigPath() {
  return path.join(os.tmpdir(), 'hello-ai-config-test-' + Date.now() + '.json');
}

test('loadConfig returns default config on ENOENT', function () {
  var result = config.loadConfig('/nonexistent/path/config.json');
  assert.deepEqual(result, { version: 1, theme: config.DEFAULT_THEME });
});

test('loadConfig returns persisted theme from valid config file', function () {
  var filePath = tempConfigPath();
  fs.writeFileSync(filePath, JSON.stringify({ version: 1, theme: 'light' }), 'utf8');
  try {
    var result = config.loadConfig(filePath);
    assert.equal(result.theme, 'light');
    assert.equal(result.version, 1);
  } finally {
    fs.unlinkSync(filePath);
  }
});

test('loadConfig returns default and logs error on malformed JSON', function () {
  var filePath = tempConfigPath();
  fs.writeFileSync(filePath, 'not valid json', 'utf8');
  var errors = [];
  var originalError = console.error;
  console.error = function () { errors.push(Array.from(arguments).join(' ')); };
  try {
    var result = config.loadConfig(filePath);
    assert.deepEqual(result, { version: 1, theme: config.DEFAULT_THEME });
    assert.ok(errors.length > 0);
  } finally {
    console.error = originalError;
    fs.unlinkSync(filePath);
  }
});

test('loadConfig returns default and logs error on missing theme field', function () {
  var filePath = tempConfigPath();
  fs.writeFileSync(filePath, JSON.stringify({ version: 1 }), 'utf8');
  var errors = [];
  var originalError = console.error;
  console.error = function () { errors.push(Array.from(arguments).join(' ')); };
  try {
    var result = config.loadConfig(filePath);
    assert.deepEqual(result, { version: 1, theme: config.DEFAULT_THEME });
    assert.ok(errors.length > 0);
  } finally {
    console.error = originalError;
    fs.unlinkSync(filePath);
  }
});

test('saveConfig writes theme to disk and loadConfig reads it back', function () {
  var filePath = tempConfigPath();
  try {
    config.saveConfig('light', filePath);
    var result = config.loadConfig(filePath);
    assert.equal(result.theme, 'light');
  } finally {
    if (fs.existsSync(filePath)) { fs.unlinkSync(filePath); }
  }
});

test('DEFAULT_THEME is dark', function () {
  assert.equal(config.DEFAULT_THEME, 'dark');
});
