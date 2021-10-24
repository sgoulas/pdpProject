import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { useAppDispatch, useAppSelector as useSelect } from '@hooks';

import {
    updateCardNumberAction,
    updateCardNameAction,
    updateCardExpiryAction,
    updateCardCvcAction,
} from '../../store/actions';
import {
    cardNumberSelector,
    cardNameSelector,
    cardExpirySelector,
    cardCvcSelector,
} from '../../store/selectors';

const CardPaymentForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const cardNumber = useSelect(cardNumberSelector);
    const cardName = useSelect(cardNameSelector);
    const cardExpiry = useSelect(cardExpirySelector);
    const cardCvc = useSelect(cardCvcSelector);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(updateCardNumberAction({ number: e.target.value }));

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(updateCardNameAction({ name: e.target.value }));

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(updateCardExpiryAction({ expiry: e.target.value }));

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(updateCardCvcAction({ cvc: e.target.value }));

    const textFieldProps = [
        {
            value: cardNumber,
            label: 'card number',
            onChange: handleNumberChange,
        },
        { value: cardName, label: 'card name', onChange: handleNameChange },
        { value: cardExpiry, label: 'expiry', onChange: handleExpiryChange },
        { value: cardCvc, label: 'cvc', onChange: handleCvcChange },
    ];

    return (
        <div id="PaymentForm">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Cards
                        number={cardNumber}
                        name={cardName}
                        expiry={cardExpiry}
                        cvc={cardCvc}
                    />
                </Grid>
                {textFieldProps.map(({ value, label, onChange }) => (
                    <Grid item xs={12} key={label}>
                        <TextField
                            label={label}
                            variant="outlined"
                            value={value}
                            color="primary"
                            onChange={onChange}
                            inputProps={{
                                'aria-label': label,
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CardPaymentForm;
