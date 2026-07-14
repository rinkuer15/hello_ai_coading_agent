'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');

var PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function addSecurityHeaders(headers) {
  headers['X-Content-Type-Options'] = 'nosniff';
  headers['X-Frame-Options'] = 'DENY';
  return headers;
}

function sendError(res, code, message) {
  res.writeHead(code, addSecurityHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }));
  res.end(message);
}

function handleRequest(req, res) {
  var urlPath = req.url.split('?')[0];

  if (urlPath.indexOf('..') !== -1 || urlPath.toLowerCase().indexOf('%2e') !== -1) {
    process.stderr.write('server: path traversal rejected: ' + urlPath + '\n');
    sendError(res, 400, 'Bad Request');
    return;
  }

  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  var ext = path.extname(urlPath).toLowerCase();
  var mimeType = MIME[ext] || 'application/octet-stream';
  var filePath = path.resolve(PUBLIC_DIR, urlPath.slice(1));

  if (filePath.indexOf(PUBLIC_DIR + path.sep) !== 0 && filePath !== PUBLIC_DIR) {
    process.stderr.write('server: path containment rejected: ' + urlPath + '\n');
    sendError(res, 400, 'Bad Request');
    return;
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        sendError(res, 404, 'Not Found');
      } else {
        process.stderr.write('server: file read error ' + err.code + ' for ' + filePath + ': ' + err.message + '\n');
        sendError(res, 500, 'Internal Server Error');
      }
      return;
    }
    res.writeHead(200, addSecurityHeaders({ 'Content-Type': mimeType }));
    res.end(data);
  });
}

function startServer() {
  var envPort = process.env.PORT;
  var port = 3000;
  if (envPort !== undefined && envPort !== '') {
    port = parseInt(envPort, 10);
    if (isNaN(port) || port < 0 || port > 65535) {
      process.stderr.write('server: invalid PORT value: ' + envPort + '\n');
      process.exit(1);
    }
  }
  var server = http.createServer(handleRequest);
  server.listen(port);
  return server;
}

module.exports = { startServer: startServer };
