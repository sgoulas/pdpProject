import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
    button: {
        width: spacing(18),
        height: spacing(6),
    },
}));

export default useStyles;
