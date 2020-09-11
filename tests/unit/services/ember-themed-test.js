import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | ember-themed', function(hooks) {
  setupTest(hooks);

  module('currentTheme', function() {
    test('it returns the default theme if no theme has been set', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.defaultTheme = 'default-theme';
      assert.ok(service.currentTheme, 'default-theme');
    });

    test('it returns the current theme if a theme has been set', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.defaultTheme = 'default-theme';
      service.setTheme('other');
      assert.ok(service.currentTheme, 'other');
    });
  });

  module('themeNames', function() {
    test('it returns the names of all defined themes', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.themes = {
        light: { default: 'no-op' },
        dark: { default: 'no-op' },
        rainbow: { default: 'no-op' }
      };
      assert.deepEqual(service.themeNames, ['light', 'dark', 'rainbow']);
    });
  });

  module('getTheme', function() {
    test('it returns empty object if no themes are defined', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.themes = null;
      assert.deepEqual(service.getTheme('not-a-theme'), { });
      service.themes = { };
      assert.deepEqual(service.getTheme('not-a-theme'), { });
    });

    test('it returns the theme with the given name', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.defaultTheme = 'light';
      service.themes = {
        light: { default: 'light-no-op' },
        dark: { default: 'dark-no-op' },
        rainbow: { default: 'rainbow-no-op' }
      };
      assert.deepEqual(service.getTheme('dark'), { default: 'dark-no-op' });
    });

    test('it returns the default theme if the theme requested does not exist', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.matchSystemTheme = false;
      service.defaultTheme = 'light';
      service.themes = {
        light: { default: 'light-no-op' },
        dark: { default: 'dark-no-op' },
        rainbow: { default: 'rainbow-no-op' }
      };
      assert.deepEqual(service.getTheme('not-a-real-theme'), { default: 'light-no-op' });
    });
  });

  module('getThemeStyle', function() {
    test('it returns the specified style', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.getTheme = () => {
        return { default: 'default-style', cooler: 'cooler-style' };
      };
      assert.equal(service.getThemeStyle('some-theme', 'default'), 'default-style');
      assert.equal(service.getThemeStyle('some-theme', 'cooler'), 'cooler-style');
    });

    test('it returns the default style if the provided style is not found', function(assert) {
      let service = this.owner.lookup('service:ember-themed');
      service.getTheme = () => {
        return { default: 'default-style', cooler: 'cooler-style' };
      };
      assert.equal(service.getThemeStyle('some-theme', 'coolest'), 'default-style');
    });
  });
});
