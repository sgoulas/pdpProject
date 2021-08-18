import React from 'react';
import { MockedProvider } from '@apollo/client/testing';

import { GQLmocks, renderWithProviders, waitFor } from '@testUtils';

import Main from './Main';
import { GET_SERVER_INFO } from './api';

describe('Main page suite', () => {
    const mockServerMessage = 'mock server message';

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

    it('renders hello world message', () => {
        const { getByText } = renderWithProviders(
            <MockedProvider mocks={GQL_MOCKS} addTypename={false}>
                <Main />
            </MockedProvider>
        );
        const expectedText = 'Hello World!!';

        expect(getByText(expectedText)).toBeInTheDocument();
    });

    it('fetches and displays the server information message', async () => {
        const expected = `server message: ${mockServerMessage}`;
        const { getByText } = renderWithProviders(
            <MockedProvider mocks={GQL_MOCKS} addTypename={false}>
                <Main />
            </MockedProvider>
        );

        await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
    });
});
