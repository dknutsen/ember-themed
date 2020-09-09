import EmberThemedService from 'ember-themed/services/ember-themed';
import themes from '<%= dasherizedPackageName %>/themes';

export default class ThemeService extends EmberThemedService {
  // this is the default theme to fall back to if one is not yet set via `setTheme()`
  defaultTheme = null;

  // Match system theme? for example light/dark theme in MacOS
  matchSystemTheme = false;
  // default light/dark themes if matchSystemTheme is true
  lightTheme = null;
  darkTheme = null;

  // Set your themes on the service, you could also define them here instead of in the
  // themes.js file if you choose
  themes = themes;
}
