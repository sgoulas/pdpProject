import React from 'react';
import NextHead from 'next/head';

import {
    SITE_NAME,
    SITE_URL,
    productDetailsPage,
    productImageUrl,
} from '@core';
import { ApiProduct } from '@api';

import { ProductJSONLD } from './components';

interface HeadProps {
    product: ApiProduct;
}

const Head: React.FC<HeadProps> = ({ product }: HeadProps) => (
    <NextHead>
        <title>{`${SITE_NAME}: ${product.name}`}</title>
        <meta
            name="description"
            content={`${product.name} mobile smartphone available only for ${product.price}, get the mobile phone with free shipping anywhere!`}
        ></meta>
        <meta
            name="keywords"
            content="Cell Phone, Mobile, Gaming, Smartphone"
        ></meta>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta charSet="UTF-8" />
        <meta name="google" content="nositelinkssearchbox" />
        <link
            rel="canonical"
            href={`${SITE_URL}${productDetailsPage(product.id)}`}
        ></link>

        {/* Open Graph protocol Basic Metadata*/}
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={productImageUrl(product.image)} />
        <meta
            property="og:url"
            content={`${SITE_URL}${productDetailsPage(product.id)}`}
        />

        {/* Open Graph protocol Optional Metadata*/}
        <meta property="og:site_name" content={`${SITE_NAME}`} />
        <meta
            property="og:description"
            content={`${product.name} mobile smartphone available only for ${product.price}, get the mobile phone with free shipping anywhere!`}
        />
        <meta property="og:locale" content="en_GB" />
        {/* Open Graph protocol Image Metadata*/}
        <meta
            property="og:image:secure_url"
            content={`${SITE_URL}/images/${product.image}`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
            property="og:image:alt"
            content={`${product.name} mobile smartphone`}
        />
        <ProductJSONLD product={product} />
    </NextHead>
);

export default Head;
