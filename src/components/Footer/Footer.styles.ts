import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    ({ palette, spacing, breakpoints, typography }) => ({
        footer: {
            position: 'fixed',
            width: '100%',
            bottom: 0,
            left: 0,
            backgroundColor: palette.background.default,
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
        title: {
            color: palette.common.white,
            fontWeight: typography.fontWeightBold,
        },
    })
);

export default useStyles;
