import React from 'react';
import { MockedProvider } from '@apollo/client/testing';

import { GQLmocks, renderWithProviders, waitFor } from '@testUtils';

import Main from './Main';
import { GET_SERVER_INFO } from './api';

describe('Main page suite', () => {
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

        expect(getByText('loading')).toBeInTheDocument();
        await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
        expect(getByText('finished loading')).toBeInTheDocument();
    });

    it('displays the error message if it encounters an error while fetching the server information message', async () => {
        const expected = `error: ${mockServerErrorMessage}`;
        const { getByText } = renderWithProviders(
            <MockedProvider mocks={GQL_MOCKS_ERROR} addTypename={false}>
                <Main />
            </MockedProvider>
        );

        expect(getByText('loading')).toBeInTheDocument();
        await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
        expect(getByText('finished loading')).toBeInTheDocument();
    });
});
