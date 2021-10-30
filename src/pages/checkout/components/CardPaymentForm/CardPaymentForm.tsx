import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import {
    useDebounce,
    useAppDispatch,
    useAppSelector as useSelect,
} from '@hooks';
import {
    updateCardCvcAction,
    updateCardExpiryAction,
    updateCardNameAction,
    updateCardNumberAction,
} from '@pages/checkout/store/actions';
import {
    cardCvcSelector,
    cardExpirySelector,
    cardNameSelector,
    cardNumberSelector,
    isValidCardCvcSelector,
    isValidCardExpirySelector,
    isValidCardNameSelector,
    isValidCardNumberSelector,
} from '@pages/checkout/store/selectors';

import useStyles from './CardPaymentForm.styles';

const CardPaymentForm: React.FC = () => {
    const inputDebounce = 250;
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const cardNumber = useSelect(cardNumberSelector);
    const cardName = useSelect(cardNameSelector);
    const cardExpiry = useSelect(cardExpirySelector);
    const cardCvc = useSelect(cardCvcSelector);

    const isValidCardNumber = useSelect(isValidCardNumberSelector);
    const [cardNumberError, setCardNumberError] = useState(false);

    const isValidCardName = useSelect(isValidCardNameSelector);
    const [cardNameError, setCardNameError] = useState(false);

    const isValidCardExpiry = useSelect(isValidCardExpirySelector);
    const [cardExpiryError, setCardExpiryError] = useState(false);

    const isValidCardCvc = useSelect(isValidCardCvcSelector);
    const [cardCvcError, setCardCvcError] = useState(false);

    const [cardInfo, setCardInfo] = useState({
        number: cardNumber,
        name: cardName,
        expiry: cardExpiry,
        cvc: cardCvc,
    });

    const debouncedCardNumber = useDebounce(cardInfo.number, inputDebounce);
    const debouncedCardName = useDebounce(cardInfo.name, inputDebounce);
    const debouncedCardExpiry = useDebounce(cardInfo.expiry, inputDebounce);
    const debouncedCardCvc = useDebounce(cardInfo.cvc, inputDebounce);

    useEffect(() => {
        dispatch(updateCardNumberAction({ number: debouncedCardNumber }));
    }, [debouncedCardNumber]);

    useEffect(() => {
        dispatch(updateCardNameAction({ name: debouncedCardName }));
    }, [debouncedCardName]);

    useEffect(() => {
        dispatch(updateCardExpiryAction({ expiry: debouncedCardExpiry }));
    }, [debouncedCardExpiry]);

    useEffect(() => {
        dispatch(updateCardCvcAction({ cvc: debouncedCardCvc }));
    }, [debouncedCardCvc]);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            number: e.target.value,
        }));

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            name: e.target.value,
        }));

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            expiry: e.target.value,
        }));

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            cvc: e.target.value,
        }));

    const textFieldProps = [
        {
            label: 'card number',
            onChange: handleNumberChange,
            value: cardInfo.number,
            onBlur: () => setCardNumberError(!isValidCardNumber),
            error: cardNumberError,
            helperText: cardNumberError
                ? 'field should contain 16 numbers'
                : '',
        },
        {
            label: 'card name',
            onChange: handleNameChange,
            value: cardInfo.name,
            onBlur: () => setCardNameError(!isValidCardName),
            error: cardNameError,
            helperText: cardNameError
                ? 'field should contain a valid name'
                : '',
        },
        {
            label: 'expiry',
            onChange: handleExpiryChange,
            value: cardInfo.expiry,
            onBlur: () => setCardExpiryError(!isValidCardExpiry),
            error: cardExpiryError,
            helperText: cardExpiryError
                ? 'field should contain a valid expiry date'
                : '',
        },
        {
            label: 'cvc',
            onChange: handleCvcChange,
            value: cardInfo.cvc,
            type: 'password',
            onBlur: () => setCardCvcError(!isValidCardCvc),
            error: cardCvcError,
            helperText: cardCvcError ? 'field should contain a valid cvc' : '',
        },
    ];

    return (
        <div id="payment-info-form" data-testid="payment-info-form">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12}>
                    <div className={classes.cardImage}>
                        <Cards
                            cvc={cardInfo.cvc}
                            expiry={cardInfo.expiry}
                            name={cardInfo.name}
                            number={cardInfo.number}
                        />
                    </div>
                </Grid>
                {textFieldProps.map(
                    ({ label, onChange, error, value, ...rest }) => (
                        <Grid item xs={12} key={label}>
                            <TextField
                                label={label}
                                variant="outlined"
                                color="primary"
                                error={error}
                                onChange={onChange}
                                inputProps={{
                                    'aria-label': label,
                                    'data-testid': label,
                                }}
                                value={value}
                                {...rest}
                            />
                        </Grid>
                    )
                )}
            </Grid>
        </div>
    );
};

export default CardPaymentForm;
