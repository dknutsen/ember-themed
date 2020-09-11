import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ThemeService extends Service {
  darkTheme = null;
  defaultTheme = null;
  matchSystemTheme = false;

  @tracked _currentTheme = null;

  /**
   * Returns the current theme if set, or a default theme if not
   */
  get currentTheme() {
    return this._currentTheme || this._defaultTheme;
  }

  /**
   * Returns an array of all currently defined theme names
   */
  get themeNames() {
    return Object.keys(this.themes || { });
  }

  /**
   * Returns an object hash of all styles for the given theme name
   */
  getTheme(theme) {
    const { themes } = this;
    if (!themes || !Object.keys(themes).length) {
      // TODO: throw error if no themes?
      return { };
    }
    return themes[theme] || themes[this._defaultTheme];
  }

  /**
   * Returns an array of class names to apply for the given theme/style names
   */
  getThemeStyle(theme, style = 'default') {
    const currentTheme = this.getTheme(theme)
    const themeStyle = currentTheme[style] || currentTheme.default;
    return Array.isArray(themeStyle) ? themeStyle : themeStyle.split(' ');
  }

  /**
   * Sets the global current theme to the given `newTheme`
   */
  @action setTheme(newTheme) {
    this._currentTheme = newTheme;
  }

  /**
   * Finds a default theme to use using a fallback strategy:
   *   - if matchSystemTheme is true, attempts to find and use theme to match use preference
   *   - if defaultTheme is set, use it
   *   - uses the first theme in `themes`
   */
  get _defaultTheme() {
    const { themeNames, defaultTheme } = this;
    // TODO: throw specific error if no themes?
    // if matchSystemTheme is true, attempt to find a light/dark theme to use to match user preference
    if (this.matchSystemTheme) {
      if (this._systemLightMode) {
        const lightTheme = this.lightTheme || themeNames.find(t => t.includes('light'));
        if (lightTheme) return lightTheme;
      }
      if (this._systemDarkMode) {
        const darkTheme = this.darkTheme || themeNames.find(t => t.includes('dark'));
        if (darkTheme) return darkTheme;
      }
    }
    // otherwise use default theme if set
    if (defaultTheme) return defaultTheme;
    // otherwise use first theme
    return themeNames[0];
  }

  /**
   * Is the system configured to use light mode?
   */
  get _systemLightMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  /**
   * Is the system configured to use dark mode?
   */
  get _systemDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
