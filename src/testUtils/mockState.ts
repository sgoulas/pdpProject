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
    checkout: {
        paymentInfo: {
            card: {
                number: '1111111111111111',
                name: 'Jason Smith',
                expiry: '12/25',
                cvc: '123',
            },
        },
    },
    _persist: {
        version: 1,
        rehydrated: false,
    },
};

export default mockState;
