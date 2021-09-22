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
    description: {
        height: spacing(8),
        color: palette.text.primary,
        textDecoration: 'none',
        fontSize: 14,
        display: `-webkit-box`,
        WebkitLineClamp: 3,
        boxOrient: 'vertical',
        overflow: 'hidden',
        [breakpoints.down('md')]: {
            maxHeight: '150px',
        },
    },
    availability: {
        marginLeft: spacing(1),
    },
    image: {
        [breakpoints.up('md')]: {
            maxWidth: '50%',
        },
    },
}));

export default useStyles;
