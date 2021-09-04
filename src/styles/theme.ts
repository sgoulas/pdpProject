import { createTheme } from '@material-ui/core/styles';

import { palette } from './palette';
import { typography } from './typography';

const theme = createTheme({
    palette,
    typography,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#EAEDED',
                },
            },
        },
    },
});

export { theme };
