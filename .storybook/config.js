import { configure } from '@storybook/react';

const requireContext = require.context('../source/scripts', true, /\.story\.js$/)

function loadStories() {
  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
