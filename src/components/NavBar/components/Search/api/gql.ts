import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_NAME = gql`
    query getProductByName($name: String!) {
        getProductByName(name: $name) {
            __typename
            ... on Phone {
                name
                image
                price
                url
            }
            ... on Tablet {
                name
                image
                price
                url
            }
        }
    }
`;
