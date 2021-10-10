import { ApiProduct } from '@api';

export interface AddToCartActionPayload {
    product: ApiProduct;
}

export interface RemoveFromCartActionPayload {
    productId: ApiProduct['id'];
}

export interface IncreaseCartInventoryActionPayload {
    productId: ApiProduct['id'];
}

export interface DecreaseCartInventoryActionPayload {
    productId: ApiProduct['id'];
}
