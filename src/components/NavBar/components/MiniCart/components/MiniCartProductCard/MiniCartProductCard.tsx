import React from 'react';

import { CartProduct } from '@core';

export interface MiniCartProductCardProps {
    item: CartProduct;
}

//https://codepen.io/btcrooks/pen/MbNape

const MiniCartProductCard: React.FC<MiniCartProductCardProps> = ({
    item,
}: MiniCartProductCardProps) => <span>{item.product.name}</span>;

export default MiniCartProductCard;
