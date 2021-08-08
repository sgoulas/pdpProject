import { createAction } from '@reduxjs/toolkit';

import addNameSpace from '@utils/addNameSpace';

import { SetRunningActionPayload } from './types';

const namespace = 'APP';

const setRunning = createAction<SetRunningActionPayload>(
    addNameSpace(namespace, 'set_running')
);

export default setRunning;
