import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints, zIndex }) => ({
    navBar: {
        backgroundColor: palette.background.default,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'grid',
        gridColumnGap: spacing(1),
        gridTemplateColumns: 'auto auto auto auto', // the last column will be the cart component that will be created in the future
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: zIndex.appBar,
    },
    siteName: {
        [breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));

export default useStyles;
