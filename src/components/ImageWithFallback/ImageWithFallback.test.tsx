import React from 'react';

import { render } from '@testUtils';

import ImageWithFallback, { ImageFallbackProps } from './ImageWithFallback';

describe('ImageWithFallback suite', () => {
    const defaultProps: ImageFallbackProps = {
        src: 'iphone11.png',
        fallbackSrc: 'phoneFallBack.png',
        alt: 'phone name',
        width: 200,
        height: 200,
    };

    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = render(<ImageWithFallback {...defaultProps} />);

        expect(firstChild).toMatchSnapshot();
    });

    it('renders correctly for error img src', () => {
        const {
            container: { firstChild },
        } = render(<ImageWithFallback {...defaultProps} src="" />);

        expect(firstChild).toMatchSnapshot();
    });
});
