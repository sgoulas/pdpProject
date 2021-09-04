import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    ({ spacing, breakpoints, typography, palette }) => ({
        list: {
            width: spacing(30),
        },
        fullList: {
            [breakpoints.down('md')]: {
                width: 'auto',
            },
        },
        menuTitle: {
            color: palette.common.black,
            fontSize: 18,
            fontWeight: typography.fontWeightBold,
        },
        menuItem: {
            color: palette.common.black,
        },
        menuHeader: {
            backgroundColor: palette.background.default,
            padding: spacing(1, 1),
        },
    })
);

export default useStyles;
