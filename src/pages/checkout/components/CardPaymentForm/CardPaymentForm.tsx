import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const CardPaymentForm: React.FC = () => {
    const [cardInfo, setCardInfo] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

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
        },
        {
            label: 'card name',
            onChange: handleNameChange,
        },
        {
            label: 'expiry',
            onChange: handleExpiryChange,
        },
        {
            label: 'cvc',
            onChange: handleCvcChange,
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
                    <Cards
                        cvc={cardInfo.cvc}
                        expiry={cardInfo.expiry}
                        name={cardInfo.name}
                        number={cardInfo.number}
                    />
                </Grid>
                {textFieldProps.map(({ label, onChange }) => (
                    <Grid item xs={12} key={label}>
                        <TextField
                            label={label}
                            variant="outlined"
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
