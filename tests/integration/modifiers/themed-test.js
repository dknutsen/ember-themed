import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ThemedService from 'ember-themed/services/ember-themed';

class ThemedStub extends ThemedService {
  defaultTheme = 'light';
  matchSystemTheme = false;
  themes = {
    light: {
      default: 'something light',
      branded: 'light-brand-color light-brand-text',
      'card-red': 'header-light-red border-light-red',
      'card-blue': 'header-light-blue border-light-blue',
    },
    dark: {
      default: 'something-else dark',
      branded: 'dark-brand-color dark-brand-text',
      'card-red': 'header-dark-red border-dark-red',
      'card-blue': 'header-dark-blue border-dark-blue',
    }
  };
}

// asserts the the given element only has the classes for the given theme/style/variant combo, and nothing more
const onlyHasStyle = function(assert, element, service, theme, style, variant = '') {
  const fullStyleName = [style, variant].filter(a=>a).join('-');
  const styleClasses = service.getThemeStyle(theme, fullStyleName);
  styleClasses.forEach(classToHave => {
    assert.dom(element).hasClass(classToHave);
  });
  const notStyleClasses = service.themeNames.reduce((notClasses, themeName) => {
    Object.keys(service.themes[themeName]).forEach(styleName => {
      if (theme !== themeName || fullStyleName !== styleName) {
        notClasses = `${notClasses} ${service.getThemeStyle(themeName, styleName).join(' ')}`;
      }
    });
    return notClasses;
  }, '');
  notStyleClasses.split(' ').forEach(classNotToHave => {
    assert.dom(element).doesNotHaveClass(classNotToHave);
  });
}

module('Integration | Modifier | themed', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:ember-themed', ThemedStub);
  });

  test('it applies the current theme default style when no arguments are provided', async function(assert) {
    await render(hbs`<div id="modified" {{themed}}></div>`);
    this.emberThemed = this.owner.lookup('service:ember-themed');

    // assert applying style works as expected
    onlyHasStyle(assert, '#modified', this.emberThemed, 'light', 'default');

    this.emberThemed.setTheme('dark');
    await settled();

    // assert applying default style from new theme works as expected
    onlyHasStyle(assert, '#modified', this.emberThemed, 'dark', 'default');
  });

  test('it applies the specified style when a style is provided/changed', async function(assert) {
    this.set('currentStyle', 'branded');
    await render(hbs`<div id="modified" {{themed this.currentStyle}}></div>`);
    this.emberThemed = this.owner.lookup('service:ember-themed');

    // assert applying style works as expected
    onlyHasStyle(assert, '#modified', this.emberThemed, 'light', 'branded');

    this.emberThemed.setTheme('dark');
    await settled();

    // assert changing theme changes to the specific style in the new theme
    onlyHasStyle(assert, '#modified', this.emberThemed, 'dark', 'branded');

    this.set('currentStyle', 'card-blue');
    await settled();

    // assert changing style changes to the new style in the current theme
    onlyHasStyle(assert, '#modified', this.emberThemed, 'dark', 'card-blue');
  });

  test('it applies the specified style when a style and variant are provided', async function(assert) {
    this.set('currentVariant', 'red');
    await render(hbs`<div id="modified" {{themed "card" this.currentVariant}}></div>`);
    this.emberThemed = this.owner.lookup('service:ember-themed');

    // assert applying style with variant works as expected
    onlyHasStyle(assert, '#modified', this.emberThemed, 'light', 'card', 'red');

    this.emberThemed.setTheme('dark');
    await settled();

    // assert changing theme changes to the specific style/variant in the new theme
    onlyHasStyle(assert, '#modified', this.emberThemed, 'dark', 'card', 'red');

    this.set('currentVariant', 'blue');
    await settled();

    // assert changing variant changes to the new style/variant in the current theme
    onlyHasStyle(assert, '#modified', this.emberThemed, 'dark', 'card-blue');
  });

  test('it allows overriding theme on a per-instance basis', async function(assert) {
    await render(hbs`<div id="modified" {{themed "card" "red" theme="dark"}}></div>`);
    this.emberThemed = this.owner.lookup('service:ember-themed');

    this.emberThemed.setTheme('light');

    // assert applying style with variant works as expected
    onlyHasStyle(assert, '#modified', this.emberThemed, 'dark', 'card', 'red');
  });

  test('modifying css classes on the element does not clobber the theme classes', async function(assert) {
    await render(hbs`<div id="modified" class={{this.extraClass}} {{themed "branded"}}></div>`);
    this.emberThemed = this.owner.lookup('service:ember-themed');

    this.set('extraClass', 'new-class');
    await settled();

    ['new-class', 'light-brand-color', 'light-brand-text'].forEach(className => {
      assert.dom('#modified').hasClass(className);
    });
  });
});
