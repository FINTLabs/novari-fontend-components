import type { Meta, StoryObj } from '@storybook/react-vite';
import NovariSubHeader from './NovariSubHeader.tsx';
import { Box, Select } from '@navikt/ds-react';
import NovariHeader from './Header/NovariHeader.tsx';
// import {
//     BriefcaseIcon,
//     PadlockLockedIcon,
//     PersonCircleIcon,
//     PersonGroupIcon,
//     QuestionmarkCircleIcon,
// } from '@navikt/aksel-icons';

const meta = {
    title: 'Components/NovariSubHeader',
    component: NovariSubHeader,
    tags: ['autodocs'],
    parameters: {
        layout: 'Fullscreen',
        docs: {
            description: {
                component:
                    'A second header for the sub-pages that might need new navigation of their own. Looks' +
                    ' great directly underneath NovariHeader. The menu works just like the one in the main header.',
            },
        },
    },
    args: {
        appName: 'FintApp',
        width: '750px',
        menu: [
            ['Dashboard', '/'],
            ['Kontrakter', '/Kontrakter'],
            ['Hendelser', '/hendelser'],
            ['Konsumere', '/Konsumere'],
            ['ProviderError', '/providerFeil'],
        ],
    },
    decorators: [
        (Story) => (
            <Box>
                <Story />
                <div className="min-h-50"></div>
            </Box>
        ),
    ],
} satisfies Meta<typeof NovariSubHeader>;

const mockNovariHeader = () => (
    <NovariHeader
        showLogoWithTitle={true}
        menu={[]}
        appName={'FINT Kunde Portal'}
        onMenuClick={() => console.log('menu click')}
        onLogin={() => console.log('login')}
        isLoggedIn={true}
        onLogout={() => console.log('logout')}
        displayName={'Ola Nordmann'}>
        <Select hideLabel={true} label={'wdasdwadsd'} size={'small'} className={'p-2'}>
            <option value="">- Velg land -</option>
            <option value="norge">Norge</option>
            <option value="sverige">Sverige</option>
            <option value="danmark">Danmark</option>
        </Select>
    </NovariHeader>
);

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: '',
            },
        },
    },
};

export const withChild: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'The sub header is by default made up of two elements, the title and the menu, but You are' +
                    ' free to add more elements to it in the form of children. The component is built in such a way' +
                    ' that the elements take up the entire dedicated width with space between them.',
            },
        },
    },
    args: {
        menu: [
            ['Kontrakter', '/Kontrakter'],
            ['Hendelser', '/hendelser'],
            ['Konsumere', '/Konsumere'],
            ['ProviderError', '/providerFeil'],
        ],
        children: (
            <Select label="Velg bostedsland" hideLabel size="small" className="subHeader-select">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
        ),
    },
};

export const withNovariHeader: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Looks even better when it has the full width of a website. You are free to choose the width' +
                    " the elements of the sub header will fill. If you don't enter any width, the default was" +
                    ' selected to fit very well with an Aksel Page with gutters and width=lg.',
            },
        },
    },
    args: {
        menu: [
            ['Kontrakter', '/Kontrakter'],
            ['Hendelser', '/hendelser'],
            ['Konsumere', '/Konsumere'],
            ['ProviderError', '/providerFeil'],
        ],
        children: (
            <Select label="Velg bostedsland" hideLabel size="small" className="subHeader-select">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
        ),
    },
    decorators: [
        (Story) => (
            <Box>
                {mockNovariHeader()}
                <Story />
                <div className="min-h-50"></div>
            </Box>
        ),
    ],
};

export const withoutSpacer: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Looks even better when it has the full width of a website!',
            },
        },
    },
    args: {
        noSpacer: true,
        menu: [
            ['Kontrakter', '/Kontrakter'],
            ['Hendelser', '/hendelser'],
            ['Konsumere', '/Konsumere'],
            ['ProviderError', '/providerFeil'],
        ],
        children: (
            <Select label="Velg bostedsland" hideLabel size="small" className="subHeader-select">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
        ),
    },
    decorators: [
        (Story) => (
            <Box>
                {mockNovariHeader()}
                <Story />
                <div className="min-h-50"></div>
            </Box>
        ),
    ],
};

export const withoutAppName: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You of course have the option to not have an appName in the sub header.',
            },
        },
    },
    args: {
        appName: '',
        menu: [
            ['Dashboard', '/'],
            ['Kontrakter', '/Kontrakter'],
            ['Hendelser', '/hendelser'],
            ['Konsumere', '/Konsumere'],
            ['ProviderError', '/providerFeil'],
        ],
        children: (
            <Select label="Velg bostedsland" hideLabel size="small" className="subHeaderBg">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
        ),
    },
    decorators: [
        (Story) => (
            <Box>
                {mockNovariHeader()}
                <Story />
                <div className="min-h-50"></div>
            </Box>
        ),
    ],
};
