import {useState} from 'react';
import {Button as AkselButton} from '@navikt/ds-react';

export interface ToggleButtonProps {
    label: string;
    selected?: boolean;
    onChange?: (selected: boolean) => void;
}

export const ToggleButton = ({ label, selected = false, onChange }: ToggleButtonProps) => {
    const [isSelected, setIsSelected] = useState(selected);

    const handleClick = () => {
        const newState = !isSelected;
        setIsSelected(newState);
        if (onChange) onChange(newState);
    };

    return (
        <AkselButton
            // variant="tertiary"
            size="small"
            onClick={handleClick}
            className={`transition-colors rounded-md px-4 py-2 font-medium ${
                isSelected
                    ? '!bg-[#6B133D] text-white hover:bg-[#500F2D]'
                    : '!bg-[#5A51E1] text-white hover:bg-[#4438C1]'
            }`}
            // className={"!bg-[#6B133D]"}
        >
            {label}
        </AkselButton>
    );
};
