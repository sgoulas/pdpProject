import { useState, useEffect } from 'react';

import { DEBOUNCE_DELAY } from '@core';

const useDebounce: (value: string, delay?: number) => string = (
    value,
    delay = DEBOUNCE_DELAY
) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
