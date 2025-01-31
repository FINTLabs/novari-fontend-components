import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { Box } from "@navikt/ds-react";

const meta = {
  title: "Novari/Header",
  component: Header,
  tags: ["autodocs"], // Enables automatic documentation in Storybook
  parameters: {
    layout: "fullscreen",
  },
  args: {
    appName: "FINTApp",
    menu: [
      ["FirstPage", "/page1"],
      ["SecondPage", "/page2"],
    ],
    loggedIn: true,
    displayName: "John Doe",
  },
  argTypes: {
    onLogout: { action: "onLogout" },
  },
  decorators: [
    (Story) => (
      // <Page header={<Story />}>
      //     test
      // </Page>
      <Box>
        <Story />
        <div className={"min-h-50"}></div>
      </Box>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Header Story
export const Default: Story = {};

// Header with Logged Out State
export const LoggedOut: Story = {
  args: {
    loggedIn: false,
    menu: ["Login", "/login"],
  },
};

// Header with Custom Menu
export const CustomMenu: Story = {
  args: {
    menu: [
      ["Home", "/"],
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Support", "http://fintlabs.no"],
      ["Glossary", "/help"],
    ],
  },
};
