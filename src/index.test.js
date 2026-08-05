/*
 * src/index.test.js
 *
 * FR-9 Known Gap: Service Worker Browser API Testing
 *
 * The service worker implemented in public/service-worker.js relies exclusively
 * on browser APIs: caches, navigator.serviceWorker, and the SW fetch/install/
 * activate event model. None of these APIs exist in the Node.js runtime used by
 * `node --test`.
 *
 * This gap is accepted and intentional per the project governance specification.
 * No stub or mock implementations of browser APIs will be added here.
 *
 * Manual verification procedure (FR-5 acceptance):
 *   1. Start an HTTP server serving the public/ directory at origin root.
 *   2. Open the app in a browser (Chrome/Edge recommended for DevTools).
 *   3. DevTools -> Application -> Service Workers: confirm "activated and running".
 *   4. DevTools -> Network -> check "Offline".
 *   5. Reload the page: all assets should return "200 (from ServiceWorker)".
 *   6. DevTools -> Application -> Cache Storage: confirm 'hello-ai-v1' cache
 *      contains all CACHE_FILES entries.
 *
 * No fabricated or stub tests are added here. The gap is intentional and
 * documented per the project governance specification.
 */

var test = require('node:test');
var assert = require('node:assert/strict');
var child_process = require('node:child_process');

test('oracle: node src/index.js outputs Hello, AI Coding Agent!', function (t) {
  var result = child_process.spawnSync('node', ['src/index.js'], { encoding: 'utf8' });
  assert.strictEqual(result.stdout, 'Hello, AI Coding Agent!\n');
  assert.strictEqual(result.status, 0);
});
