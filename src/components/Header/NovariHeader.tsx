import { Box, Button, Heading, HStack } from '@navikt/ds-react';
import { EnterIcon, LeaveIcon } from '@navikt/aksel-icons';
import { NovariIKS } from '../assets/NovariIKS';
import React from 'react';
import NovariMenuItem, { MenuItem } from './NovariMenuItem';

//TODO: Make a mobile version ?
export interface HeaderProps {
    /** Title to display in the header */
    appName: string;
    /** List of Menu items  */
    menu: MenuItem[];
    /** Is the user logged in? */
    isLoggedIn: boolean;
    /** Display name of the user */
    displayName?: string;
    /** Callback for when the user clicks on a menu item */
    onLogout: () => void;
    /** Callback for when the user clicks on a menu item */
    onLogin: () => void;
    /** Callback for when the user clicks on a menu item */
    onMenuClick: (action: string) => void;
    /** Should we show the logo and title? */
    showLogoWithTitle?: boolean;
    /** Extra child code to display in the header */
    children?: React.ReactNode;
}

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
}) => {
    return (
        <HStack
            gap="2"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'var(--ac-bg-subtle)',
                height: '52px',
                textAlign: 'center',
            }}>
            <HStack
                gap="2"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '32px',
                }}>
                {!appName ? (
                    <NovariIKS width="9em" />
                ) : (
                    <HStack
                        gap="2"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        {!appName ? (
                            <NovariIKS width="9em" />
                        ) : (
                            <HStack
                                gap="2"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                {showLogoWithTitle && <NovariIKS width="9em" />}
                                <Heading
                                    size="medium"
                                    style={{
                                        color: 'var(--ac-surface-alt-3-moderate)',
                                        paddingRight: '28px',
                                    }}>
                                    {appName}
                                </Heading>
                            </HStack>
                        )}
                    </HStack>
                )}
            </HStack>
            {isLoggedIn && (
                <HStack gap="2">
                    {menu.map((item, index) => (
                        // <NovariMenuItem key={index} item={item} index={index} onMenuClick={onMenuClick} />
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

            {/* RIGHT CLUSTER: push to the far right */}
            <div style={{ marginLeft: 'auto' }} />

            <HStack
                gap="2"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    // padding to match left side
                    paddingRight: '14px',
                }}>
                {/* injected content */}
                {isLoggedIn && children}

                {/* display name (now naturally inline, right after the selector) */}
                {isLoggedIn && displayName && (
                    <Box
                        as="span"
                        style={{
                            height: '52px',
                            lineHeight: '52px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}>
                        {displayName}
                    </Box>
                )}

                {isLoggedIn && onLogout && (
                    <Button
                        variant="tertiary"
                        title="logg ut"
                        icon={<LeaveIcon title="logg ut" fontSize="1.5rem" />}
                        onClick={onLogout}
                    />
                )}

                {/* login button */}
                {!isLoggedIn && onLogin && (
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
