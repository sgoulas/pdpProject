import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Head } from './components';

import { useAppDispatch } from '@hooks';
import { setRunningAction } from '@store/actions';
import { Typography, ProductCard } from '@components';

import { GET_SERVER_INFO } from './api';

export interface MainProps {
    name?: string;
}

const Main: React.FC<MainProps> = ({ name }: MainProps) => {
    const dispatch = useAppDispatch();
    const { loading, error, data } = useQuery(GET_SERVER_INFO);

    useEffect(() => {
        dispatch(setRunningAction({ running: true }));
    }, []);

    return (
        <>
            <Head />
            <Typography variant="h5">PDP project</Typography>
            <h2>{name ?? 'name'}</h2>
            <h2 style={{ color: 'orange' }}>Hello World!!</h2>
            <h2>{loading ? 'loading' : 'finished loading'}</h2>
            <h2>{error ? `error: ${error.message}` : 'no errors'}</h2>
            <ProductCard
                id="id"
                name="Scepter"
                ratingValue={3.5}
                reviewCount={6}
                price={340}
                availability={17}
                description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,"
            />
            <Typography variant="body1" color="textPrimary">
                server message: {data ? data.info : 'loading'}
            </Typography>
        </>
    );
};

export default Main;
