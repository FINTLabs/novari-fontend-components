import { addons } from "@storybook/manager-api";
import NovariTheme from "./NovariTheme.js";

console.log('Manager.js is loading!');

addons.setConfig({
  theme: NovariTheme,
  sidebar: {
    showRoots: true,
    renderLabel: (item) => {
      const name = item.name || item.title;
      // Only add icon for root/component items that are experimental
      if (item.type === 'component' && item.tags?.includes('experimental')) {
        return `🧪 ${name}`;
      }
      return name;
    }
  }
});