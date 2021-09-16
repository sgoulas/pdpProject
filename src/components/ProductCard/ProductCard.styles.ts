import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing }) => ({
    cardContainer: {
        padding: spacing(0.25),
    },
    cardRoot: {
        width: spacing(40),
        margin: spacing(0.25),
        padding: spacing(1),
    },
    description: {
        color: palette.text.primary,
        textDecoration: 'none',
        fontSize: 14,
        display: `-webkit-box`,
        WebkitLineClamp: 3,
        boxOrient: 'vertical',
        overflow: 'hidden',
        maxHeight: '150px',
    },
    availability: {
        marginLeft: spacing(1),
    },
}));

export default useStyles;
