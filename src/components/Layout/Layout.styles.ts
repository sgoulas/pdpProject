import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
    layout: {
        width: '100%',
        display: 'grid',
        placeContent: 'center',
        minHeight: spacing(50),
        marginTop: spacing(6),
        marginBottom: spacing(20),
    },
}));

export default useStyles;
