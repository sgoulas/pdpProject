import { expectSaga } from 'redux-saga-test-plan';

import { setOnlineAction, setRunningAction } from './actions';
import { setOnline } from './saga';
import { SetRunningActionPayload } from './types';

describe('store saga suite', () => {
    describe('setOnline saga', () => {
        it('puts seOnlineAction with correct payload on receiving setRunningAction', () => {
            const mockSetRunningActionPayload: SetRunningActionPayload = {
                running: true,
            };

            return expectSaga(
                setOnline,
                setRunningAction(mockSetRunningActionPayload)
            )
                .put({ type: setOnlineAction.type, payload: { online: true } })
                .dispatch({
                    type: setRunningAction.type,
                    payload: mockSetRunningActionPayload,
                })
                .run();
        });
    });
});
