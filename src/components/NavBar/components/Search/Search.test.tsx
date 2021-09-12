import React from 'react';

import {
    GQLmocks,
    renderWithProviders,
    waitFor,
    withApolloMocks,
    fireEvent,
} from '@testUtils';

import Search, { SearchOption } from './Search';
import { GET_PRODUCT_BY_NAME } from './api';

describe('Search component suite', () => {
    const MOCK_RESULTS: SearchOption[] = [
        {
            name: 'mock name 1',
            price: 5,
            id: '2351-asdf3-fsadfas-234',
            image: 'image url 1',
        },
        {
            name: 'mock name 2',
            price: 50,
            id: 'fsadfas-asdf3-2351-234',
            image: 'image url 2',
        },
    ];

    const GQL_MOCKS: GQLmocks = [
        {
            request: { query: GET_PRODUCT_BY_NAME, variables: {} },
            result: {
                data: {
                    results: MOCK_RESULTS,
                },
            },
        },
    ];

    xit("performs a query with user's input and displays the results", async () => {
        const userInput = 'mock name';
        const { getByTestId, getByText } = renderWithProviders(
            withApolloMocks(GQL_MOCKS)(<Search />)
        );

        const inputComponent = getByTestId('search-input');

        fireEvent.change(inputComponent, { target: { value: userInput } });

        // expect(container.firstChild).toMatchSnapshot();

        await waitFor(() =>
            expect(getByText(MOCK_RESULTS[0].name)).toBeInTheDocument()
        );
        await waitFor(() =>
            expect(getByText(MOCK_RESULTS[1].name)).toBeInTheDocument()
        );
    });
});
