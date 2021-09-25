import { gql } from '@apollo/client';

export const GET_ALL_PRODUCT_IDS = gql`
    query getAllProductIds {
        results: allProducts {
            __typename
            ... on Phone {
                id
            }
            ... on Tablet {
                id
            }
        }
    }
`;

export const GET_PRODUCT_BY_ID = gql`
    query getProductById($id: String!) {
        results: getProductById(id: $id) {
            __typename
            ... on Phone {
                availability
                brand
                description
                id
                image
                name
                price
                ratingValue
                reviewCount
                sku
            }
            ... on Tablet {
                availability
                brand
                description
                id
                image
                name
                price
                ratingValue
                reviewCount
                sku
            }
        }
    }
`;
