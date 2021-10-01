import React from 'react';

import { render } from '@testUtils';

import ImageWithFallback, { ImageFallbackProps } from './ImageWithFallback';

describe('ImageWithFallback', () => {
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

    it('rerenders correctly when it receives a new image', () => {
        const {
            container: { firstChild },
            rerender,
            getByAltText,
            queryByAltText,
        } = render(<ImageWithFallback {...defaultProps} />);

        expect(firstChild).toMatchSnapshot();
        expect(getByAltText(defaultProps.alt)).toBeInTheDocument();

        rerender(
            <ImageWithFallback
                {...defaultProps}
                src="iphone13.jpg"
                alt="new phone name"
            />
        );

        expect(firstChild).toMatchSnapshot();
        expect(queryByAltText(defaultProps.alt)).not.toBeInTheDocument();
        expect(getByAltText('new phone name')).toBeInTheDocument();
    });
});
