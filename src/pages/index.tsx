import React from 'react';

import { useAppDispatch } from '@hooks/store';
import setRunning from '@store/actions';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setRunning({ running: true }));
    }, []);

    return <h1 style={{ color: 'orange' }}>Hello World!!</h1>;
};

export default App;
