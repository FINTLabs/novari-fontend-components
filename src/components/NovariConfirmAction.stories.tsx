import type { Meta, StoryObj } from '@storybook/react';
import { NovariConfirmAction } from './NovariConfirmAction';

const meta = {
    title: 'Components/NovariConfirmAction',
    component: NovariConfirmAction,
    tags: ['autodocs'],
    args: {
        buttonText: 'Slett',
        titleText: 'Slett element',
        subTitleText: 'Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.',
        onConfirm: () => console.log('Handling bekreftet'),
        showButtonText: true,
    },
    argTypes: {
        icon: {
            options: ['trash', 'eraser', 'personCross', 'xMark', 'folderMinus'],
            control: {
                type: 'select',
                labels: {
                    trash: 'Trash Icon',
                    eraser: 'Eraser Icon',
                    personCross: 'Person Cross Icon',
                    xMark: 'X Mark Icon',
                    folderMinus: 'Folder Minus Icon',
                },
            },
            description: 'Select the icon to display',
        },
        buttonVariant: {
            options: [
                'tertiary',
                'primary',
                'primary-neutral',
                'secondary',
                'secondary-neutral',
                'tertiary-neutral',
                'danger',
            ],
            control: 'select',
            description: 'Button style variant',
        },
        buttonSize: {
            options: ['xsmall', 'small', 'medium'],
            control: 'select',
            description: 'Size of the button',
        },
        showButtonText: {
            control: 'boolean',
            description: 'Show or hide button text',
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
A confirmation action component that shows a modal before executing the action.

### Usage
\`\`\`tsx
// Basic usage with default trash icon
<NovariConfirmAction
  buttonText="Slett"
  titleText="Slett element"
  subTitleText="Er du sikker på at du vil slette dette elementet?"
  onConfirm={() => handleDelete()}
/>

// Using a different predefined icon
<NovariConfirmAction
  icon="personCross"
  buttonText="Fjern bruker"
  titleText="Fjern bruker"
  subTitleText="Er du sikker på at du vil fjerne denne brukeren?"
  onConfirm={() => handleRemoveUser()}
/>

// Icon only button
<NovariConfirmAction
  icon="eraser"
  showButtonText={false}
  titleText="Slett data"
  subTitleText="Er du sikker på at du vil slette all data?"
  onConfirm={() => handleErase()}
/>
\`\`\`
        `,
            },
        },
    },
} satisfies Meta<typeof NovariConfirmAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: 'trash',
        buttonVariant: 'danger',
    },
};

export const TertiaryWithIcon: Story = {
    args: {
        icon: 'trash',
        buttonVariant: 'tertiary',
        buttonText: 'Slett element',
        titleText: 'Slett element',
        subTitleText: 'Er du sikker på at du vil slette dette elementet? Dette kan ikke angres.',
        confirmText: 'Ja, slett',
        cancelText: 'Avbryt',
        modalTitle: 'Bekreft sletting',
    },
};

export const IconOnly: Story = {
    args: {
        icon: 'trash',
        buttonVariant: 'tertiary',
        showButtonText: false,
        titleText: 'Slett element',
        subTitleText: 'Er du sikker på at du vil slette dette elementet?',
        confirmText: 'Ja, slett',
        cancelText: 'Avbryt',
    },
};

export const RemoveUser: Story = {
    args: {
        icon: 'personCross',
        buttonVariant: 'danger',
        buttonText: 'Fjern bruker',
        titleText: 'Fjern bruker',
        subTitleText: 'Er du sikker på at du vil fjerne denne brukeren?',
        confirmText: 'Ja, fjern bruker',
        cancelText: 'Avbryt',
        modalTitle: 'Bekreft fjerning av bruker',
    },
};

export const EraseData: Story = {
    args: {
        icon: 'eraser',
        buttonVariant: 'danger',
        buttonText: 'Slett data',
        titleText: 'Slett data',
        subTitleText: 'Er du sikker på at du vil slette all data? Dette kan ikke angres.',
        confirmText: 'Ja, slett data',
        cancelText: 'Avbryt',
        modalTitle: 'Bekreft sletting av data',
    },
};

export const RemoveFolder: Story = {
    args: {
        icon: 'folderMinus',
        buttonVariant: 'danger',
        buttonText: 'Slett mappe',
        titleText: 'Slett mappe',
        subTitleText: 'Er du sikker på at du vil slette denne mappen og alt innholdet?',
        confirmText: 'Ja, slett mappe',
        cancelText: 'Avbryt',
        modalTitle: 'Bekreft sletting av mappe',
    },
};

export const CancelAction: Story = {
    args: {
        icon: 'xMark',
        buttonVariant: 'secondary',
        buttonText: 'Avbryt handling',
        titleText: 'Avbryt handling',
        subTitleText: 'Er du sikker på at du vil avbryte denne handlingen?',
        confirmText: 'Ja, avbryt',
        cancelText: 'Nei, fortsett',
        modalTitle: 'Bekreft avbrytelse',
    },
};
