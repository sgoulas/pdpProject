import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
    footer: {
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        bottom: 0,
        right: 0,
        backgroundColor: palette.secondary.main,
    },
}));

export default useStyles;
