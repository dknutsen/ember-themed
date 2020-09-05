import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ThemeService extends Service {
  defaultTheme = null;
  @tracked currentTheme = this.defaultTheme;

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
    const currentTheme = this.getTheme(theme)
    const themeStyle = currentTheme[style] || currentTheme.default;
    return Array.isArray(themeStyle) ? themeStyle : themeStyle.split(' ');
  }

  @action setTheme(newTheme) {
    this.currentTheme = newTheme;
  }
}
