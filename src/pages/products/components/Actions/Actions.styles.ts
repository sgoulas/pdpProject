import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
    button: {
        height: spacing(6),
        width: spacing(30),
        [breakpoints.up('md')]: {
            width: spacing(24),
        },
    },
}));

export default useStyles;
