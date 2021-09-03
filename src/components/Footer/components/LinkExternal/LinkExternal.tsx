import React from 'react';
import Link from '@material-ui/core/Link';

import { Typography } from '@components';

interface LinkExternalProps {
    url: string;
    text: string;
}

const LinkExternal: React.FC<LinkExternalProps> = ({
    url,
    text,
}: LinkExternalProps) => (
        <Link href={url} rel="noopener" target="_blank" underline="none">
            <Typography variant="body2" color="textSecondary">
                {text}
            </Typography>
        </Link>
    );
export default LinkExternal;
