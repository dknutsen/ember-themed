import generateVariants from 'ember-themed/utils/generate-variants';

const transition = 'transition-colors duration-1000 ease-in-out';

const variants = {
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  default: 'gray'
}

const themes = {
  light: {
    default: `bg-white text-black ${transition}`,
    code: `bg-gray-200 text-black ${transition}`,
    demo: `border-gray-600 ${transition}`,
    ...generateVariants('callout', variants, (color) => `bg-${color}-200 text-${color}-800 border-${color}-500 ${transition}`)
  },
  dark: {
    default: `bg-gray-900 text-white ${transition}`,
    code: `bg-gray-800 text-white ${transition}`,
    demo: `border-gray-400 ${transition}`,
    ...generateVariants('callout', variants, (color) => `bg-${color}-800 text-${color}-200 border-${color}-500 ${transition}`)
  }
};

export default themes;
