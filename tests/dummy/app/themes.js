const transition = 'transition-colors duration-1000 ease-in-out';

const themes = {
  light: {
    default: `bg-white text-black ${transition}`,
    code: `bg-gray-200 text-black ${transition}`,
  },
  dark: {
    default: `bg-gray-900 text-white ${transition}`,
    code: `bg-gray-800 text-white ${transition}`,
  }
};

const variants = {
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  default: 'gray'
}
Object.keys(variants).forEach(variant => {
  const color = variants[variant];
  // alerts
  themes.light[`alert-${variant}`] = `bg-${color}-200 text-${color}-800 border border-${color}-500 ${transition}`;
  themes.dark[`alert-${variant}`] = `bg-${color}-800 text-${color}-200 border border-${color}-500 ${transition}`;
  // callouts
  themes.light[`callout-${variant}`] = `bg-${color}-200 text-${color}-800 border-l-4 border-${color}-500 ${transition}`;
  themes.dark[`callout-${variant}`] = `bg-${color}-800 text-${color}-200 border-l-4 border-${color}-500 ${transition}`;
});

export default themes;
