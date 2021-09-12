import React from 'react';

import {
    GQLmocks,
    renderWithProviders,
    waitFor,
    withApolloMocks,
    fireEvent,
    within,
} from '@testUtils';

import Search, { SearchOption } from './Search';
import { GET_PRODUCT_BY_NAME } from './api';

describe('Search component suite', () => {
    const userInput = 'mock name';

    const MOCK_RESULTS: SearchOption[] = [
        {
            __typename: 'Phone',
            name: 'mock name 1',
            id: '2351-asdf3-fsadfas-234',
        },
        {
            __typename: 'Phone',
            name: 'mock name 2',
            id: 'fsadfas-asdf3-2351-234',
        },
    ];

    const GQL_MOCKS: GQLmocks = [
        {
            request: {
                query: GET_PRODUCT_BY_NAME,
                variables: { name: userInput },
            },
            result: {
                data: {
                    results: MOCK_RESULTS,
                },
            },
        },
    ];

    it("performs a query with user's input and displays the results", async () => {
        const { getByTestId, getByText } = renderWithProviders(
            withApolloMocks(GQL_MOCKS)(<Search />)
        );

        const [firstResult, secondResult] = MOCK_RESULTS;

        const autocomplete = getByTestId('autocomplete');
        const input = within(autocomplete).getByTestId('search-input');

        autocomplete.focus();
        fireEvent.change(input, { target: { value: userInput } });

        await waitFor(() =>
            expect(getByText(firstResult.name)).toBeInTheDocument()
        );

        await waitFor(() =>
            expect(getByText(secondResult.name)).toBeInTheDocument()
        );
    });
});
