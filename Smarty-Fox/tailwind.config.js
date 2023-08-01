const customDaisyUIConfig = require('./daisyui.config.js');

module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    extend: {},
  },
  daisyui: customDaisyUIConfig, // Import the custom DaisyUI theme configuration
  plugins: [require('daisyui')],
};
