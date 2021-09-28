import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
    cardContainer: {
        [breakpoints.down('md')]: {
            padding: spacing(0.25),
        },
        padding: spacing(2),
    },
    cardRoot: {
        width: spacing(60),
        [breakpoints.down('md')]: {
            width: spacing(40),
            margin: spacing(0.25),
            padding: spacing(1),
        },
    },
    productName: {
        display: 'inline',
        marginRight: spacing(1),
    },
    description: {
        height: spacing(10),
        color: palette.text.primary,
        textDecoration: 'none',
        fontSize: 14,
        display: '-webkit-box',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
    },
    image: {
        [breakpoints.up('md')]: {
            maxWidth: '50%',
        },
    },
}));

export default useStyles;
