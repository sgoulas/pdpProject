import { createAction } from '@reduxjs/toolkit';

import { withPrefix } from '@utils';

import { SetRunningActionPayload, SetOnlineActionPayload } from './types';

const nameSpace = 'APP';
const withNameSpacePrefix = withPrefix(nameSpace);

export const setRunningAction = createAction<SetRunningActionPayload>(
    withNameSpacePrefix('set_running')
);

export const setOnlineAction = createAction<SetOnlineActionPayload>(
    withNameSpacePrefix('set_online')
);
