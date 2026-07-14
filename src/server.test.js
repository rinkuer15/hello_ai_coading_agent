'use strict';

// BROWSER-API TEST GAP (OQ-6)
// Service worker lifecycle, caches API, and Web App Manifest validation
// are browser-context APIs and are untestable via node --test.
// Browser-side test strategy is deferred to OQ-6.
// This gap is intentional - not papered over.

var test = require('node:test');
var assert = require('node:assert');
var http = require('node:http');
var serverModule = require('./server.js');

function makeGet(port, urlPath, callback) {
  var req = http.get('http://127.0.0.1:' + port + urlPath, function(res) {
    var body = '';
    res.on('data', function(chunk) { body += chunk; });
    res.on('end', function() { callback(null, res, body); });
  });
  req.on('error', callback);
}

test('server starts and binds to configured port', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    var err = null;
    try {
      assert.ok(port > 0, 'port must be non-zero');
    } catch (e) {
      err = e;
    }
    server.close(function() { done(err); });
  });
  server.on('error', done);
});

test('200 and Content-Type text/html for .html', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    makeGet(port, '/', function(err, res) {
      if (err) { server.close(function() { done(err); }); return; }
      var assertErr = null;
      try {
        assert.strictEqual(res.statusCode, 200);
        assert.ok(
          res.headers['content-type'].indexOf('text/html') !== -1,
          'content-type must include text/html'
        );
      } catch (e) {
        assertErr = e;
      }
      server.close(function() { done(assertErr); });
    });
  });
  server.on('error', done);
});

test('200 and Content-Type application/json for manifest.json', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    makeGet(port, '/manifest.json', function(err, res) {
      if (err) { server.close(function() { done(err); }); return; }
      var assertErr = null;
      try {
        assert.strictEqual(res.statusCode, 200);
        var ct = res.headers['content-type'] || '';
        assert.ok(
          ct.indexOf('application/json') !== -1 || ct.indexOf('application/manifest+json') !== -1,
          'content-type must include application/json or application/manifest+json'
        );
      } catch (e) {
        assertErr = e;
      }
      server.close(function() { done(assertErr); });
    });
  });
  server.on('error', done);
});

test('200 and Content-Type application/javascript for .js', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    makeGet(port, '/service-worker.js', function(err, res) {
      if (err) { server.close(function() { done(err); }); return; }
      var assertErr = null;
      try {
        assert.strictEqual(res.statusCode, 200);
        assert.ok(
          res.headers['content-type'].indexOf('application/javascript') !== -1,
          'content-type must include application/javascript'
        );
      } catch (e) {
        assertErr = e;
      }
      server.close(function() { done(assertErr); });
    });
  });
  server.on('error', done);
});

test('404 for unknown paths', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    makeGet(port, '/no-such-file-xyz', function(err, res) {
      if (err) { server.close(function() { done(err); }); return; }
      var assertErr = null;
      try {
        assert.strictEqual(res.statusCode, 404);
      } catch (e) {
        assertErr = e;
      }
      server.close(function() { done(assertErr); });
    });
  });
  server.on('error', done);
});

test('PORT env variable overrides default 3000', function(t, done) {
  var prevPort = process.env.PORT;
  var finder = http.createServer();
  finder.listen(0, function() {
    var freePort = finder.address().port;
    finder.close(function() {
      process.env.PORT = String(freePort);
      var server = serverModule.startServer();
      server.on('listening', function() {
        var actualPort = server.address().port;
        server.close(function() {
          process.env.PORT = prevPort !== undefined ? prevPort : '';
          var err = null;
          try {
            assert.strictEqual(actualPort, freePort, 'server must listen on PORT env value');
          } catch (e) {
            err = e;
          }
          done(err);
        });
      });
      server.on('error', function(e) {
        process.env.PORT = prevPort !== undefined ? prevPort : '';
        done(e);
      });
    });
  });
  finder.on('error', done);
});

test('path traversal attempt returns 400 or 404', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    makeGet(port, '/%2e%2e/%2e%2e/package.json', function(err, res) {
      if (err) { server.close(function() { done(err); }); return; }
      var assertErr = null;
      try {
        assert.ok(
          res.statusCode === 400 || res.statusCode === 404,
          'expected 400 or 404, got ' + res.statusCode
        );
      } catch (e) {
        assertErr = e;
      }
      server.close(function() { done(assertErr); });
    });
  });
  server.on('error', done);
});

test('security headers present on responses', function(t, done) {
  process.env.PORT = '0';
  var server = serverModule.startServer();
  server.on('listening', function() {
    var port = server.address().port;
    makeGet(port, '/', function(err, res) {
      if (err) { server.close(function() { done(err); }); return; }
      var assertErr = null;
      try {
        assert.ok(
          res.headers['x-content-type-options'],
          'X-Content-Type-Options header must be present'
        );
        assert.ok(
          res.headers['x-frame-options'],
          'X-Frame-Options header must be present'
        );
      } catch (e) {
        assertErr = e;
      }
      server.close(function() { done(assertErr); });
    });
  });
  server.on('error', done);
});
