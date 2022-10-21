import { useEffect, useState } from 'react';

/**
 * Detects whether the frontend client is using a touchscreen or not.
 *
 * @returns true if a touchscreen is detected
 *          false if no touchscreen is detected
 *          null while detection is in-progress (for about 10ms when invoked)
 */
export function useDeviceTouchscreenDetector(): boolean | null {
    const [hasTouchScreen, setHasTouchScreen] = useState<boolean | null>(null);

    useEffect(() => {
        let hasTouchScreen = false;
        if ('maxTouchPoints' in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0;
        } else if ('msMaxTouchPoints' in navigator) {
            // @ts-expect-error
            hasTouchScreen = navigator.msMaxTouchPoints > 0;
        } else {
            // @ts-expect-error
            const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
            if (mQ && mQ.media === '(pointer:coarse)') {
                hasTouchScreen = !!mQ.matches;
            } else if ('orientation' in window) {
                hasTouchScreen = true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                var UA = navigator.userAgent;
                hasTouchScreen =
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
            }
        }
        setHasTouchScreen(hasTouchScreen);
    }, []);

    return hasTouchScreen;
}

export default useDeviceTouchscreenDetector;
