import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Heading, HStack, Link, Modal, VStack } from "@navikt/ds-react";
import { TasklistIcon } from "@navikt/aksel-icons";

export interface CookieConsentProps {
  /** The title shown in the cookie consent banner */
  title?: string;
  /** The message shown in the cookie consent banner */
  message?: string;
  /** The text for the accept button */
  acceptButtonText?: string;
  /** The text for the customize button */
  customizeButtonText?: string;
  /** Callback function when user accepts all cookies */
  onAccept?: () => void;
  /** Callback function when user customizes cookie preferences */
  onCustomize?: (preferences: CookiePreferences) => void;
  /** Initial cookie preferences */
  initialPreferences?: CookiePreferences;
  /** Privacy policy link */
  privacyPolicyUrl?: string;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const NovariCookieConsent: React.FC<CookieConsentProps> = ({
  title = "Cookie Preferences",
  message = "We use cookies to enhance your experience and improve our services.",
  acceptButtonText = "Accept All",
  customizeButtonText = "Customize",
  onAccept,
  onCustomize,
  initialPreferences = { necessary: true, analytics: false, marketing: false },
  privacyPolicyUrl = "#",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(initialPreferences);

  useEffect(() => {
    const hasConsent = localStorage.getItem("novari-cookie-consent");
    if (hasConsent) {
      setIsVisible(false);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("novari-cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
    onAccept?.();
  };

  const handleSavePreferences = () => {
    localStorage.setItem("novari-cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
    setShowCustomize(false);
    onCustomize?.(preferences);
  };

  if (!isVisible) return null;

  return (
    <>
      <Box
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "var(--novari-bg-default)",
          padding: "1rem",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <VStack gap="space-4" align="stretch">
          <HStack gap="space-2">
            <TasklistIcon aria-hidden fontSize="1.5rem" />
            <Heading size="small">{title}</Heading>
          </HStack>
          <Alert variant="info">{message}</Alert>
          <HStack gap="space-4" justify="end">
            <Button variant="secondary" onClick={() => setShowCustomize(true)}>
              {customizeButtonText}
            </Button>
            <Button variant="primary" onClick={handleAcceptAll}>
              {acceptButtonText}
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Modal
        open={showCustomize}
        onClose={() => setShowCustomize(false)}
        header={{ heading: "Cookie Settings" }}
      >
        <Modal.Body>
          <VStack gap="space-4">
            <Box padding="space-4" borderRadius="full" borderWidth="1">
              <Heading size="small">Necessary Cookies</Heading>
              <p>These cookies are required for basic site functionality and cannot be disabled.</p>
              <Button variant="primary" size="small" disabled>
                Always Active
              </Button>
            </Box>

            <Box padding="space-4" borderRadius="full" borderWidth="1">
              <Heading size="small">Analytics Cookies</Heading>
              <p>Help us improve our website by collecting and reporting usage information.</p>
              <Button
                variant={preferences.analytics ? "primary" : "secondary"}
                size="small"
                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
              >
                {preferences.analytics ? "Enabled" : "Disabled"}
              </Button>
            </Box>

            <Box padding="space-4" borderRadius="full" borderWidth="1">
              <Heading size="small">Marketing Cookies</Heading>
              <p>Used to track visitors across websites to display relevant advertisements.</p>
              <Button
                variant={preferences.marketing ? "primary" : "secondary"}
                size="small"
                onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                {preferences.marketing ? "Enabled" : "Disabled"}
              </Button>
            </Box>

            <Link href={privacyPolicyUrl} target="_blank">
              View Privacy Policy
            </Link>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NovariCookieConsent;