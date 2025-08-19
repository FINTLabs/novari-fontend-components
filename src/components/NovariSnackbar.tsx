import { useEffect, useState } from 'react';
import { Alert } from '@navikt/ds-react';

export type NovariSnackbarVariant = 'info' | 'success' | 'warning' | 'error';
export type NovariSnackbarPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';

export interface NovariSnackbarProps {
    open: boolean;
    onClose: () => void;
    message: string;
    autoHideDuration?: number;
    variant?: NovariSnackbarVariant;
    position?: NovariSnackbarPosition;
    header?: string;
    className?: string;
}

const positionClasses: Record<NovariSnackbarPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

const NovariSnackbar = ({
    open,
    onClose,
    message,
    autoHideDuration = 4000,
    variant = 'info',
    position = 'top-left',
    header,
    className = '',
}: NovariSnackbarProps) => {
    const [visible, setVisible] = useState(open);

    // sync external `open` state
    useEffect(() => {
        setVisible(open);
    }, [open]);

    // auto-dismiss logic
    useEffect(() => {
        if (visible && autoHideDuration) {
            const timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [visible, autoHideDuration, onClose]);

    if (!visible) return null;

    return (
        <div
            className={`fixed z-50 transition-all animate-fadeIn ${
                positionClasses[position]
            }  ${className}`}>
            <Alert variant={variant} className="relative " closeButton onClose={onClose}>
                <div>
                    {header && <div className="font-semibold mb-1">{header}</div>}
                    {message}
                </div>
            </Alert>
        </div>
    );
};

export default NovariSnackbar;
