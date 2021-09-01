import React from 'react';
import Script from 'next/script';

import { GIT_REPO_URL, SITE_NAME, SITE_URL } from '@core';

const StructuredDataScript: React.FC = () => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [GIT_REPO_URL],
    };

    return (
        <Script type="application/ld+json" strategy="beforeInteractive">
            {JSON.stringify(JSON_LD)}
        </Script>
    );
};

export default StructuredDataScript;
