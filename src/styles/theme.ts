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
                    minHeight: '400px',
                    marginBottom: '100px', //todo this should be the height of the fooder
                    clear: 'both',
                },
            },
        },
    },
});

export { theme };
