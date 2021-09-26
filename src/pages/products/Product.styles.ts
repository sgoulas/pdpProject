import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ typography, breakpoints }) => ({
    productName: {
        fontWeight: typography.fontWeightBold,
        cursor: 'pointer',
        [breakpoints.down('md')]: {
            fontSize: 32,
        },
    },
}));

export default useStyles;
