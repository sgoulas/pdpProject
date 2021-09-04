import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
    layout: {
        width: '100%',
        display: 'grid',
        placeContent: 'center',
        margin: spacing(8, 0),
    },
}));

export default useStyles;
