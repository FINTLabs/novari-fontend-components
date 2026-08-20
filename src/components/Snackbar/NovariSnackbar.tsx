import { useMemo } from 'react';
import NovariToaster, {
    type NovariToasterItem,
    type NovariToasterPosition,
    type NovariToasterStatus,
} from '../Toaster/NovariToaster';

/** @deprecated Use `NovariToasterStatus` from `NovariToaster` instead. */
export type NovariSnackbarVariant = 'info' | 'success' | 'warning' | 'error';
/** @deprecated Use `NovariToasterPosition` from `NovariToaster` instead. */
export type NovariSnackbarPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';

export interface NovariSnackbarItem {
    id: string;
    open?: boolean; // optional signal; if explicitly false on props it will be removed
    show?: boolean; // eligible to be queued (default true)
    message: string;
    variant?: NovariSnackbarVariant;
    header?: string;
}

/** @deprecated Use `NovariToasterProps` and `NovariToaster` instead. */
export interface NovariSnackbarProps {
    /** Auto-close duration in ms */
    autoHideDuration?: number;
    /** Screen position */
    position?: NovariSnackbarPosition;
    /** Wrapper class */
    className?: string;
    /** Size of each alert */
    size?: 'small' | 'medium';
    /** New items to enqueue; the component owns lifecycle thereafter */
    items: NovariSnackbarItem[];
    /** Max concurrently visible alerts (default 3) */
    maxVisible?: number;
}

/** @deprecated Use `NovariToaster` instead. */
const NovariSnackbar = ({
    autoHideDuration = 4000,
    position = 'top-right',
    className = '',
    size = 'small',
    items,
    maxVisible = 3,
}: NovariSnackbarProps) => {
    const mappedItems = useMemo<NovariToasterItem[]>(
        () =>
            items.map((item) => ({
                id: item.id,
                open: item.open,
                show: item.show,
                message: item.message,
                status: (item.variant ?? 'info') as NovariToasterStatus,
                title: item.header,
            })),
        [items]
    );

    return (
        <NovariToaster
            autoHideDuration={autoHideDuration}
            position={position as NovariToasterPosition}
            className={className}
            size={size}
            items={mappedItems}
            maxVisible={maxVisible}
            role="status"
        />
    );
};

export default NovariSnackbar;
