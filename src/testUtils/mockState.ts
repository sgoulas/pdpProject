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
        billingInfo: {
            fullName: 'Jason Smith',
            address: 'Black Mesa 13',
        },
        paymentInfo: {
            card: {
                number: '1111111111111111',
                name: 'Jason Smith',
                expiry: '1225',
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
