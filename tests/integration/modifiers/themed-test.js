import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ThemedService from 'ember-themed/services/ember-themed';

class ThemedStub extends ThemedService {
  defaultTheme = 'light';
  themes = {
    light: {
      default: 'something else',
      branded: 'brand-color brand-text'
    }
  };
}

module('Integration | Modifier | themed', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(assert) {
    this.owner.register('service:ember-themed', ThemedStub);
  });

  test('it applies the current theme default style when no arguments are provided', async function(assert) {
    await render(hbs`<div {{themed}}></div>`);
    assert.dom('div').hasClass('something');
    assert.dom('div').hasClass('else');
  });
});
