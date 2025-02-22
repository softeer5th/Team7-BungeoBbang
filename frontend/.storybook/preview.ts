import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      backgrounds: {
        values: [{ name: "gray", value: "#F4F4F4" }],
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
      },
      defaultViewport: "iphonex",
    },
  },
};

export default preview;
