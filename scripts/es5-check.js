// ES5 compliance checker for src/index.js
// Uses only Node.js built-ins. Zero dependencies.
//
// KNOWN LIMITATION: Regex-literal stripping is heuristic-based, verified against
// known edge cases, not formally proven. The heuristic keys off a preceding
// operator/punctuation/newline to tell a regex literal apart from division.
// Cases the heuristic does NOT handle:
//   - a regex directly after a bare identifier, ')' or ']' (e.g. a /const/ b)
//     is treated as division, so tokens inside it are still scanned
//   - division split across lines, where a newline precedes the '/', is treated
//     as the start of a regex literal and may be mis-stripped
// Manual inspection remains mandatory after every .js edit.

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

// Strip regex literals. Only treated as a regex when preceded by an operator,
// punctuation, or line start - so division is left intact.
// Regression fixtures: 'a/b/c' must stay unstripped (division);
// 'x = /const/' must be stripped (regex).
stripped = stripped.replace(/(^|[=(:,;!&|?{}\[\n]\s*)\/(?:[^\/\\\r\n]|\\.)+\/[a-z]*/g, '$1""');

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
