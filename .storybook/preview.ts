import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../packages/button/src/styles/globals.css';

const customViewports = {
  mobile: {
    name: 'Mobile（375）',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  mobileLarge: {
    name: 'Mobile (481 sm)',
    styles: {
      width: '480px',
      height: '800px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet（769 md）',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  laptop: {
    name: 'Laptop（1024 lg）',
    styles: {
      width: '1024px',
      height: '768px',
    },
    type: 'desktop',
  },
  desktop: {
    name: 'Desktop（1440 xl）',
    styles: {
      width: '1440px',
      height: '900px',
    },
    type: 'desktop',
  },
  largeDesktop: {
    name: 'Large Desktop（1920 2xl）',
    styles: {
      width: '1920px',
      height: '1080px',
    },
    type: 'desktop',
  },
  // 保留默认的 viewports
  ...INITIAL_VIEWPORTS,
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
      defaultViewport: 'responsive',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // 获取当前主题
      const theme = context.globals.theme;
      
      // 更新 HTML 类
      const htmlElement = document.documentElement;
      htmlElement.classList.remove('light', 'dark');
      htmlElement.classList.add(theme);

      return Story();
    },
  ],
};

export default preview;
