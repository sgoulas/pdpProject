import React from 'react';

import { SITE_URL } from '@core';

interface ProductCollectionProps {
    size: number;
    headline: string;
    keywords: string;
    description: string;
}

const ProductCollection: React.FC<ProductCollectionProps> = ({
    size,
    headline,
    keywords,
    description,
}: ProductCollectionProps) => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'ProductCollection',
        size,
        headline,
        keywords,
        mainEntityOfPage: SITE_URL,
        url: SITE_URL,
        description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        ></script>
    );
};

export default ProductCollection;
