import EmberThemedService from 'ember-themed/services/ember-themed';
import themes, { variants } from 'dummy/themes';
import { TrackedObject } from 'tracked-built-ins';

// make sure our themes object is tracked since we'll be doing some crazy stuff with it
// in the dummy app
const trackedThemes = new TrackedObject(themes);

export default class ThemeService extends EmberThemedService {
  // this is the default theme to fall back to if one is not yet set via `setTheme()`
  defaultTheme = 'light';

  // Match system theme? for example light/dark theme in MacOS
  matchSystemTheme = true;
  // default light/dark themes if matchSystemTheme is true
  lightTheme = 'light';
  darkTheme = 'dark';

  // Set your themes on the service, you could also define them here instead of in the
  // themes.js file if you choose
  themes = trackedThemes;

  // misc stuff for the dummy app
  variantNames = Object.keys(variants);
}

