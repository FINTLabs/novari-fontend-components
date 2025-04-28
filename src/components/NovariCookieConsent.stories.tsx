import type { Meta, StoryObj } from "@storybook/react";
import { NovariCookieConsent } from "./NovariCookieConsent";

const meta = {
  title: "Experimental-Novari/NovariCookieConsent",
  component: NovariCookieConsent,
  tags: ["autodocs","experimental"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A customizable cookie consent banner that allows users to manage their cookie preferences.",
      },
    },
  },
  args: {
    title: "Cookie Preferences",
    message: "We use cookies to enhance your experience and improve our services.",
    acceptButtonText: "Accept All",
    customizeButtonText: "Customize",
    privacyPolicyUrl: "https://example.com/privacy",
    onAccept: () => console.log("All cookies accepted"),
    onCustomize: (preferences) => console.log("Custom preferences:", preferences),
  },
} satisfies Meta<typeof NovariCookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    title: "Cookie Settings",
    message: "This website uses cookies to ensure you get the best experience.",
    acceptButtonText: "Accept Cookies",
    customizeButtonText: "Configure",
  },
};

export const WithInitialPreferences: Story = {
  args: {
    initialPreferences: {
      necessary: true,
      analytics: true,
      marketing: false,
    },
  },
};