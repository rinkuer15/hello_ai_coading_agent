'use strict';

/**
 * ANSI escape codes for the dark theme.
 */
const DARK_CODES = {
  primary: '\x1b[97m',   // bright white
  error: '\x1b[91m',     // bright red
  confirm: '\x1b[92m',   // bright green
};

/**
 * ANSI escape codes for the light theme.
 */
const LIGHT_CODES = {
  primary: '\x1b[34m',   // blue
  error: '\x1b[31m',     // red
  confirm: '\x1b[32m',   // green
};

/** ANSI reset sequence — every coloured output must end with this. */
const ANSI_RESET = '\x1b[0m';

const THEMES = {
  dark: DARK_CODES,
  light: LIGHT_CODES,
};

/**
 * Applies ANSI theme colouring to a message.
 *
 * Suppression priority (highest first):
 *  1. process.env.NO_COLOR is set (any value) → strip colour
 *  2. process.env.TERM === 'dumb' → strip colour
 *  3. options.isTTY is false → strip colour
 *
 * @param {string} message - The text to display.
 * @param {'dark'|'light'} theme - The resolved theme name.
 * @param {{ isTTY?: boolean, type?: 'primary'|'error'|'confirm' }} options
 *   - isTTY: whether the output stream is a TTY (default true).
 *   - type: which ANSI colour slot to use (default 'primary').
 * @returns {string} The (possibly coloured) message string. Coloured output
 *   always ends with ANSI_RESET (\x1b[0m).
 * @throws {Error} If `theme` is not 'dark' or 'light'.
 */
function applyTheme(message, theme, options) {
  if (!THEMES[theme]) {
    throw new Error(
      'applyTheme: unknown theme "' + theme + '". Expected "dark" or "light".'
    );
  }

  var opts = options || {};
  var isTTY = opts.isTTY !== undefined ? opts.isTTY : true;
  var type = opts.type || 'primary';

  var shouldColour =
    !process.env.NO_COLOR &&
    process.env.TERM !== 'dumb' &&
    isTTY;

  if (!shouldColour) {
    return message;
  }

  var code = THEMES[theme][type] || THEMES[theme].primary;
  return code + message + ANSI_RESET;
}

module.exports = {
  ANSI_PRIMARY: { dark: DARK_CODES.primary, light: LIGHT_CODES.primary },
  ANSI_RESET: ANSI_RESET,
  ANSI_ERROR: { dark: DARK_CODES.error, light: LIGHT_CODES.error },
  ANSI_CONFIRM: { dark: DARK_CODES.confirm, light: LIGHT_CODES.confirm },
  applyTheme: applyTheme,
};
