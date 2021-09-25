import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

// import { ApiProduct } from '@api';

export interface ProductProps {
    name: string;
    id: string;
}

export const Product: React.FC<ProductProps> = ({ name, id }: ProductProps) => {
    console.log('products');

    return (
        <span>
            this is the product page for product {name} with id: {id}
        </span>
    );
};

interface ProductPageParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as ProductPageParams;
    //fetch product by params.id
    const product: ProductProps = await { name: `product ${id}`, id };

    return {
        props: {
            name: product.name,
            id: product.id,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await ['1', '2', '3'].map(id => ({
        params: { id },
    }));

    return { paths, fallback: false };
};

export default Product;
