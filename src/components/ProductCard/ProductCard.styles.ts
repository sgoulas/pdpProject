import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        maxWidth: spacing(50),
    },
    reviewCount: {
        color: palette.primary.main,
    },
}));

export default useStyles;
