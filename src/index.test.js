/*
 * src/index.test.js
 * Unit tests for src/index.js — baseline oracle and CLI routing.
 *
 * Test runner: node --test (Node.js built-in, no npm packages)
 * Language:    ES5-compatible JavaScript (var, function, single quotes, semicolons)
 * Imports:     node:test, node:assert/strict, node:child_process, node:path — all built-ins
 *
 * BLOCKED TESTS (documented, not papered over):
 *
 *   [serve] test — requires src/index.js to route '--serve' to startServer().
 *   This routing is introduced in issue #33 (HTTP server) on the
 *   feature/progressive-web-app branch. Until #33 is merged, running
 *   `node src/index.js --serve` just executes the oracle console.log and
 *   exits 0 — no SIGTERM signal, so the spawnSync assertion cannot pass.
 *   Re-enable this test after #33 lands.
 *
 *   src/server.test.js — requires src/server.js (issue #33) to exist and
 *   export startServer(). Creating server.test.js also depends on the
 *   governance amendment in #32 that extends the single-file src/ rule to
 *   allow co-located test files. Both blockers must resolve before
 *   server.test.js can be written.
 *
 * BROWSER-API TEST GAP (OQ-6):
 *   Service worker lifecycle, Cache API, and Web App Manifest validation
 *   require a browser execution context that node --test cannot provide.
 *   These gaps are documented here, not papered over. Browser-side test
 *   strategy to be decided separately (OQ-6).
 */

var nodeTest = require('node:test');
var assert = require('node:assert/strict');
var spawnSync = require('node:child_process').spawnSync;
var path = require('node:path');

var test = nodeTest;

var CLI = path.join(__dirname, 'index.js');

test('baseline oracle: stdout is Hello, AI Coding Agent! and exit code is 0', function(t) {
  var result = spawnSync(process.execPath, [CLI], { encoding: 'utf8' });
  assert.strictEqual(result.status, 0);
  assert.strictEqual(result.stdout, 'Hello, AI Coding Agent!\n');
  assert.strictEqual(result.stderr, '');
});

test('exit code: process exits with code 0', function(t) {
  var result = spawnSync(process.execPath, [CLI], { encoding: 'utf8' });
  assert.strictEqual(result.status, 0);
});

/*
 * BLOCKED: --serve routing test.
 * Re-enable after issue #33 (HTTP server + index.js --serve routing) is merged.
 *
 * test('--serve flag: routes main() to startServer(), process killed by timeout (SIGTERM)', function(t) {
 *   var result = spawnSync(process.execPath, [CLI, '--serve'], {
 *     encoding: 'utf8',
 *     timeout: 2000,
 *     env: Object.assign({}, process.env, { PORT: '0' })
 *   });
 *   // Server never exits cleanly in spawnSync — timeout kills it with SIGTERM.
 *   // SIGTERM means the server was still running = it started correctly.
 *   assert.strictEqual(result.signal, 'SIGTERM');
 *   // --serve path must NOT print the oracle string
 *   assert.notStrictEqual(result.stdout, 'Hello, AI Coding Agent!\n');
 * });
 */
