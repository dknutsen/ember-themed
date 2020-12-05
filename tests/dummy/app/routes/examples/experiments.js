import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';
import themes, { variants } from 'dummy/themes';
import generateVariants from 'ember-themed/utils/generate-variants';

const sizeVariants = { small: 8, medium: 16, large: 32 };
const transition = 'transition-all duration-1000 ease-in-out';
const extraThemes = {
  experiments: {
    default: `${transition}`,
    ...generateVariants('width', sizeVariants, (size) => `w-${size} ${transition}`),
    ...generateVariants('height', sizeVariants, (size) => `h-${size} ${transition}`),
    ...generateVariants('up', sizeVariants, (size) => `transform -translate-y-${size} ${transition}`),
    ...generateVariants('down', sizeVariants, (size) => `transform translate-y-${size} ${transition}`),
    ...generateVariants('left', sizeVariants, (size) => `transform -translate-x-${size} ${transition}`),
    ...generateVariants('right', sizeVariants, (size) => `transform translate-x-${size} ${transition}`)
  }
};

export default class PersistenceRoute extends Route {
  @service emberThemed;

  _themesToRestore = null;

  activate() {
    // setup "extra" themes for this route
    this._themesToRestore = this.emberThemed.themes;
    this.emberThemed.themes = new TrackedObject({ ...themes, ...extraThemes });
    this.emberThemed.sizeVariants = Object.keys(sizeVariants);
  }

  deactivate() {
    // reset themes back to application defaults
    this.emberThemed.themes = this._themesToRestore;
    delete this.emberThemed.sizeVariants;
  }
}

