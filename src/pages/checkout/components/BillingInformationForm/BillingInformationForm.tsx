import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// import {
//     useDebounce,
//     useAppDispatch,
//     useAppSelector as useSelect,
// } from '@hooks';

const BillingInformationForm: React.FC = () => {
    const textFieldProps = [
        {
            label: 'full name',
            onChange: () => undefined,
            value: '',
        },
        {
            label: 'address',
            onChange: () => undefined,
            value: '',
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
