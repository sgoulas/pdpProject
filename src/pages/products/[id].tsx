import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    //fetch product by params.id
    const product: ProductProps = await { name: 'product one', id: '1' };

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
