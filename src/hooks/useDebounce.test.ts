import { renderHook, cleanup, act } from '@testing-library/react-hooks';

import { DEBOUNCE_DELAY } from '@core';

import useDebounce from './useDebounce';

describe('useDebounce', () => {
    afterAll(() => {
        jest.useRealTimers();
        cleanup();
    });
    it('debounces the input value', () => {
        jest.useFakeTimers();
        let input = 'old';
        const newInput = 'new input';

        const { result, rerender } = renderHook(() => useDebounce(input));

        expect(result.current).toBe(input);

        input = newInput;

        rerender(); // accepts new props as param but if passed newInput the test fails

        act(() => {
            jest.advanceTimersByTime(DEBOUNCE_DELAY);
        });

        expect(result.current).toBe(newInput);
    });
});
