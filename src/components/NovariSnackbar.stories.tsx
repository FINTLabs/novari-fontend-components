import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import NovariSnackbar, {
    NovariSnackbarItem,
    NovariSnackbarPosition,
    NovariSnackbarVariant,
} from './NovariSnackbar';
import { Button, HStack, VStack } from '@navikt/ds-react';

const meta: Meta<typeof NovariSnackbar> = {
    title: 'Novari/NovariSnackbar',
    component: NovariSnackbar,
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
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
            control: { type: 'number', min: 1000, step: 1000 },
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
            message: 'Dette er en testmelding',
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
        <HStack gap="2">
            <VStack gap="2">
                <Button onClick={() => handleShow('info')}>Add Info</Button>
                <Button onClick={() => handleShow('warning')}>Add Warning</Button>
                <Button onClick={() => handleShow('error')}>Add Error</Button>
            </VStack>

            <NovariSnackbar {...args} items={items} onCloseItem={handleCloseItem} />
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
