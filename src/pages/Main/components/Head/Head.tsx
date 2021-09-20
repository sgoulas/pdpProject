import React from 'react';
import NextHead from 'next/head';

import { SITE_NAME, SITE_URL, SITE_IMAGE_URL } from '@core';
import { ProductCollection as ProductCollectionStructuredData } from '@components';

import { LocalBusiness as LocalBusinessStructuredData } from './components';

interface HeadProps {
    productCollectionSize: number;
}

const Head: React.FC<HeadProps> = ({ productCollectionSize }: HeadProps) => (
    <NextHead>
        <title>{SITE_NAME}</title>
        <meta
            name="description"
            content={`${SITE_NAME} is the best place to buy Videos, Electronics, Computers, Tablets, Cell Phones, Toys, Games, Watches and hardware, free shipping to Europe.`}
        ></meta>
        <meta name="author" content="Spyros Goulas"></meta>
        <meta
            name="keywords"
            content="Online Shopping, Videos, Electronics, Computers, Tablets, Cell Phones, Toys, Games, Watches, Hardware"
        ></meta>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta charSet="UTF-8" />
        <meta name="google" content="nositelinkssearchbox" />
        <link rel="canonical" href={SITE_URL}></link>

        {/* Open Graph protocol Basic Metadata*/}
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={SITE_IMAGE_URL} />
        <meta property="og:url" content={SITE_URL} />

        {/* Open Graph protocol Optional Metadata*/}
        <meta property="og:site_name" content={`${SITE_NAME}`} />
        <meta
            property="og:description"
            content={`${SITE_NAME} is the best place to buy Videos, Electronics, Computers, Tablets, Cell Phones, Toys, Games, Watches and hardware, free shipping to Europe.`}
        />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={SITE_IMAGE_URL} />
        <meta property="og:image:secure_url" content={SITE_URL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
            property="og:image:alt"
            content={`${SITE_NAME} ecommerce site logo`}
        />
        <LocalBusinessStructuredData />
        <ProductCollectionStructuredData
            size={productCollectionSize}
            headline={'Top selling smartphones'}
            keywords={'top-selling, mobile, smartphones, technology'}
            description={'The current top selling mobile smartphones'}
        />
    </NextHead>
);

export default Head;
