import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ThemedModifier extends Modifier {
  @service emberThemed;

  _lastStyle = null;

  get style() {
    return this.args.positional[0];
  }

  updateTheme() {
    const { currentTheme, lastTheme } = this.emberThemed;
    // remove old theme styles
    const toRemove = this.emberThemed.getThemeStyle(lastTheme, this.style);
    if (this.style !== this._lastStyle) {
      // if style changed reset those classes too
      toRemove.push(...this.emberThemed.getThemeStyle(currentTheme, this._lastStyle));
      this._lastStyle = this.style;
    }
    toRemove.forEach(c => this.element.classList.remove(c));
    // add new theme styles
    const toAdd = this.emberThemed.getThemeStyle(currentTheme, this.style);
    toAdd.forEach(c => this.element.classList.add(c));
  }

  didReceiveArguments() {
    this.updateTheme();
  }
}
