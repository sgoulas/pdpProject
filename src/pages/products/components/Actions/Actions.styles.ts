import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
    button: {
        width: spacing(15),
        height: spacing(5),
    },
}));

export default useStyles;
