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
        gridTemplateColumns: '15% 10% 50% 25%',
        [breakpoints.up('sm')]: {
            gridTemplateColumns: '5% 35% 50% 5%',
        },
        [breakpoints.up('md')]: {
            gridTemplateColumns: '5% 25% 60% 5%',
        },
        [breakpoints.up('lg')]: {
            gridTemplateColumns: '3% 12% 81% 3%',
        },
        [breakpoints.between('xs', 'md')]: {},
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: zIndex.appBar,
    },
}));

export default useStyles;
