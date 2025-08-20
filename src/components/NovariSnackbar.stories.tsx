import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import NovariSnackbar, {
    NovariSnackbarItem,
    NovariSnackbarPosition,
    NovariSnackbarVariant,
} from './NovariSnackbar';
import { Button, HStack, VStack } from '@navikt/ds-react';

//TODO: Fix documentation, add useAlerts to this document also!!

const meta: Meta<typeof NovariSnackbar> = {
    title: 'Novari/NovariSnackbar',
    component: NovariSnackbar,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'A customizable snackbar component for displaying notifications.',
            },
        },
    },
    args: {
        autoHideDuration: 4000,
        position: 'top-right',
        className: '',
        items: [],
        size: 'small',
    },
    argTypes: {
        position: {
            description: 'The position of the snackbar on the screen.',
            control: 'select',
            type: 'string',
            options: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'top-center',
                'bottom-center',
            ],
        },
        autoHideDuration: {
            description:
                'The duration in milliseconds after which the snackbar automatically hides.',
            type: 'number',
            control: { type: 'number', min: 1000, step: 1000 },
        },
        className: {
            description: 'Additional CSS class for the snackbar.',
            control: 'text',
        },
        size: {
            description: 'The size of the snackbar.',
            type: 'string',
            control: 'select',
            options: ['small', 'medium'],
        },
        items: {
            description: 'The items to display in the snackbar.',
            control: 'object',
        },

        onCloseItem: {
            description:
                'Callback function when the snackbar is closed (useAlerts util will handle this automatically).',
            action: 'onCloseItem',
            type: 'function',
        },
    },
};

export default meta;
type Story = StoryObj<typeof NovariSnackbar>;

const Template = (args: any) => {
    const [items, setItems] = useState<NovariSnackbarItem[]>([]);

    const handleShow = (variant: NovariSnackbarVariant) => {
        const id = Math.random().toString();
        const newItem: NovariSnackbarItem = {
            id,
            // open: true,
            message: 'Dette er en testmelding with id: ' + id.slice(2, 9),
            variant: variant,
            header: args.header,
        };
        setItems((prev) => [...prev, newItem]);

        // // auto close logic
        // setTimeout(() => {
        //     setItems((prev) =>
        //         prev.map((item) => (item.id === id ? { ...item, open: false } : item))
        //     );
        // }, args.autoHideDuration ?? 4000);
    };

    const handleCloseItem = (id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, open: false } : item)));
    };

    return (
        <HStack gap="2" style={{ height: '50vh' }}>
            <VStack gap="2">
                <Button onClick={() => handleShow('info')}>Add Info</Button>
                <Button onClick={() => handleShow('warning')}>Add Warning</Button>
                <Button onClick={() => handleShow('error')}>Add Error</Button>
            </VStack>

            <NovariSnackbar
                {...args}
                items={items}
                onCloseItem={handleCloseItem}
                size={args.size}
            />
        </HStack>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        autoHideDuration: 4000,
        position: 'top-right' as NovariSnackbarPosition,
        className: '',
        items: [],
    },
};
