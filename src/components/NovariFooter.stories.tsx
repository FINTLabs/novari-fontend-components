import type { Meta, StoryObj } from "@storybook/react";
import { NovariFooter } from "./NovariFooter.tsx";

const meta = {
  title: "Novari/NovariFooter",
  component: NovariFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    links: [
      { label: "Driftsmeldinger", href: "https://novari.no/driftsmeldinger/" },
      { label: "Opprett supportsak", href: "http://support.novari.no" },
    ],
  },
  decorators: [
    (Story) => (
      // <Page footer={<Story />}>
      //     test
      // </Page>
      <Story />
    ),
  ],
} satisfies Meta<typeof NovariFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default NovariFooter Story
export const Default: Story = {};

// // NovariFooter with Light Background
// export const LightBackground: Story = {
//     args: {
//         backgroundColor: '#ffffff',
//     },
// };

// NovariFooter with Custom Links
export const CustomLinks: Story = {
  args: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Brukerhjelp", href: "http://fintlabs.no" },
      { label: "Ordliste", href: "/help" },
    ],
  },
};
