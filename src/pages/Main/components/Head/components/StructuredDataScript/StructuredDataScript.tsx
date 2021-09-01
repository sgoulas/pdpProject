import React from 'react';

import { GIT_REPO_URL, SITE_NAME, SITE_URL } from '@core';

const StructuredDataScript: React.FC = () => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [GIT_REPO_URL],
        email: 'sprgoulas@gmail.com',
        founder: 'Spyros Goulas',
        foundingDate: '2021-5-15',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        ></script>
    );
};

export default StructuredDataScript;
