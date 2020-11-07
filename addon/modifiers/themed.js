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
    if (this._lastStyle !== style) this._lastStyle = style;
    if (this._lastVariant !== variant) this._lastVariant = variant;
    if (this._lastTheme !== theme) this._lastTheme = theme;
    const fullLastStyle = _lastStyle ? `${_lastStyle}${_lastVariant ? '-' + _lastVariant : ''}` : null;
    const toRemove = this.emberThemed.getThemeStyle(_lastTheme, fullLastStyle);
    this.element.classList.remove(...toRemove);
    // add new theme styles
    const fullNewStyle = style ? `${style}${variant ? '-' + variant : ''}` : null;
    const toAdd = this.emberThemed.getThemeStyle(theme, fullNewStyle);
    this.element.classList.add(...toAdd);
  }

  didReceiveArguments() {
    this.updateTheme();
  }

  didInstall() {
    // use a mutation observer to re-add our classes if something else clobbers them
    this._mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(({ type, attributeName }) => {
        if (type === 'attributes' && attributeName === 'class') {
          const fullStyle = this.style ? `${this.style}${this.variant ? '-' + this.variant : ''}` : null;
          const classes = this.emberThemed.getThemeStyle(this.theme, fullStyle);
          if (!classes.every(c => this.element.classList.contains(c))) {
            this.element.classList.add(...classes);
          }
        }
      });
    });
    this._mutationObserver.observe(this.element, { attributes: true });
  }

  willRemove() {
    this._mutationObserver.disconnect();
  }
}
