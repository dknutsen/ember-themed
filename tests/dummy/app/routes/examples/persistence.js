import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';
import themes, { transition, variants } from 'dummy/themes';

const extraThemes = {
  grape: { default: `bg-purple-800 text-white ${transition}` },
  cherry: { default: `bg-red-800 text-white ${transition}` },
  banana: { default: `bg-yellow-800 text-white ${transition}` },
  orange: { default: `bg-orange-800 text-white ${transition}` },
  mint: { default: `bg-green-800 text-white ${transition}` }
};

export default class PersistenceRoute extends Route {
  @service emberThemed;

  _themeToRestore = null;
  _themesToRestore = null;

  activate() {
    // setup "extra" themes for this route
    this._themeToRestore = this.emberThemed.currentTheme;
    this._themesToRestore = this.emberThemed.themes;
    this.emberThemed.themes = new TrackedObject({ ...themes, ...extraThemes });

    // restore saved theme from local storage if there is one
    const persistedTheme = window.localStorage.getItem('ember-themed:persisted-theme');
    if (persistedTheme) this.emberThemed.setTheme(persistedTheme);
  }

  deactivate() {
    // save currently selected theme to local storage
    const persistedTheme = window.localStorage.setItem('ember-themed:persisted-theme', this.emberThemed.currentTheme);

    // reset themes back to application defaults
    this.emberThemed.setTheme(this._themeToRestore);
    this.emberThemed.themes = this._themesToRestore;
  }
}
