import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
    footer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        right: 0,
        backgroundColor: palette.secondary.main,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    containerItem: {
        [breakpoints.down('md')]: {
            paddingTop: spacing(2),
            paddingBottom: spacing(2),
        },
        [breakpoints.up('md')]: {
            paddingTop: spacing(4),
            paddingBottom: spacing(4),
        },
        textAlign: 'center',
    },
}));

export default useStyles;
