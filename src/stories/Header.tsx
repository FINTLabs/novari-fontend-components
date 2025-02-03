// Header.tsx
import React from "react";
import { Button, HStack, Heading, ActionMenu, Box } from "@navikt/ds-react";
import { EnterIcon, LeaveIcon, ChevronDownIcon } from "@navikt/aksel-icons";

export interface HeaderProps {
  appName: string;
  menu: [string, string][] | [string, string];
  loggedIn: boolean;
  displayName?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  appName,
  menu,
  loggedIn,
  displayName,
  onLogout,
}) => {
  return (
    <Box className="flex justify-between bg-[#FCF5ED] pl-3 items-center">
      <HStack gap={"2"}>
        <Heading size={"medium"} className={"text-[#500F2D] pr-10"}>
          {appName}
        </Heading>
        {loggedIn && (
          <ActionMenu>
            <ActionMenu.Trigger>
              <Button
                size={"small"}
                variant="tertiary-neutral"
                icon={<ChevronDownIcon aria-hidden />}
                iconPosition="right"
              >
                Meny
              </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
              {menu.map(([label, action], index) => (
                <ActionMenu.Item
                  key={index}
                  onSelect={() => console.info(action)}
                >
                  {label}
                </ActionMenu.Item>
              ))}
            </ActionMenu.Content>
          </ActionMenu>
        )}
      </HStack>
      <HStack gap={"1"} className={"items-center"}>
        {displayName && loggedIn && (
          <>
            <span>{displayName}</span>
            <Button
              variant="tertiary"
              title="logg ut"
              icon={<LeaveIcon title="logg ut" fontSize="1.5rem" />}
              onClick={onLogout}
            ></Button>
          </>
        )}
        {!loggedIn && (
          <Button
            variant="tertiary"
            title="logg ut"
            icon={<EnterIcon title="logg ut" fontSize="1.5rem" />}
            onClick={onLogout}
            iconPosition="right"
          >
            Login
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Header;
