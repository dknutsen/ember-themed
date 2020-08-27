const themes = {
  light: {
    default: 'bg-white text-black transition duration-500 ease-in-out',
    primary: 'bg-blue-500 text-white transition duration-500 ease-in-out',
  },
  dark: {
    default: 'bg-gray-900 text-white transition duration-500 ease-in-out',
    primary: 'bg-blue-600 text-white transition duration-500 ease-in-out',
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
  themes.light[`alert-${variant}`] = `bg-${color}-200 text-${color}-800 border border-${color}-500`;
  themes.dark[`alert-${variant}`] = `bg-${color}-400 text-${color}-900 border border-${color}-700`;
});

export default themes;
