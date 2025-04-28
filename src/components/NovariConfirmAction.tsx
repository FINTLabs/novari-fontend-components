import React, { useState } from 'react';
import { Button, Modal, Heading } from '@navikt/ds-react';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';

export interface NovariConfirmActionProps {
    /** Text to display on the trigger button */
    buttonText?: string;
    /** Main title text in the confirmation modal */
    titleText?: string;
    /** Whether to show the button text or just the icon */
    showButtonText?: boolean;
    /** Subtitle/description text in the confirmation modal */
    subTitleText: string;
    /** Callback function when action is confirmed */
    onConfirm: () => void;
    /** Size of the trigger button */
    buttonSize?: 'xsmall' | 'small' | 'medium';
    /** Visual style variant of the trigger button */
    buttonVariant?: 'tertiary' | 'primary' | 'primary-neutral' | 'secondary' | 'secondary-neutral' | 'tertiary-neutral' | 'danger';
    /** Optional icon to show in the trigger button */
    icon?: React.ReactNode;
    /** Text for confirm button */
    confirmText?: string;
    /** Text for cancel button */
    cancelText?: string;
    /** Modal title */
    modalTitle?: string;
}

export const NovariConfirmAction: React.FC<NovariConfirmActionProps> = ({
    buttonText = 'Slett',
    showButtonText = true,
    titleText = 'Er du sikker?',
    onConfirm,
    subTitleText,
    buttonSize = 'xsmall',
    buttonVariant = 'tertiary',
    icon,
    confirmText = 'Ja, jeg er sikker',
    cancelText = 'Avbryt',
    modalTitle = 'Bekreftelse'
}) => {
    const [open, setOpen] = useState(false);

    const handleClose = (isConfirmed: boolean) => {
        setOpen(false);
        if (isConfirmed) onConfirm();
    };

    return (
        <>
            <Button
                variant={buttonVariant}
                icon={icon}
                size={buttonSize}
                onClick={() => setOpen(true)}
            >
                {showButtonText ? buttonText : ''}
            </Button>

            <Modal
                open={open}
                header={{
                    heading: modalTitle,
                    size: 'small',
                    icon: <ExclamationmarkTriangleIcon />
                }}
                width="small"
                onClose={() => handleClose(false)}
            >
                <Modal.Body>
                    <Heading size="small">{titleText}</Heading>
                    {subTitleText}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="danger"
                        onClick={() => handleClose(true)}
                        size="small"
                    >
                        {confirmText}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleClose(false)}
                        size="small"
                    >
                        {cancelText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NovariConfirmAction;