import { Box, Button, Heading, HStack } from '@navikt/ds-react';
import { EnterIcon, LeaveIcon } from '@navikt/aksel-icons';
import React from 'react';
import { NovariIKS } from '../assets/NovariIKS';
import NovariMenuItem, { MenuItem } from './NovariMenuItem';

export interface HeaderProps {
    appName?: string;
    menu: MenuItem[];
    isLoggedIn: boolean;
    displayName?: string;

    onLogout: () => void;
    onLogin: () => void;
    onMenuClick: (action: string) => void;

    showLogoWithTitle?: boolean;
    children?: React.ReactNode;

    /** Let consumers theme via CSS */
    className?: string;
    style?: React.CSSProperties;
}

const HEADER_HEIGHT = '52px';
const HEADER_PADDING_INLINE = 'space-16';

const NovariHeader: React.FC<HeaderProps> = ({
    appName,
    menu,
    isLoggedIn,
    displayName,
    onLogout,
    onLogin,
    onMenuClick,
    showLogoWithTitle = false,
    children,
    className,
    style,
}) => {
    return (
        <HStack
            className={className}
            style={style}
            gap="space-6"
            align="center"
            justify="space-between"
            paddingInline={HEADER_PADDING_INLINE}
            height={HEADER_HEIGHT}
            wrap={false}>
            {/* LEFT: logo + title + menu */}
            <HStack gap="space-6" align="center" wrap={false}>
                <HStack gap="space-2" align="center" wrap={false}>
                    {(showLogoWithTitle || !appName) && <NovariIKS width="9em" />}
                    {appName && (
                        <Heading size="medium" className="novari-header-title">
                            {appName}
                        </Heading>
                    )}
                </HStack>

                {isLoggedIn && menu.length > 0 && (
                    <HStack
                        gap="space-2"
                        align="center"
                        wrap={false}
                        className="novari-header-menu">
                        {menu.map((item, index) => (
                            <NovariMenuItem
                                key={index}
                                label={item.label}
                                icon={item.icon}
                                disabled={item.disabled}
                                action={item.action}
                                submenu={item.submenu}
                                onMenuClick={onMenuClick}
                            />
                        ))}
                    </HStack>
                )}
            </HStack>

            {/* RIGHT: injected content + user + auth buttons */}
            <HStack gap="space-2" align="center" wrap={false}>
                {isLoggedIn && children}

                {isLoggedIn && displayName && (
                    <Box as="span" className="novari-header-user" style={{ whiteSpace: 'nowrap' }}>
                        {displayName}
                    </Box>
                )}

                {isLoggedIn ? (
                    <Button
                        variant="tertiary"
                        title="logg ut"
                        icon={<LeaveIcon title="logg ut" fontSize="1.5rem" />}
                        onClick={onLogout}
                    />
                ) : (
                    <Button
                        variant="tertiary"
                        title="logg inn"
                        icon={<EnterIcon title="logg inn" fontSize="1.5rem" />}
                        onClick={onLogin}
                        iconPosition="right">
                        Login
                    </Button>
                )}
            </HStack>
        </HStack>
    );
};

export default NovariHeader;
