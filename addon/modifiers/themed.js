import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ThemedModifier extends Modifier {
  @service emberThemed;

  get style() {
    return this.args.positional[0];
  }

  updateTheme() {
    const { currentTheme, lastTheme } = this.emberThemed;
    // remove old theme styles
    const toRemove = this.emberThemed.getThemeStyle(lastTheme, this.style);
    toRemove.forEach(c => this.element.classList.remove(c));
    // add new theme styles
    const toAdd = this.emberThemed.getThemeStyle(currentTheme, this.style);
    toAdd.forEach(c => this.element.classList.add(c));
  }

  didReceiveArguments() {
    this.updateTheme();
  }
}
