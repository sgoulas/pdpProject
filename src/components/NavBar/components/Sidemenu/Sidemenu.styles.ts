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
            fontSize: 18,
            fontWeight: typography.fontWeightBold,
        },
        menuHeader: {
            backgroundColor: palette.background.default,
            padding: spacing(1, 1),
        },
    })
);

export default useStyles;
