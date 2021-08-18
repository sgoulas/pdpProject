import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { useAppDispatch } from '@hooks/store';
import { setRunningAction } from '@store/actions';

import { GET_SERVER_INFO } from './api';

const Main: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, data } = useQuery(GET_SERVER_INFO);

    useEffect(() => {
        dispatch(setRunningAction({ running: true }));
    }, []);

    return (
        <>
            <h1 style={{ color: 'orange' }}>Hello World!!</h1>
            <h2>{loading ? 'loading' : 'finished loading'}</h2>
            <h2>{error && `error: ${error.message}`}</h2>
            <h2>server message: {data ? data.info : 'loading'}</h2>
        </>
    );
};

export default Main;
