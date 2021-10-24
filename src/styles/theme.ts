import { createTheme } from '@material-ui/core/styles';

import { palette } from './palette';
import { typography } from './typography';

const theme = createTheme({
    palette,
    typography,
    overrides: {
        MuiStepIcon: {
            root: {
                '&$active': {
                    color: '#FFA41C',
                },
                '&$completed': {
                    color: '#FFA41C',
                },
            },
        },
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#EAEDED',
                    height: '100vh',
                },
            },
        },
    },
});

export { theme };
