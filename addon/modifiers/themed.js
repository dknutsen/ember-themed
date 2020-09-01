import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ThemedModifier extends Modifier {
  @service emberThemed;

  _lastTheme = null;
  _lastStyle = null;

  get style() {
    return this.args.positional[0];
  }

  updateTheme() {
    const { currentTheme } = this.emberThemed;
    const { _lastTheme, _lastStyle } = this;
    // remove old theme styles
    if (this._lastStyle !== this.style) {
      this._lastStyle = this.style;
    }
    if (this._lastTheme !== currentTheme) {
      this._lastTheme = currentTheme;
    }
    const toRemove = this.emberThemed.getThemeStyle(_lastTheme, _lastStyle);
    toRemove.forEach(c => this.element.classList.remove(c));
    // add new theme styles
    const toAdd = this.emberThemed.getThemeStyle(currentTheme, this.style);
    toAdd.forEach(c => this.element.classList.add(c));
  }

  didReceiveArguments() {
    this.updateTheme();
  }
}
