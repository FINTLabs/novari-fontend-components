import React, { useState } from 'react';
import { DatePicker, TextField, VStack, useDatepicker } from '@navikt/ds-react';
import { format, parse } from 'date-fns';

export interface DateTimeProps {
    /** Label for the date field */
    dateLabel?: string;
    /** Label for the time field */
    timeLabel?: string;
    /** Initial date value */
    initialDate?: Date;
    /** Callback when date or time changes */
    onChange?: (dateTime: Date | null) => void;
    /** Whether the fields are required */
    required?: boolean;
    /** Error message to display */
    error?: string;
    /** Whether the fields are disabled */
    disabled?: boolean;
}

export const NovariDateTime: React.FC<DateTimeProps> = ({
    dateLabel = 'Dato',
    timeLabel = 'Tidspunkt',
    initialDate,
    onChange,
    required = false,
    error,
    disabled = false,
}) => {
    const [time, setTime] = useState<string>(
        initialDate ? format(initialDate, 'HH:mm') : ''
    );

    const year = new Date().getFullYear();

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        defaultSelected: initialDate,
        fromDate: new Date(`${year - 2}-01-01`),
        toDate: new Date(`${year + 2}-12-31`),
        onDateChange: (date: Date | undefined) => {
            if (date && time) {
                const [hours, minutes] = time.split(':');
                const dateTime = new Date(date);
                dateTime.setHours(parseInt(hours), parseInt(minutes));
                onChange?.(dateTime);
            } else {
                onChange?.(null);
            }
        },
        // disabled
    });

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = event.target.value;
        setTime(newTime);

        if (selectedDay && newTime) {
            try {
                const timeDate = parse(newTime, 'HH:mm', new Date());
                const dateTime = new Date(selectedDay);
                dateTime.setHours(timeDate.getHours(), timeDate.getMinutes());
                onChange?.(dateTime);
            } catch (e) {
                console.log(e)
                onChange?.(null);
            }
        } else {
            onChange?.(null);
        }
    };

    return (
        <VStack gap="2">
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    label={dateLabel}
                    required={required}
                    error={error}
                />
            </DatePicker>
            <TextField
                label={timeLabel}
                type="time"
                value={time}
                onChange={handleTimeChange}
                required={required}
                error={error}
                disabled={disabled}
            />
        </VStack>
    );
};

export default NovariDateTime;