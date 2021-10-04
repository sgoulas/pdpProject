import { RootState } from '@store/store';

const mockState: RootState = {
    app: {
        running: true,
        online: true,
    },
    cart: { products: [] },
    _persist: {
        version: 1,
        rehydrated: false,
    },
};

export default mockState;
