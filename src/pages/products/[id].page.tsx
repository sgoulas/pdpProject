import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { client, ApiProduct } from '@api';

import { default as ProductDetails } from './Product';
import { GET_ALL_PRODUCT_IDS, GET_PRODUCT_BY_ID } from './api';

export interface ProductPageProps {
    product: ApiProduct;
}

const ProductPage: React.FC<ProductPageProps> = (props: ProductPageProps) => (
    <ProductDetails {...props} />
);

interface ProductPageParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as ProductPageParams;
    const { data } = await client.query({
        query: GET_PRODUCT_BY_ID,
        variables: {
            id,
        },
    });

    return {
        props: {
            product: data.results,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({
        query: GET_ALL_PRODUCT_IDS,
    });

    const productIDs: string[] = data.results.map(
        ({ id }: { id: string }) => id
    );

    const paths = productIDs.map(id => ({ params: { id } }));

    return { paths, fallback: false };
};

export default ProductPage;
