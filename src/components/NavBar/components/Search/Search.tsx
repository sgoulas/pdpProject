import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { useDebounce } from '@hooks';

import useStyles from './Search.styles';
import { GET_PRODUCT_BY_NAME } from './api';

const Search: React.FC = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [getProductByName, { loading, error, data }] =
        useLazyQuery(GET_PRODUCT_BY_NAME);

    const MIN_INPUT_LENGTH = 4;

    const handleChange = (event: React.ChangeEvent<{ value: string }>) =>
        setSearchTerm(event.target.value);

    useEffect(() => {
        debouncedSearchTerm.length >= MIN_INPUT_LENGTH &&
            getProductByName({ variables: { name: debouncedSearchTerm } });
    }, [debouncedSearchTerm]);

    useEffect(() => {
        data &&
            data.getProductByName.forEach(({ name }: { name: string }) =>
                console.log('product found:', name)
            );
    }, [data]);

    // if (loading) return <p>Loading ...</p>;
    // if (error) return `Error! ${error}`;

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
            />
        </div>
    );
};

export default Search;
