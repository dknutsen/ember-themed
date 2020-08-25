import EmberThemedService from 'ember-themed/services/ember-themed';
import themes from '<%= dasherizedPackageName %>/themes';

export default class ThemeService extends EmberThemedService {
  // This is the default theme to fall back to if one has not yet been set via `setTheme()`
  // You should change this!
  defaultTheme = 'light';

  themes = themes;
}
