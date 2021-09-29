import { SITE_URL } from '@core';

/** PAGES */
export const productDetailsPage: (id: string) => string = id =>
    `/products/${encodeURIComponent(id)}`;

export const landingPage: () => string = () => '/';

/** OTHER */
export const productImageUrl: (image: string) => string = image =>
    `/images/${image}`;

/** ABSOLUTE PATHS */
export const absoluteURL: (relativePath: string) => string = (
    relativePath: string
) => `${SITE_URL}${relativePath}`;
