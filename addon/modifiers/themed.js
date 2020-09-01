import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ThemedModifier extends Modifier {
  @service emberThemed;

  _lastTheme = null;
  _lastStyle = null;

  get style() {
    return this.args.positional[0];
  }

  get theme() {
    return this.args.named.theme || this.emberThemed.currentTheme;
  }

  updateTheme() {
    const { _lastTheme, _lastStyle, theme, style } = this;
    if (this._lastStyle !== style) {
      this._lastStyle = style;
    }
    if (this._lastTheme !== theme) {
      this._lastTheme = theme;
    }
    const toRemove = this.emberThemed.getThemeStyle(_lastTheme, _lastStyle);
    toRemove.forEach(c => this.element.classList.remove(c));
    // add new theme styles
    const toAdd = this.emberThemed.getThemeStyle(theme, style);
    toAdd.forEach(c => this.element.classList.add(c));
  }

  didReceiveArguments() {
    this.updateTheme();
  }
}
