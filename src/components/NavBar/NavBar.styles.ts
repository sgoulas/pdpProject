import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
    navBar: {
        backgroundColor: palette.background.default,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}));

export default useStyles;
