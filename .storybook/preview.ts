import type { Preview } from "@storybook/react";
import "@navikt/ds-css";
import '../src/index.css';
const preview: Preview = {
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
