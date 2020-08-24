import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const themes = {
  light: {
    add: ['transition', 'duration-500', 'ease-in-out', 'bg-white', 'text-black'],
    remove: ['transition', 'duration-', 'ease-', 'bg-', 'text-white']
  },
  dark: {
    add: ['transition', 'duration-500', 'ease-in-out', 'bg-gray-900', 'text-white'],
    remove: ['transition', 'duration-', 'ease-', 'bg-', 'text-black'],
  }
};

export default class ThemeService extends Service {
  defaultTheme = 'light';
  themes = themes;

  @tracked currentTheme = null;

  @action setTheme(newTheme) {
    this.currentTheme = newTheme;
  }
}
