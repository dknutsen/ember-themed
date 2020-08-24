import ThemedService from 'ember-themed/services/ember-themed';
import themes from '<%= dasherizedPackageName %>/themes';

export default class ThemeService extends Service {
  // this is the default theme to fall back to if one is not yet set via `setTheme()`
  defaultTheme = 'light';

  themes = themes;
}

