import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
    description: {
        display: `-webkit-box`,
        WebkitLineClamp: 3,
        boxOrient: 'vertical',
        overflow: 'hidden',
    },
    cardText: {
        color: palette.text.primary,
        textDecoration: 'none',
        fontSize: 14,
    },
}));

export default useStyles;
