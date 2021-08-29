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
        justifyContent: 'center',
    },
    containerItem: {
        [breakpoints.down('md')]: {
            padding: spacing(1, 2),
        },
        [breakpoints.up('md')]: {
            padding: spacing(2, 14),
        },
        textAlign: 'center',
    },
}));

export default useStyles;
