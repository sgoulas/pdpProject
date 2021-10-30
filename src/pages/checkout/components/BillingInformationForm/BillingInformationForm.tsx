import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import {
    useDebounce,
    useAppDispatch,
    useAppSelector as useSelect,
} from '@hooks';
import {
    billingAddressSelector,
    billingFullNameSelector,
    isValidBillingAddressSelector,
    isValidBillingFullNameSelector,
} from '@pages/checkout/store/selectors';
import {
    updateBillingAddressAction,
    updateBillingFullNameAction,
} from '@pages/checkout/store/actions';

const BillingInformationForm: React.FC = () => {
    const inputDebounce = 250;
    const dispatch = useAppDispatch();

    const billingFullName = useSelect(billingFullNameSelector);
    const billingAddress = useSelect(billingAddressSelector);

    const isValidBillingFullName = useSelect(isValidBillingFullNameSelector);
    const isValidBillingAddress = useSelect(isValidBillingAddressSelector);

    const [billingInfo, setBillingInfo] = useState({
        fullName: billingFullName,
        address: billingAddress,
    });

    const [fullNameError, setFullNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);

    const debouncedBillingFullName = useDebounce(
        billingInfo.fullName,
        inputDebounce
    );

    const debouncedBillingAddress = useDebounce(
        billingInfo.address,
        inputDebounce
    );

    useEffect(() => {
        dispatch(
            updateBillingFullNameAction({ fullName: debouncedBillingFullName })
        );
    }, [debouncedBillingFullName]);

    useEffect(() => {
        dispatch(
            updateBillingAddressAction({ address: debouncedBillingAddress })
        );
    }, [debouncedBillingAddress]);

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setBillingInfo(prevInfo => ({
            ...prevInfo,
            fullName: e.target.value,
        }));

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setBillingInfo(prevInfo => ({
            ...prevInfo,
            address: e.target.value,
        }));

    const textFieldProps = [
        {
            label: 'full name',
            onChange: handleFullNameChange,
            value: billingInfo.fullName,
            onBlur: () => setFullNameError(!isValidBillingFullName),
            error: fullNameError,
            helperText: fullNameError
                ? 'field should contain a valid full name'
                : '',
        },
        {
            label: 'address',
            onChange: handleAddressChange,
            value: billingInfo.address,
            onBlur: () => setAddressError(!isValidBillingAddress),
            error: addressError,
            helperText: addressError
                ? 'field should contain a valid address'
                : '',
        },
    ];

    return (
        <div id="billing-info-form">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {textFieldProps.map(({ label, onChange, value, ...rest }) => (
                    <Grid item xs={12} key={label}>
                        <TextField
                            label={label}
                            variant="outlined"
                            color="primary"
                            onChange={onChange}
                            inputProps={{
                                'aria-label': label,
                                'data-testid': label,
                            }}
                            value={value}
                            {...rest}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BillingInformationForm;
