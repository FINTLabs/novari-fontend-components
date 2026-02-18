import React from "react";
import { Box, HStack, Link, Spacer } from "@navikt/ds-react";
import { NovariIKS } from "../logo/NovariIKS";
import NovariThemeSwitcher from "./ThemeSwitcher/NovariThemeSwitcher";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  links: FooterLink[];
  /** Show theme switcher (light/dark toggle). Requires ThemeProvider wrapper. */
  showThemeSwitcher?: boolean;
}

export const NovariFooter = ({ links, showThemeSwitcher = false }: FooterProps) => {
  return (
    <Box
      style={{
        padding: "2rem",
        marginTop: "2rem",
        textAlign: "center",
        backgroundColor: "var(--novari-magenta)"
      }}
    >
      <HStack gap="space-6" align="center" justify="center">
        <Link href="http://novari.no">
          <NovariIKS width={"9em"} aria-label="Novari logo" />
        </Link>

        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.href} style={{ color: "#FCF5ED" }}>
              {link.label}
            </Link>
            {index < links.length - 1 && <p style={{ color: "#FCF5ED" }}>|</p>}
          </React.Fragment>
        ))}
<Spacer />

        {showThemeSwitcher && <NovariThemeSwitcher />}
      </HStack>
    </Box>
  );
};

export default NovariFooter;
