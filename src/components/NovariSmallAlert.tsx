import { Alert, BodyShort } from "@navikt/ds-react";

export interface SmallAlertProps {
  id: string;
  message: string;
  header?: string;
  variant: "error" | "info" | "warning" | "success";
  onClose?: () => void;
}

export const NovariSmallAlert = ({
  id,
  message,
  header,
  variant,
  onClose,
}: SmallAlertProps) => {
  return (
    <Alert
      key={id}
      variant={variant}
      closeButton
      size="small"
      onClose={onClose}
    >
      {header && (
        <BodyShort size="small" style={{ fontWeight: "bold" }}>
          {header}
        </BodyShort>
      )}
      <BodyShort size="small">{message}</BodyShort>
    </Alert>
  );
};
