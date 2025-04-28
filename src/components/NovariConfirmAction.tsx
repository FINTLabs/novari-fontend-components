import React, { useState } from 'react';
import { Button, Modal, Heading } from '@navikt/ds-react';
import { 
    ExclamationmarkTriangleIcon,
    TrashIcon,
    EraserIcon,
    PersonCrossIcon,
    XMarkIcon,
    FolderMinusIcon 
} from '@navikt/aksel-icons';

const ICONS = {
    trash: <TrashIcon title="Delete" fontSize="1.5rem" />,
    eraser: <EraserIcon title="Erase" fontSize="1.5rem" />,
    personCross: <PersonCrossIcon title="Remove person" fontSize="1.5rem" />,
    xMark: <XMarkIcon title="Cancel" fontSize="1.5rem" />,
    folderMinus: <FolderMinusIcon title="Remove folder" fontSize="1.5rem" />
} as const;

type IconType = keyof typeof ICONS;

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
    /** Icon to show in the trigger button. Can be either a predefined icon name or a custom React node */
    icon?: IconType | React.ReactNode;
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
    icon = 'trash',
    confirmText = 'Ja, jeg er sikker',
    cancelText = 'Avbryt',
    modalTitle = 'Bekreftelse'
}) => {
    const [open, setOpen] = useState(false);

    const handleClose = (isConfirmed: boolean) => {
        setOpen(false);
        if (isConfirmed) onConfirm();
    };

    const getIcon = () => {
        if (typeof icon === 'string' && icon in ICONS) {
            return ICONS[icon as IconType];
        }
        return icon;
    };

    return (
        <>
            <Button
                variant={buttonVariant}
                icon={getIcon()}
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