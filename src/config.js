'use strict';

var fs = require('fs');
var path = require('path');

/** Default theme applied when no config file exists or config is invalid. */
var DEFAULT_THEME = 'dark';

/** Default config path — stored in user's home directory. */
var DEFAULT_CONFIG_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || '.',
  '.hello-ai-config.json'
);

/**
 * Loads the persisted theme config from disk.
 *
 * Behaviour:
 *  - ENOENT (file not found): silently returns default config.
 *  - Malformed JSON: logs a console.error warning and returns default config.
 *  - Missing/invalid `theme` field: logs a console.error warning and returns default.
 *
 * @param {string} [configPath] - Path to the config file. Defaults to
 *   `~/.hello-ai-config.json`.
 * @returns {{ version: number, theme: string }} The resolved config object.
 */
function loadConfig(configPath) {
  var filePath = configPath || DEFAULT_CONFIG_PATH;
  var defaultConfig = { version: 1, theme: DEFAULT_THEME };

  var raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return defaultConfig;
    }
    console.error('[config] Failed to read config file: ' + err.message);
    return defaultConfig;
  }

  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error('[config] Malformed JSON in config file — using defaults.');
    return defaultConfig;
  }

  if (!parsed || typeof parsed.theme !== 'string') {
    console.error('[config] Invalid config structure — using defaults.');
    return defaultConfig;
  }

  return { version: 1, theme: parsed.theme };
}

/**
 * Persists the theme config to disk.
 *
 * @param {string} theme - The theme name to save ('dark' or 'light').
 * @param {string} [configPath] - Path to the config file. Defaults to
 *   `~/.hello-ai-config.json`.
 * @returns {void}
 * @throws {Error} If the file cannot be written.
 */
function saveConfig(theme, configPath) {
  var filePath = configPath || DEFAULT_CONFIG_PATH;
  var data = JSON.stringify({ version: 1, theme: theme }, null, 2);
  fs.writeFileSync(filePath, data, 'utf8');
}

module.exports = {
  DEFAULT_THEME: DEFAULT_THEME,
  loadConfig: loadConfig,
  saveConfig: saveConfig,
};
