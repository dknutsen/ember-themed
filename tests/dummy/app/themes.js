import generateVariants from 'ember-themed/utils/generate-variants';

export const transition = 'transition-colors duration-1000 ease-in-out';

export const variants = {
  default: 'gray',
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red'
}

const themes = {
  light: {
    default: `bg-white text-black ${transition}`,
    code: `bg-gray-200 text-black ${transition}`,
    demo: `border-gray-600 ${transition}`,
    select: `bg-white text-black border-gray-400 ${transition}`,
    ...generateVariants('colored', variants, (color) => `bg-${color}-200 text-${color}-800 ${transition}`),
    ...generateVariants('bordered', variants, (color) => `border-${color}-200 ${transition}`),
    ...generateVariants('callout', variants, (color) => `bg-${color}-200 text-${color}-800 border-${color}-500 ${transition}`),
    ...generateVariants('button', variants, (color) => `bg-${color}-500 text-white hover:bg-${color}-700 ${transition}`),
    ...generateVariants('button-outline', variants, (color) => `hover:bg-${color}-500 text-${color}-700 hover:text-white border-${color}-500 ${transition}`),
  },
  dark: {
    default: `bg-gray-900 text-white ${transition}`,
    code: `bg-gray-800 text-white ${transition}`,
    demo: `border-gray-400 ${transition}`,
    select: `bg-gray-900 text-white border-gray-700 ${transition}`,
    ...generateVariants('colored', variants, (color) => `bg-${color}-800 text-${color}-200 ${transition}`),
    ...generateVariants('bordered', variants, (color) => `border-${color}-800 ${transition}`),
    ...generateVariants('callout', variants, (color) => `bg-${color}-800 text-${color}-200 border-${color}-500 ${transition}`),
    ...generateVariants('button', variants, (color) => `bg-${color}-700 text-white hover:bg-${color}-800 ${transition}`),
    ...generateVariants('button-outline', variants, (color) => `hover:bg-${color}-700 text-${color}-100 hover:text-white border-${color}-700 ${transition}`),
  }
};

export default themes;
