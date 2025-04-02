import React from 'react';

import type { Preview } from "@storybook/react";
import "@navikt/ds-css";
import "../src/index.css";
import "../src/tailwind.css";
import "../src/styles/novari-theme.css";

const preview: Preview = {
  decorators: [
    (Story) => (
          <div data-theme="novari" >
            <Story />
          </div>
      )

  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
