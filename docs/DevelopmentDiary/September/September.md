## 1 September 2021

I continue working on styling my footer component, but I just realized I am getting no typescript errors.

The component bellow is missing a mandatory prop `url` but VScode is not displaying any errors.

```tsx
interface LinkExternalProps {
    url: string;
    text: string;
}

const LinkExternal: React.FC<LinkExternalProps> = ({
    text,
}: LinkExternalProps) => <span>{text}</span>;

export default LinkExternal;
```

But this shows an error as it should

```tsx
interface LinkExternalProps {
    url: string;
    text: string;
}

const LinkExternal: React.FC<LinkExternalProps> = ({
    url,
    texts, //notice the extra 's'
}: LinkExternalProps) => <span>{texts}</span>;

export default LinkExternal;
```

There is also a weird problem with my `@components` path, which does not seem to work correctly, although I configured it exactly as all the others.

```json
//tsconfig.json
    "paths": {
      "@api": ["api"],
      "@components/*": ["components/*"],
      "@core/*": ["core/*"],
      "@hooks/*":["hooks/*"],
      "@store/*":["store/*"],
      "@styles":["styles"],
      "@testUtils": ["testUtils"],
      "@utils": ["utils"]
    },
```

```tsx
import { Typography } from '@components'; // Cannot find module '@components' or its corresponding type declarations
```

But this works

```json
//tsconfig.json
    "paths": {
      "@api": ["api"],
      "@components/*": ["components/"],// resolved path is missing the '*'
      "@core/*": ["core/*"],
      "@hooks/*":["hooks/*"],
      "@store/*":["store/*"],
      "@styles":["styles"],
      "@testUtils": ["testUtils"],
      "@utils": ["utils"]
    },
```

```tsx
import { Typography } from 'components'; // no '@', but the import works correctly
```

I suspect it has something to do with the fact that `@components/index.ts` exports multiple files.

```ts
export { default as Layout } from './Layout';
export { default as Typography } from '@material-ui/core/Typography';
export { default as NavBar } from './NavBar';
export { default as Footer } from './Footer';
```

because if I leave only one export statement then the `@` path works.

(15 minutes later)

Oh my goooooooooooooood, the changes I was doing were correct, they were not taking effect because I had to restart the server jsnvlanjanvjanjienadsfngladfsg, the NextJS docs (https://nextjs.org/docs/advanced-features/module-path-aliases) have a relevant note about that:

`Note: you need to restart dev server to reflect modifications done in tsconfig.json / jsconfig.json`.

this fixed the issue.

As a sidenote, am I spoiled for expecting import configuration settings to take effect while the dev server is running?

I could start working on the navigation bar element, but I want to take a break from creating elements and start implementing some SEO features.

Now, the list of things that needs to be implemented is quite long, but the first ones I want to add are structured data and head meta attributes. What I want to find out is the best way to get the dynamic data. Some pages are going to have their meta elements hardcoded, because they depend on the page, but some information is by nature dynamic (like json-ld data) so I want to find the best way to render them dynamically. I know there are 3 ways to do it:

-   `dangerouslySetInnerHTML`
-   `react-helmet`
-   `next/head` (overriding the default head component of `NextJS`).

The first one was the go to option, that is if you knew what you were doing, the second one is a widely used solution and the third one is the way `NextJS` handles it. I feel inclined to start from the latter and work my way up the list if need be.

In the NextJS documentation (https://nextjs.org/docs/api-reference/next/head) it is adviced to use `next/script` instead of manually creating a `<script>` tag, however at the relevant documentation (https://nextjs.org/docs/basic-features/script) it is stated that `next/script must not be placed in either a next/head component or in pages/_document.js`. So basically it has to be appended to the body of the page, which does sound nice since for dynamic data I can access them with `getStaticProps `, although I guess since this is an ecommerce site and I need up to date data `getServerSideProps` would be the better option.

I checked the `og` tags from https://ogp.me/ and will check the `ld+json` ones from https://schema.org/.
