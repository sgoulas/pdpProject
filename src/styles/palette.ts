import { PaletteOptions } from '@material-ui/core/styles/createPalette';

//https://www.happyhues.co/palettes/3
//https://www.color-hex.com/color-palette/26593
const palette: PaletteOptions = {
    type: 'light',
    common: {
        black: '#000000',
        white: '#ffffff',
    },
    primary: {
        main: '#146eb4',
    },
    secondary: {
        main: '#dddddd',
    },
    error: {
        main: '#ef4565',
    },
    text: {
        primary: '#146eb4',
        secondary: '#dddddd',
    },
    background: {
        default: '#232F3E',
        paper: '#f2f2f2',
    },
};

export { palette };
