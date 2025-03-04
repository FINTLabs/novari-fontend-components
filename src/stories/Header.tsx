import React, { useEffect } from "react";
import {
  Button,
  HStack,
  Heading,
  ActionMenu,
  Box,
  VStack,
} from "@navikt/ds-react";
import { EnterIcon, LeaveIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { NovariIKS } from "../logo/NovariIKS";

export interface HeaderProps {
  appName: string;
  menu: ({ label?: string; items: [string, string][] } | [string, string])[];
  loggedIn: boolean;
  displayName?: string;
  onLogout?: () => void;
  showLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  appName,
  menu,
  loggedIn,
  displayName,
  onLogout,
  showLogo = true,
}) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "novari");
  }, []);

  return (
    <VStack gap="2" className="bg-[#FCF5ED]">
      <Box className="flex justify-between bg-[#FCF5ED] pl-3 items-center">
        <HStack gap="2">
          <HStack gap="2">
            {showLogo ? (
              <NovariIKS width="9em" />
            ) : (
              <Heading size="medium" className="text-[#500F2D] pr-10">
                {appName}
              </Heading>
            )}
          </HStack>

          {loggedIn && (
            <HStack gap="2">
              {menu.map((menuItem, index) => {
                if (Array.isArray(menuItem)) {
                  // If menuItem is a single [label, action], render a Button
                  const [label, action] = menuItem;
                  return (
                    <Button
                      key={index}
                      size="small"
                      variant="tertiary-neutral"
                      onClick={() => console.info(action)}
                    >
                      {label}
                    </Button>
                  );
                } else {
                  // If menuItem is an object with a dropdown label, render an ActionMenu
                  return (
                    <ActionMenu key={index}>
                      <ActionMenu.Trigger>
                        <Button
                          size="small"
                          variant="tertiary-neutral"
                          icon={<ChevronDownIcon aria-hidden />}
                          iconPosition="right"
                        >
                          {menuItem.label ?? `Meny ${index + 1}`}
                        </Button>
                      </ActionMenu.Trigger>
                      <ActionMenu.Content>
                        {menuItem.items.map(([label, action], i) => (
                          <ActionMenu.Item
                            key={i}
                            onSelect={() => console.info(action)}
                          >
                            {label}
                          </ActionMenu.Item>
                        ))}
                      </ActionMenu.Content>
                    </ActionMenu>
                  );
                }
              })}
            </HStack>
          )}
        </HStack>

        <HStack gap="1" className="items-center">
          {displayName && loggedIn && (
            <>
              <span>{displayName}</span>
              <Button
                variant="tertiary"
                title="logg ut"
                icon={<LeaveIcon title="logg ut" fontSize="1.5rem" />}
                onClick={onLogout}
              />
            </>
          )}
          {!loggedIn && (
            <Button
              variant="tertiary"
              title="logg inn"
              icon={<EnterIcon title="logg inn" fontSize="1.5rem" />}
              onClick={onLogout}
              iconPosition="right"
            >
              Login
            </Button>
          )}
        </HStack>
      </Box>
    </VStack>
  );
};

export default Header;
