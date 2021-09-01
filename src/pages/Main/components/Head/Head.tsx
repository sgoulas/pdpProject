import React from 'react';
import NextHead from 'next/head';

import { SITE_NAME } from '@core';

const Head: React.FC = () => (
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
        <meta
            httpEquiv="content-type"
            content="text/html; charset=UTF-8"
        ></meta>
        <meta name="google" content="nositelinkssearchbox" />
        <link rel="canonical" href="http://localhost:3000/"></link>

        {/* Open Graph protocol Basic Metadata*/}
        <meta property="og:title" content={`${SITE_NAME}`} />
        <meta property="og:type" content="website" />
        <meta
            property="og:image"
            content="http://localhost:3000/ecommerce.jpg"
        />
        <meta property="og:url" content="https://www.public.gr/" />

        {/* Open Graph protocol Optional Metadata*/}
        <meta property="og:site_name" content={`${SITE_NAME}`} />
        <meta
            property="og:description"
            content={`${SITE_NAME} is the best place to buy Videos, Electronics, Computers, Tablets, Cell Phones, Toys, Games, Watches and hardware, free shipping to Europe.`}
        />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://example.com/ogp.jpg" />
        <meta property="og:image:secure_url" content="https://localhost:3000" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
            property="og:image:alt"
            content={`${SITE_NAME} ecommerce site logo`}
        />
    </NextHead>
);

export default Head;
