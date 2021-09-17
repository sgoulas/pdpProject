import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing }) => ({
    phonesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: palette.background.paper,
        borderRadius: spacing(0.5),
    },
    topSellingPhonesText: {
        flex: '0 0 100%',
        fontWeight: 100,
        marginLeft: spacing(1),
    },
}));

export default useStyles;
