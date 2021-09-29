import React from 'react';

import { ApiProduct } from '@api';
import { absoluteURL, productDetailsPage, productImageUrl } from '@core';

export interface ProductJSONLDprops {
    product: ApiProduct;
}

const ProductJSONLD: React.FC<ProductJSONLDprops> = ({
    product,
}: ProductJSONLDprops) => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'Product',
        aggregateRating: product.ratingValue ?? 0,
        brand: product.brand,
        category: 'Mobile Phones',
        image: absoluteURL(productImageUrl(product.image)),
        model: product.name,
        name: product.name,
        url: absoluteURL(productDetailsPage(product.id)),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        ></script>
    );
};

export default ProductJSONLD;
