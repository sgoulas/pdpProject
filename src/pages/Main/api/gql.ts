import { gql } from '@apollo/client';

export const GET_SERVER_INFO = gql`
    query getServerInfo {
        info
    }
`;
