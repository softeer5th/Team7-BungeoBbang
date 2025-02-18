import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS, // ✅ 기본 제공되는 디바이스 목록 추가
        iphone14: {
          name: "iPhone 14",
          styles: {
            width: "390px",
            height: "844px",
          },
          type: "mobile",
        },
      },
      defaultViewport: "iphone14", // ✅ 기본 화면을 iPhone 14로 설정
    },
  },
};

export default preview;
