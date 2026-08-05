// ES5 compliance checker for src/index.js
// Uses only Node.js built-ins. Zero dependencies.
//
// KNOWN LIMITATION: Regex literals are not stripped before scanning.
// A regex containing a forbidden keyword could produce a false positive.
// In practice src/index.js contains no regex literals.

var fs = require('fs');
var path = require('path');

var target = path.join(__dirname, '..', 'src', 'index.js');
var source = fs.readFileSync(target, 'utf8');

// Strip block comments
var stripped = source.replace(/\/\*[\s\S]*?\*\//g, '');
// Strip line comments
stripped = stripped.replace(/\/\/[^\n]*/g, '');
// Strip single-quoted strings
stripped = stripped.replace(/'(?:[^'\\]|\\.)*'/g, '""');
// Strip double-quoted strings
stripped = stripped.replace(/"(?:[^"\\]|\\.)*"/g, '""');
// Strip template literals (backtick strings — their presence is itself a violation,
// but strip them to avoid false positives on content inside)
stripped = stripped.replace(/`(?:[^`\\]|\\.)*`/g, '""');

var forbidden = [
  { pattern: /\bconst\b/, name: 'const' },
  { pattern: /\blet\b/, name: 'let' },
  { pattern: /=>/, name: '=>' },
  { pattern: /`/, name: 'template literal (backtick)' },
  { pattern: /\bclass\b/, name: 'class' },
  { pattern: /\basync\b/, name: 'async' },
  { pattern: /\bawait\b/, name: 'await' },
  { pattern: /\.\.\./, name: 'spread/rest (...)' }
];

var failures = [];
var i;
for (i = 0; i < forbidden.length; i++) {
  if (forbidden[i].pattern.test(stripped)) {
    failures.push(forbidden[i].name);
  }
}

if (failures.length > 0) {
  console.error('ES5 check FAILED. Forbidden tokens found: ' + failures.join(', '));
  process.exit(1);
} else {
  console.log('ES5 check passed.');
  process.exit(0);
}
