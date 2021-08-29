import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: palette.secondary.main,
    },
}));

export default useStyles;
