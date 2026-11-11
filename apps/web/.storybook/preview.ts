import './preview.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
