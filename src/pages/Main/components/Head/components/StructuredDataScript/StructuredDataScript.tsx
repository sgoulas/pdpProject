import React from 'react';

import { GIT_REPO_URL, SITE_IMAGE_URL, SITE_NAME, SITE_URL } from '@core';

const StructuredDataScript: React.FC = () => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        description: 'An ecommerce site selling technology products',
        url: SITE_URL,
        image: [SITE_IMAGE_URL],
        sameAs: [GIT_REPO_URL],
        contactPoint: {
            contactType: 'PR',
            email: 'sprgoulas@gmail.com',
            hoursAvailable: ['Mo-Fri 09:00-21:00', 'Sa-Su 11:00-13:00'],
        },
        founder: 'Spyros Goulas',
        foundingDate: '2021-5-15',
        numberOfEmployees: '1',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        ></script>
    );
};

export default StructuredDataScript;
