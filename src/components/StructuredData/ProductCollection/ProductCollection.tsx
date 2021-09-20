import React from 'react';

import { SITE_URL } from '@core';

interface ProductCollectionProps {
    size: number;
}

const ProductCollection: React.FC<ProductCollectionProps> = ({
    size,
}: ProductCollectionProps) => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'ProductCollection',
        size,
        headline: 'Top selling smartphones',
        keywords: 'top-selling, mobile, smartphones, technology',
        mainEntityOfPage: SITE_URL,
        url: SITE_URL,
        description: 'The current top selling mobile smartphones',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        ></script>
    );
};

export default ProductCollection;
