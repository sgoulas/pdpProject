export const productDetailsPage: (id: string) => string = id =>
    `/products/${encodeURIComponent(id)}`;

export const landingPage: () => string = () => '/';
