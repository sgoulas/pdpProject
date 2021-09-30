import React, { useState } from 'react';
import Image from 'next/image';
import { productImageUrl } from '@core';

export interface ImageFallbackProps {
    src: string;
    fallbackSrc: string;
    alt: string;
    width: number;
    height: number;
}

const ImageFallback: React.FC<ImageFallbackProps> = ({
    src,
    fallbackSrc,
    alt,
    width,
    height,
}: ImageFallbackProps) => {
    const [showFallback, setShowFallback] = useState(false);
    const [originalSrc, setOriginalSrc] = useState(src);

    const handleImgSrcError = () => setShowFallback(true);

    if (originalSrc !== src) {
        setShowFallback(false);
        setOriginalSrc(src);
    }

    return (
        <Image
            src={
                showFallback
                    ? productImageUrl(fallbackSrc)
                    : productImageUrl(src)
            }
            alt={alt}
            layout="responsive"
            width={width}
            height={height}
            onError={handleImgSrcError}
        />
    );
};

export default ImageFallback;
