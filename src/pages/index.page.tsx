import React from 'react';
import { GetStaticProps } from 'next';

import { client } from '@api';

import Main, { MainProps } from './main';
import { GET_FRONT_PAGE_PHONES } from './main/api';

const LandingPage: React.FC<MainProps> = (props: MainProps) => (
    <Main {...props} />
);

export const getStaticProps: GetStaticProps = async () => {
    const { data: frontPagePhones } = await client.query({
        query: GET_FRONT_PAGE_PHONES,
    });

    return {
        props: {
            frontPagePhones,
        },
    };
};

export default LandingPage;
