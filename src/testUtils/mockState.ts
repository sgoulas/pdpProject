import { RootState } from '@store/store';

const mockState: RootState = {
    app: {
        running: true,
        online: true,
    },
    cart: {
        products: [
            {
                product: {
                    id: 'mockid',
                    price: 50,
                    availability: 50,
                    description: 'asd',
                    sku: 'mockssku',
                    brand: 'mock brand',
                    name: 'mock product name',
                    image: '',
                },
                quantity: 1,
            },
        ],
    },
    _persist: {
        version: 1,
        rehydrated: false,
    },
};

export default mockState;
