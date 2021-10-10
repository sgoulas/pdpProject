import React from 'react';

import { CartProduct } from '@core';

export interface MiniCartProductCardProps {
    item: CartProduct;
}

const MiniCartProductCard: React.FC<MiniCartProductCardProps> = ({
    item,
}: MiniCartProductCardProps) => <span>{item.product.name}</span>;

export default MiniCartProductCard;
