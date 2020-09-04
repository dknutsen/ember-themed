import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ThemedModifier extends Modifier {
  @service emberThemed;

  _lastTheme = null;
  _lastStyle = null;
  _lastVariant = null;

  get style() {
    return this.args.positional[0];
  }

  get variant() {
    return this.args.positional[1];
  }

  get theme() {
    return this.args.named.theme || this.emberThemed.currentTheme;
  }

  updateTheme() {
    const { _lastTheme, _lastStyle, _lastVariant, theme, style, variant } = this;
    if (this._lastStyle !== style) {
      this._lastStyle = style;
    }
    if (this._lastVariant !== variant) {
      this._lastVariant = variant;
    }
    if (this._lastTheme !== theme) {
      this._lastTheme = theme;
    }
    const fullLastStyle = _lastStyle ? `${_lastStyle}${_lastVariant ? '-' + _lastVariant : ''}` : null;
    const toRemove = this.emberThemed.getThemeStyle(_lastTheme, fullLastStyle);
    toRemove.forEach(c => this.element.classList.remove(c));
    // add new theme styles
    const fullNewStyle = style ? `${style}${variant ? '-' + variant : ''}` : null;
    const toAdd = this.emberThemed.getThemeStyle(theme, fullNewStyle);
    toAdd.forEach(c => this.element.classList.add(c));
  }

  didReceiveArguments() {
    this.updateTheme();
  }
}
