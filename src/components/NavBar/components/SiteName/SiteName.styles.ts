import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    siteName: {
        cursor: 'pointer',
        [breakpoints.between(0, 'xs')]: {
            display: 'none',
        },
    },
    siteNameMobile: {
        cursor: 'pointer',
        marginLeft: spacing(-1),
        marginRight: spacing(1),
        [breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default useStyles;
