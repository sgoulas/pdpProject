import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }) => ({
    cardImage: {
        [breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));

export default useStyles;
