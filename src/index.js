function renderLandingPage() {
  var sep = '========================================';
  return [
    sep,
    '  Hello, AI Coding Agent!',
    '  A minimal scaffold for AI experiments',
    sep,
    '',
    '  Commands:',
    '    npm start           Run the application',
    '    npm test            Run tests (node --test)',
    '    npm run lint        Syntax check',
    '    npm run type-check  Syntax check',
    '',
    '  Extend me:',
    '    Add functions to src/index.js',
    '    Co-locate tests in src/*.test.js',
    '',
    sep,
  ].join('\n');
}

function main() {
  console.log(renderLandingPage());
}

main();
