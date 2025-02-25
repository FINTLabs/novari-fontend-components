import React, { useEffect } from "react";
import { Box, GuidePanel as NavGuidePanel } from "@navikt/ds-react";

interface GuidePanelProps {
  children: React.ReactNode;
  imageSrc?: string;
  altText?: string;
}

// TODO: This is forcing the novari theme, this is not the right way to do this

const GuidePanel: React.FC<GuidePanelProps> = ({
  children,
  imageSrc,
  altText = "Illustration",
}) => {
  useEffect(() => {
    document.body.setAttribute("data-theme", "novari"); // ✅ Set Novari theme
  }, []);
  return (
    <Box className="flex justify-between pl-3 items-center">
      <NavGuidePanel
        illustration={
          <img
            src={imageSrc}
            alt={altText}
            // style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          />
        }
      >
        {children}
      </NavGuidePanel>
    </Box>
  );
};

export default GuidePanel;
