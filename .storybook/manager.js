import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";
import NovariTheme from "./NovariTheme.js";

addons.setConfig({
  theme: NovariTheme,
});
