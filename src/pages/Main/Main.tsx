import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';

import { ApiPhone } from '@api';
import { useAppDispatch } from '@hooks';
import { setRunningAction } from '@store/actions';
import { Typography, ProductCard } from '@components';

import { GET_SERVER_INFO } from './api';
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
    const { error: serverInfoError, data: serverInfoResult } =
        useQuery(GET_SERVER_INFO);

    useEffect(() => {
        dispatch(setRunningAction({ running: true }));
    }, []);

    const message = serverInfoResult ? serverInfoResult.info : 'loading';

    return (
        <>
            <Head productCollectionSize={frontPagePhones.results.length} />
            <Typography variant="body1" color="textPrimary" noWrap>
                {message}
            </Typography>
            <div>
                {serverInfoError && (
                    <Alert severity="error">
                        <Typography variant="body1" color="textPrimary">
                            {serverInfoError.message}
                        </Typography>
                    </Alert>
                )}
            </div>
            {!frontPagePhones && (
                <Alert severity="error">
                    Error fetching top selling phones
                </Alert>
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
                                imageFallback={'phoneFallBack.png'}
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    );
};

export default Main;
