import React from 'react';
import { Button, ActionMenu } from '@navikt/ds-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';

export interface MenuItem {
    /** Text to display */
    label: string;
    /** Icon to display */
    icon?: React.ReactNode;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** String to identify the item, sent to onMenuClick callback */
    action: string;
    /** Submenu items */
    submenu?: MenuItem[];
}

interface MenuItemProps extends MenuItem {
    /** @ignore */
    onMenuClick: (action: string) => void;
}
//TODO: fix action on the button to use the onMenuClick function

const MenuItemComponent: React.FC<MenuItemProps> = ({
    label,
    icon,
    disabled,
    action,
    submenu,
    onMenuClick,
}) => {
    if (submenu && submenu.length > 0) {
        return (
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button
                        size="small"
                        variant="tertiary-neutral"
                        icon={<ChevronDownIcon aria-hidden />}
                        iconPosition="right">
                        {label}
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    {submenu.map((sub, i) => (
                        <ActionMenu.Item
                            key={i}
                            onSelect={sub.disabled ? undefined : () => onMenuClick?.(sub.action)}
                            // onClick={sub.action}
                            disabled={sub.disabled}
                            icon={sub.icon}>
                            {sub.label}
                        </ActionMenu.Item>
                    ))}
                </ActionMenu.Content>
            </ActionMenu>
        );
    }

    return (
        <Button
            size="small"
            variant="tertiary-neutral"
            disabled={disabled}
            onClick={() => onMenuClick(action)}
            icon={icon}>
            {label}
        </Button>
    );
};

export default MenuItemComponent;
