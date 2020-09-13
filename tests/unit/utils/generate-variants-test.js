import generateVariants from 'ember-themed/utils/generate-variants';
import { module, test } from 'qunit';

module('Unit | Utility | generate-variants', function() {
  test('it returns the correct variants given valid arguments', function(assert) {
    const transitions = 'transition-smooth';
    const style = 'car';
    const variants = {
      speedy: 'blue',
      rusty: 'red',
      loud: 'yellow',
      stealthy: 'black',
      dirty: 'white'
    };
    const interpolator = (color) => `${color}-border ${color}-background ${color}-mask white-text ${transitions}`;
    assert.deepEqual(generateVariants(style, variants, interpolator), {
      'car-speedy': 'blue-border blue-background blue-mask white-text transition-smooth',
      'car-rusty': 'red-border red-background red-mask white-text transition-smooth',
      'car-loud': 'yellow-border yellow-background yellow-mask white-text transition-smooth',
      'car-stealthy': 'black-border black-background black-mask white-text transition-smooth',
      'car-dirty': 'white-border white-background white-mask white-text transition-smooth',
    });
  });
});
