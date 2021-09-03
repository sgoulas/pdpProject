import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Head } from './components';

import { useAppDispatch } from '@hooks/store';
import { setRunningAction } from '@store/actions';
import { Typography } from '@components';

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
            <h1>PDP project</h1>
            <h2>{name ?? 'name'}</h2>
            <h2 style={{ color: 'orange' }}>Hello World!!</h2>
            <h2>{loading ? 'loading' : 'finished loading'}</h2>
            <h2>{error ? `error: ${error.message}` : 'no errors'}</h2>
            <Typography variant="body1" color="textPrimary">
                server message: {data ? data.info : 'loading'}
            </Typography>
        </>
    );
};

export default Main;
