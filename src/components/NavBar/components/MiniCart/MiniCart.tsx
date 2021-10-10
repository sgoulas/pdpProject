import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';

const MiniCart: React.FC = () => (
    <IconButton>
        <ShoppingCart color="secondary" />
    </IconButton>
);

export default MiniCart;
