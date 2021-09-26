import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
    container: {
        backgroundColor: palette.background.paper,
    },
    productName: {
        fontWeight: typography.fontWeightBold,
        cursor: 'pointer',
        [breakpoints.down('md')]: {
            fontSize: 48,
        },
    },
    productMoto: {
        cursor: 'pointer',
        [breakpoints.down('md')]: {
            fontSize: 24,
        },
    },
    imageContainer: {
        width: 200,
        height: 300,
        [breakpoints.up('md')]: {
            width: 400,
            height: 500,
        },
    },
}));

export default useStyles;
