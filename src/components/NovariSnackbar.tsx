import { Alert, Heading } from '@navikt/ds-react';

export type NovariSnackbarVariant = 'info' | 'success' | 'warning' | 'error';
export type NovariSnackbarPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';

export interface NovariSnackbarItem {
    id: string;
    open?: boolean;
    message: string;
    variant?: NovariSnackbarVariant;
    header?: string;
}

export interface NovariSnackbar {
    autoHideDuration?: number;
    position?: NovariSnackbarPosition;
    className?: string;
    items: NovariSnackbarItem[];
    onCloseItem?: (id: string) => void;
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
    autoHideDuration = 4000,
    position = 'top-left',
    className = '',
    items,
    onCloseItem,
}: NovariSnackbar) => {
    // const [visible, setVisible] = useState(open);

    // // sync external `open` state
    // useEffect(() => {
    //     setVisible(open);
    // }, [open]);
    //
    // // auto-dismiss logic
    // useEffect(() => {
    //     if (visible && autoHideDuration) {
    //         const timer = setTimeout(() => {
    //             setVisible(false);
    //             onClose();
    //         }, autoHideDuration);
    //         return () => clearTimeout(timer);
    //     }
    // }, [visible, autoHideDuration, onClose]);

    // if (!visible) return null;
    //
    // const filterVisibleItems = (item: NovariSnackbarItem) => {
    //     return item.open;
    // };

    return (
        <div
            className={`fixed z-50 transition-all animate-fadeIn ${
                positionClasses[position]
            }  ${className}`}>
            {/*{items.map(*/}
            {/*    (item) =>*/}
            {/*        filterVisibleItems(item) && (*/}
            {/*            <>*/}
            {/*                <Alert*/}
            {/*                    key={item.id}*/}
            {/*                    variant={item.variant ?? 'info'}*/}
            {/*                    className={'relative mb-2'}*/}
            {/*                    closeButton*/}
            {/*                    onClose={() => onCloseItem?.(item.id)}>*/}
            {/*                    <div>*/}
            {/*                        {item.header && (*/}
            {/*                            <Heading spacing size="small" level="3">*/}
            {/*                                {item.header}*/}
            {/*                            </Heading>*/}
            {/*                        )}*/}
            {/*                        {item.message}*/}
            {/*                    </div>*/}
            {/*                </Alert>*/}
            {/*            </>*/}
            {/*        )*/}
            {/*)}*/}
            {items.map(
                (item) =>
                    item.open && (
                        <SnackbarItem
                            key={item.id}
                            item={item}
                            autoHideDuration={autoHideDuration}
                            onCloseItem={onCloseItem}
                        />
                    )
            )}
        </div>

        // <div
        //     className={`fixed z-50 transition-all animate-fadeIn ${
        //         positionClasses[position]
        //     }  ${className}`}
        //     id={id}>
        //     <Alert variant={variant} className="relative " closeButton onClose={onClose}>
        //         <div>
        //             {header && <div className="font-semibold mb-1">{header}</div>}
        //             {message}
        //         </div>
        //     </Alert>
        // </div>
    );
};

export default NovariSnackbar;

import { useEffect } from 'react';

interface SnackbarItemProps {
    item: NovariSnackbarItem;
    autoHideDuration: number;
    onCloseItem?: (id: string) => void;
}

const SnackbarItem = ({ item, autoHideDuration, onCloseItem }: SnackbarItemProps) => {
    useEffect(() => {
        if (!item.open) return;

        const timer = setTimeout(() => {
            onCloseItem?.(item.id);
        }, autoHideDuration);

        return () => clearTimeout(timer);
    }, [item.id, item.open, autoHideDuration, onCloseItem]);

    if (!item.open) return null;

    return (
        <Alert
            key={item.id}
            variant={item.variant ?? 'info'}
            className="relative mb-2"
            closeButton
            onClose={() => onCloseItem?.(item.id)}>
            <div>
                {item.header && (
                    <Heading spacing size="small" level="3">
                        {item.header}
                    </Heading>
                )}
                {item.message}
            </div>
        </Alert>
    );
};
