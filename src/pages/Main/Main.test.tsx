import React from 'react';

import {
    GQLmocks,
    renderWithProviders,
    waitFor,
    withApolloMocks,
} from '@testUtils';

import Main, { MainProps } from './Main';
import { GET_SERVER_INFO } from './api';

describe('Main page suite', () => {
    const defaultProps: MainProps = {
        frontPagePhones: { results: [] },
    };

    const mockServerMessage = 'mock server message';
    const mockServerErrorMessage = 'an error occured';

    const GQL_MOCKS: GQLmocks = [
        {
            request: {
                query: GET_SERVER_INFO,
                variables: {},
            },
            result: {
                data: { info: mockServerMessage },
            },
        },
    ];

    const GQL_MOCKS_ERROR: GQLmocks = [
        {
            request: {
                query: GET_SERVER_INFO,
                variables: {},
            },
            error: new Error(mockServerErrorMessage),
        },
    ];

    it('fetches and displays the server information message', async () => {
        const expected = mockServerMessage;
        const { getByText } = renderWithProviders(
            withApolloMocks(GQL_MOCKS)(<Main {...defaultProps} />)
        );

        expect(getByText('loading')).toBeInTheDocument();
        await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
    });

    it('displays the error message if it encounters an error while fetching the server information message', async () => {
        const expected = mockServerErrorMessage;
        const { getByText } = renderWithProviders(
            withApolloMocks(GQL_MOCKS_ERROR)(<Main {...defaultProps} />)
        );

        expect(getByText('loading')).toBeInTheDocument();
        await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
    });
});
