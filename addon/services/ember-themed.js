import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ThemeService extends Service {
  defaultTheme = null;
  lastTheme = null;
  @tracked currentTheme = null;

  get themeNames() {
    return Object.keys(this.themes);
  }

  getTheme(theme) {
    const { themes } = this;
    if (!themes || !Object.keys(themes).length) {
      // TODO: throw error if no themes
      return { };
    }
    return themes[theme] || themes[this.defaultTheme];
  }

  getThemeStyle(theme, style = 'default') {
    const themeStyle = this.getTheme(theme)[style] || [];
    return Array.isArray(themeStyle) ? themeStyle : themeStyle.split(' ');
  }

  @action setTheme(newTheme) {
    this.lastTheme = this.currentTheme;
    this.currentTheme = newTheme;
  }
}
