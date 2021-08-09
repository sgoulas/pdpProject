import { createAction } from '@reduxjs/toolkit';

import { withPrefix } from '@utils/withPrefix';

import { SetRunningActionPayload } from './types';

const nameSpace = 'APP';
const withNameSpacePrefix = withPrefix(nameSpace);

const setRunning = createAction<SetRunningActionPayload>(
    withNameSpacePrefix('set_running')
);

export default setRunning;
