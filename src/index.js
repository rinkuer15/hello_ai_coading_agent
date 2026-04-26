'use strict';

var config = require('./config');
var theme = require('./theme');

var VALID_THEMES = ['dark', 'light'];

/**
 * Parses CLI arguments to extract the --theme flag.
 *
 * @param {string[]} argv - process.argv array.
 * @returns {{ theme: string|null }} Parsed args. `theme` is null if not provided.
 */
function parseArgs(argv) {
  var args = argv.slice(2);
  var themeValue = null;

  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--theme') {
      if (i + 1 >= args.length || args[i + 1].startsWith('-')) {
        console.error('Flag --theme requires a value. Valid options: dark, light.');
        process.exit(1);
      }
      themeValue = args[i + 1];
      i++;

      if (VALID_THEMES.indexOf(themeValue) === -1) {
        console.error("Unknown theme: '" + themeValue + "'. Valid options: dark, light.");
        process.exit(1);
      }
    }
  }

  return { theme: themeValue };
}

/**
 * Prints usage/help text and exits with code 0.
 *
 * @returns {void}
 */
function printHelp() {
  console.log('Usage: node src/index.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --theme <name>   Set the colour theme. Valid options: dark, light.');
  console.log('                   The default theme is dark.');
  console.log('  --help, -h       Show this help message.');
  process.exit(0);
}

/**
 * Resolves the active theme from CLI arg or saved config.
 *
 * @param {string|null} argTheme - Theme from CLI args, or null if not provided.
 * @param {string} configTheme - Theme from persisted config.
 * @returns {string} Resolved theme ('dark' or 'light').
 */
function resolveTheme(argTheme, configTheme) {
  return argTheme || configTheme || config.DEFAULT_THEME;
}

/**
 * Renders the static greeting content to stdout using the active theme.
 *
 * @param {string} resolvedTheme - The active theme.
 * @returns {void}
 */
function renderGreeting(resolvedTheme) {
  var opts = { isTTY: process.stdout.isTTY };
  console.log(theme.applyTheme('========================================', resolvedTheme, opts));
  console.log(theme.applyTheme('        Hello, AI Coding Agent!         ', resolvedTheme, opts));
  console.log(theme.applyTheme('========================================', resolvedTheme, opts));
  console.log(theme.applyTheme('Welcome to the Hello AI Coding Agent app.', resolvedTheme, opts));
  console.log(theme.applyTheme('This is your starting point for AI-assisted development.', resolvedTheme, opts));
  console.log(theme.applyTheme('========================================', resolvedTheme, opts));
}

function main() {
  var argv = process.argv;

  if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
    printHelp();
    return;
  }

  var args = parseArgs(argv);
  var cfg = config.loadConfig();
  var resolvedTheme = resolveTheme(args.theme, cfg.theme);

  if (args.theme !== null) {
    config.saveConfig(resolvedTheme);
    console.log('Theme set to ' + resolvedTheme + '. Preference saved.');
  }

  renderGreeting(resolvedTheme);
}

main();
