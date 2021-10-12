import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
    priceLabel: {
        textAlign: 'right',
        paddingRight: spacing(2),
    },
    checkoutBtn: {
        height: spacing(6),
        width: spacing(30),
    },
}));

export default useStyles;
