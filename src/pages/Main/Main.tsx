import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { ApiPhone } from '@api';
import { useAppDispatch } from '@hooks';
import { setRunningAction } from '@store/actions';
import { Typography, ProductCard } from '@components';

import { GET_SERVER_INFO, GET_FRONT_PAGE_PHONES } from './api';
import { Head } from './components';
import useStyles from './Main.styles';

export type Phone = Pick<
    ApiPhone,
    | 'id'
    | 'name'
    | 'ratingValue'
    | 'reviewCount'
    | 'price'
    | 'availability'
    | 'description'
    | 'image'
>;

export interface PhoneData {
    results: Phone[];
}

export interface MainProps {
    frontPagePhones: PhoneData;
}

const Main: React.FC<MainProps> = ({ frontPagePhones }: MainProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {
        loading: serverInfoLoading,
        error: serverInfoError,
        data: serverInfoResult,
    } = useQuery(GET_SERVER_INFO);

    const {
        loading: getPhonesLoading,
        error: getPhonesError,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: phones,
    } = useQuery<PhoneData>(GET_FRONT_PAGE_PHONES);

    useEffect(() => {
        dispatch(setRunningAction({ running: true }));
        console.log('data: ', frontPagePhones);
    }, []);

    return (
        <>
            <Head />
            <Typography variant="h5">PDP project</Typography>
            <h2 style={{ color: 'orange' }}>Hello World!!</h2>
            {/* <h2>value: {data}</h2> */}
            <h2>{serverInfoLoading ? 'loading' : 'finished loading'}</h2>
            <h2>
                {serverInfoError
                    ? `error: ${serverInfoError.message}`
                    : 'no errors'}
            </h2>
            {getPhonesError && (
                <Alert severity="error">
                    Error fetching top selling phones
                </Alert>
            )}
            {getPhonesLoading && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <CircularProgress disableShrink />
                </Grid>
            )}
            <section className={classes.phonesContainer}>
                {frontPagePhones && (
                    <>
                        <Typography
                            variant="h6"
                            component="h2"
                            className={classes.topSellingPhonesText}
                        >
                            Top selling smartphones
                        </Typography>
                        {frontPagePhones.results.map(phone => (
                            <ProductCard
                                key={phone.id}
                                id={phone.id}
                                name={phone.name}
                                ratingValue={phone.ratingValue ?? 0}
                                reviewCount={phone.reviewCount ?? 0}
                                price={phone.price}
                                availability={phone.availability}
                                description={phone.description}
                                image={phone.image}
                            />
                        ))}
                    </>
                )}
            </section>

            <Typography variant="body1" color="textPrimary">
                server message:
                {serverInfoResult ? serverInfoResult.info : 'loading'}
            </Typography>
        </>
    );
};

export default Main;
