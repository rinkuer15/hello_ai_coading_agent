function main() {
  if (process.argv.indexOf('--serve') !== -1) {
    var srv = require('./server.js').startServer();
    srv.on('error', function(err) {
      process.stderr.write('Server error: ' + err.message + '\n');
      process.exit(1);
    });
    return;
  }
  console.log('Hello, AI Coding Agent!');
}

main();
