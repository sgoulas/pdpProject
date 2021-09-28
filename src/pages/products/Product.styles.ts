import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ typography, breakpoints }) => ({
    productName: {
        fontWeight: typography.fontWeightBold,
        cursor: 'pointer',
        fontSize: 32,
    },
    imageContainer: {
        width: 300,
        [breakpoints.up('md')]: {
            width: 400,
        },
        [breakpoints.up('lg')]: {
            width: 600,
        },
    },
}));

export default useStyles;
