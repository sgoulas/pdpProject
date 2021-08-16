import React from 'react';

import { useAppDispatch } from '@hooks/store';
import { setRunningAction } from '@store/actions';

const Main: React.FC = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setRunningAction({ running: true }));
    }, []);

    return <h1 style={{ color: 'orange' }}>Hello World!!</h1>;
};

export default Main;
