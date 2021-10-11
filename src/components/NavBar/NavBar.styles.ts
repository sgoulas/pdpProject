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
        gridTemplateColumns: '15% 8% 50% 27%',
        [breakpoints.up('sm')]: {
            gridTemplateColumns: '5% 30% 55% 5%',
        },
        [breakpoints.up('md')]: {
            gridTemplateColumns: '5% 25% 60% 5%',
        },
        [breakpoints.up('lg')]: {
            gridTemplateColumns: '3% 12% 78% 7%',
        },
        [breakpoints.between('xs', 'md')]: {},
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: zIndex.appBar,
    },
}));

export default useStyles;
