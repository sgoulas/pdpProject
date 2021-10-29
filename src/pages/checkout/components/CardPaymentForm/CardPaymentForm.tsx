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
} from 'pages/checkout/store/actions';
import {
    cardCvcSelector,
    cardExpirySelector,
    cardNameSelector,
    cardNumberSelector,
} from 'pages/checkout/store/selectors';

import useStyles from './CardPaymentForm.styles';

const CardPaymentForm: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const cardNumber = useSelect(cardNumberSelector);
    const cardName = useSelect(cardNameSelector);
    const cardExpiry = useSelect(cardExpirySelector);
    const cardCvc = useSelect(cardCvcSelector);

    const [cardInfo, setCardInfo] = useState({
        number: cardNumber,
        name: cardName,
        expiry: cardExpiry,
        cvc: cardCvc,
    });

    const debouncedCardNumber = useDebounce(cardInfo.number);
    const debouncedCardName = useDebounce(cardInfo.name);
    const debouncedCardExpiry = useDebounce(cardInfo.expiry);
    const debouncedCardCvc = useDebounce(cardInfo.cvc);

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
            error: false,
            // error: !isValidCardNumber(cardInfo.number),
            // helperText: !isValidCardNumber(cardInfo.number)
            //     ? 'field should contain 16 numbers'
            //     : '',
        },
        {
            label: 'card name',
            onChange: handleNameChange,
            value: cardInfo.name,
            error: false,
        },
        {
            label: 'expiry',
            onChange: handleExpiryChange,
            value: cardInfo.expiry,
            error: false,
        },
        {
            label: 'cvc',
            onChange: handleCvcChange,
            value: cardInfo.cvc,
            type: 'password',
            error: false,
        },
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
