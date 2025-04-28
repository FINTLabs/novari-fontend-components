import type { Meta, StoryObj } from "@storybook/react";
import { NovariConfirmAction } from "./NovariConfirmAction";
import { 
  TrashIcon, 
  EraserIcon, 
  PersonCrossIcon, 
  XMarkIcon, 
  FolderMinusIcon 
} from "@navikt/aksel-icons";

// Define available icons with their components
const icons = {
  trash: <TrashIcon title="Delete" fontSize="1.5rem" />,
  eraser: <EraserIcon title="Erase" fontSize="1.5rem" />,
  personCross: <PersonCrossIcon title="Remove person" fontSize="1.5rem" />,
  xMark: <XMarkIcon title="Cancel" fontSize="1.5rem" />,
  folderMinus: <FolderMinusIcon title="Remove folder" fontSize="1.5rem" />
};

const meta = {
  title: "Novari/NovariConfirmAction",
  component: NovariConfirmAction,
  tags: ["autodocs"],
  args: {
    buttonText: "Slett",
    titleText: "Slett element",
    subTitleText: "Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.",
    onConfirm: () => console.log("Handling bekreftet"),
    showButtonText: true,
    icon: icons.trash
  },
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          trash: 'Trash Icon',
          eraser: 'Eraser Icon',
          personCross: 'Person Cross Icon',
          xMark: 'X Mark Icon',
          folderMinus: 'Folder Minus Icon'
        }
      }
    }
  }
} satisfies Meta<typeof NovariConfirmAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DeleteButton: Story = {
  args: {
    buttonVariant: "danger",
    icon: icons.trash,
    buttonText: "Slett element",
    titleText: "Slett element",
    subTitleText: "Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.",
    confirmText: "Ja, slett",
    cancelText: "Avbryt",
    modalTitle: "Bekreft sletting"
  }
};

export const IconOnly: Story = {
  args: {
    buttonVariant: "danger",
    icon: icons.trash,
    showButtonText: false,
    titleText: "Slett element",
    subTitleText: "Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.",
    confirmText: "Ja, slett",
    cancelText: "Avbryt",
    modalTitle: "Bekreft sletting"
  }
};

export const EraseButton: Story = {
  args: {
    buttonVariant: "danger",
    icon: icons.eraser,
    buttonText: "Slett data",
    titleText: "Slett data",
    subTitleText: "Er du sikker på at du vil slette all data? Dette kan ikke angres.",
    confirmText: "Ja, slett data",
    cancelText: "Avbryt",
    modalTitle: "Bekreft sletting av data"
  }
};

export const RemoveUserButton: Story = {
  args: {
    buttonVariant: "danger",
    icon: icons.personCross,
    buttonText: "Fjern bruker",
    titleText: "Fjern bruker",
    subTitleText: "Er du sikker på at du vil fjerne denne brukeren? Dette kan ikke angres.",
    confirmText: "Ja, fjern bruker",
    cancelText: "Avbryt",
    modalTitle: "Bekreft fjerning av bruker"
  }
};

export const RemoveFolderButton: Story = {
  args: {
    buttonVariant: "danger",
    icon: icons.folderMinus,
    buttonText: "Slett mappe",
    titleText: "Slett mappe",
    subTitleText: "Er du sikker på at du vil slette denne mappen og alt innholdet? Dette kan ikke angres.",
    confirmText: "Ja, slett mappe",
    cancelText: "Avbryt",
    modalTitle: "Bekreft sletting av mappe"
  }
};