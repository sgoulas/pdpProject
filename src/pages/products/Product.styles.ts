import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ typography }) => ({
    productName: {
        fontWeight: typography.fontWeightBold,
        cursor: 'pointer',
        fontSize: 32,
    },
}));

export default useStyles;
