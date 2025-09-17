// menuData.tsx
import {
    QuestionmarkCircleIcon,
    PersonGroupIcon,
    BriefcaseIcon,
    PersonCircleIcon,
    PadlockLockedIcon,
} from '@navikt/aksel-icons';
import { MenuItem } from '../Header/NovariMenuItem';
import { Select } from '@navikt/ds-react';

export const extraChild = (
    <Select label="Velg bostedsland" hideLabel size="small" className="p-2">
        <option value="">- Velg land -</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
    </Select>
);

export const simpleMenu: MenuItem[] = [
    {
        label: 'Home',
        action: '/',
    },
    {
        label: 'Contact',
        action: '/contact',
    },
];

export const menuData: MenuItem[] = [
    {
        label: 'Home',
        action: '/',
    },
    {
        label: 'Main Sections',
        action: '',
        submenu: [
            {
                label: 'About',
                action: '/about',
                icon: <QuestionmarkCircleIcon title="a11y-title" fontSize="1.5rem" />,
                disabled: true,
            },
            {
                label: 'Team',
                action: '/team',
                icon: <PersonGroupIcon title="a11y-title" fontSize="1.5rem" />,
            },
            {
                label: 'Careers',
                action: '/careers',
                icon: <BriefcaseIcon title="a11y-title" fontSize="1.5rem" />,
            },
        ],
    },
    {
        label: 'Contact',
        action: '/contact',
    },
    {
        label: 'Settings',
        action: '',
        submenu: [
            {
                label: 'Profile',
                action: '/profile',
                icon: <PersonCircleIcon title="a11y-title" fontSize="1.5rem" />,
            },
            {
                label: 'Security',
                action: '/security',
                icon: <PadlockLockedIcon title="a11y-title" fontSize="1.5rem" />,
            },
        ],
    },
];
