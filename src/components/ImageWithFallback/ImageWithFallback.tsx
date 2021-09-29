import React, { useState } from 'react';
import Image from 'next/image';
import { productImageUrl } from '@core';

interface ImageFallbackProps {
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
    const [imgSrc, setImgSrc] = useState(false);
    const [oldSrc, setOldSrc] = useState(src);

    const handleImgSrcError = () => setImgSrc(true);

    if (oldSrc !== src) {
        setImgSrc(false);
        setOldSrc(src);
    }

    return (
        <Image
            src={imgSrc ? productImageUrl(fallbackSrc) : productImageUrl(src)}
            alt={alt}
            layout="responsive"
            width={width}
            height={height}
            onError={handleImgSrcError}
        />
    );
};

export default ImageFallback;
