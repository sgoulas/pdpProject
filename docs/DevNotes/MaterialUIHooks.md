```ts
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const theme = useTheme();
const isLargeScreen = useMediaQuery(() => theme.breakpoints.up('md'));
```
