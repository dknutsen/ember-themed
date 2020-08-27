const transition = 'transition-colors duration-500 ease-in-out';

const themes = {
  light: {
    default: `bg-white text-black ${transition}`,
    primary: `bg-blue-500 text-white ${transition}`,
  },
  dark: {
    default: `bg-gray-900 text-white ${transition}`,
    primary: `bg-blue-600 text-white ${transition}`,
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
  themes.light[`alert-${variant}`] = `bg-${color}-200 text-${color}-800 border border-${color}-500 ${transition}`;
  themes.dark[`alert-${variant}`] = `bg-${color}-800 text-${color}-200 border border-${color}-500 ${transition}`;
});

export default themes;
