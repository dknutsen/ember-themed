import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';
import themes, { variants } from 'dummy/themes';
import generateVariants from 'ember-themed/utils/generate-variants';

const sizeVariants = { small: 8, medium: 16, large: 32 };
const transition = 'transition-all duration-500 ease-in-out';
const extraThemes = {
  experiments: {
    default: `${transition}`,
    ...generateVariants('width', sizeVariants, (size) => `w-${size} ${transition}`),
    ...generateVariants('height', sizeVariants, (size) => `h-${size} ${transition}`),
    ...generateVariants('up', sizeVariants, (size) => `transform -translate-y-${size} ${transition}`),
    ...generateVariants('down', sizeVariants, (size) => `transform translate-y-${size} ${transition}`),
    ...generateVariants('left', sizeVariants, (size) => `transform -translate-x-${size} ${transition}`),
    ...generateVariants('right', sizeVariants, (size) => `transform translate-x-${size} ${transition}`),
    'item-large': `w-64 h-32 mx-2 mt-4 relative items-end mb-12 ${transition}`,
    'item-small': `w-32 h-24 m-1 relative inline-block ${transition}`,
    'caption-large': `w-full h-12 bg-white flex items-center justify-center text-black -mb-12 ${transition}`,
    'caption-small': `absolute top-0 bottom-0 left-0 right-0 bg-white opacity-0 hover:opacity-100 flex items-center justify-center text-black ${transition}`
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

