import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

export default class ThemedModifier extends Modifier {
  @service emberThemed;

  updateTheme() {
    const { currentTheme, defaultTheme, themes } = this.emberThemed;
    const newTheme = themes[currentTheme] ? currentTheme : defaultTheme;
    const { add, remove } = themes[newTheme];
    remove.forEach(r => {
      const toRemove = [...this.element.classList].filter(c => c.includes(r));
      toRemove.forEach(c => this.element.classList.remove(c));
    });
    add.forEach(c => this.element.classList.add(c));
  }

  didReceiveArguments() {
    this.updateTheme();
  }
}
