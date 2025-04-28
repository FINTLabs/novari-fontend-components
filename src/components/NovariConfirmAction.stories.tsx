import type { Meta, StoryObj } from "@storybook/react";
import { NovariConfirmAction } from "./NovariConfirmAction";
import { TrashIcon, PencilIcon } from "@navikt/aksel-icons";

// Add this to help Storybook understand how to serialize the icon components
const iconDecorator = (Story: any) => {
  return <Story />;
};

const meta = {
  title: "Novari/NovariConfirmAction",
  component: NovariConfirmAction,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "En bekreftelsesdialog-komponent som krever brukerbekreftelse før en handling utføres.",
      },
      // Add this to control how icons are displayed in the docs
      source: {
        transform: (code: string) => {
          return code.replace(/<React.ForwardRef \/>/g, '<TrashIcon />');
        },
      },
    },
  },
  decorators: [iconDecorator],
  args: {
    buttonText: "Slett",
    titleText: "Slett element",
    subTitleText: "Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.",
    onConfirm: () => console.log("Handling bekreftet"),
    showButtonText: true,
  },
} satisfies Meta<typeof NovariConfirmAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DeleteButton: Story = {
  parameters: {
    docs: {
      source: {
        // Explicitly show TrashIcon in the code
        transform: (code: string) => {
          return code.replace(/<React.ForwardRef \/>/g, '<TrashIcon />');
        },
      },
    },
  },
  args: {
    buttonVariant: "danger",
    icon: <TrashIcon />,
    buttonText: "Slett element",
    titleText: "Slett element",
    subTitleText: "Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.",
    confirmText: "Ja, slett",
    cancelText: "Avbryt",
    modalTitle: "Bekreft sletting"
  },
};

export const EditButton: Story = {
  args: {
    buttonVariant: "secondary",
    icon: <PencilIcon />,
    buttonText: "Rediger element",
    titleText: "Rediger element",
    subTitleText: "Er du sikker på at du vil redigere dette elementet?",
    confirmText: "Ja, rediger",
    cancelText: "Avbryt",
    modalTitle: "Bekreft redigering"
  },
};

export const IconOnly: Story = {
  args: {
    icon: <TrashIcon />,
    showButtonText: false,
    buttonSize: "small",
    titleText: "Slett element",
    subTitleText: "Er du sikker på at du vil slette dette elementet?",
    confirmText: "Ja, slett",
    cancelText: "Avbryt",
    modalTitle: "Bekreft sletting"
  },
};

export const CustomTexts: Story = {
  args: {
    modalTitle: "Tilpasset bekreftelse",
    confirmText: "Fortsett",
    cancelText: "Gå tilbake",
    titleText: "Tilpasset handling",
    subTitleText: "Ønsker du å fortsette med denne handlingen?",
  },
};