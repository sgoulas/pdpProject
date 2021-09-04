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

Trying with the `Script` component does not yield results:

```tsx
import React from 'react';
import Script from 'next/script';

import { GIT_REPO_URL, SITE_NAME, SITE_URL } from '@core';

const StructuredDataScript: React.FC = () => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [GIT_REPO_URL],
    };

    return (
        <Script type="application/ld+json">{JSON.stringify(JSON_LD)}</Script>
    );
};

export default StructuredDataScript;

//Main.tsx

//...
return (
    <>
        <Head />
        <StructuredDataScript />
        <h1>PDP project</h1>
        <h2>{name}</h2>
        <h2 style={{ color: 'orange' }}>Hello World!!</h2>
        <h2>{loading ? 'loading' : 'finished loading'}</h2>
        <h2>{error && `error: ${error.message}`}</h2>
        <h2>server message: {data ? data.info : 'loading'}</h2>
    </>
);
```

The data are rendered on the page but are not present in page source.

BUT, there is a `strategy` prop and by setting it to `beforeInteractive` the script renders in page source, albeit escaped

```
<script src="" type="application/ld+json" defer="">{&quot;@context&quot;:&quot;http://schema.org&quot;,&quot;@...
```

Now, in order to prevent React from escaping the string it seems I have to... use `dangerouslySetInnerHTML` (I also checked out the advised-not-to-use `unescape` function mentioned at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/unescape but decided against using it for obvious reasons).

```tsx
import React from 'react';

import { GIT_REPO_URL, SITE_NAME, SITE_URL } from '@core';

const StructuredDataScript: React.FC = () => {
    const JSON_LD = {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [GIT_REPO_URL],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        ></script>
    );
};

export default StructuredDataScript;
```

After that the schema validator (https://validator.schema.org/) was able to correctly identify my structured data.

Now, I wondered if it was best to place the data at the `<head>` tag. It used to be that `<body>` was equally acceptable but in the "if you don't place it at the head you can also place it at the body of the document" kind of way, which while subtle, meant placing the data at the `<head>` was the better option.

But, we want to be as professional as we resonably can here, so considering the W3 org specification for the `<head>` element (https://www.w3.org/TR/2014/REC-html5-20141028/document-metadata.html#the-head-element) states that `The head element represents a collection of metadata for the Document` and since structured data are a textbook case of metadata, I will be adding them to the `<Head />` component of the page rather than its `<body />`.

Now, I got a bit carried away and added quite a few folders, files etc. The structure strategy I followed was that each component that needs components, defines a `components` folder which contains all the components the component (in this case the `Main` pages) needs

e.g

```
Main
    components
              Head
```

what about the `<StructuredDataScript />`? Strictly speaking, it is needed in `<Main />` but also strictly speaking, `<Main />` does not use it directly. In actuallity it is imported and subsequently used by `<Head />`. If I open the `Main/components` directory I expect to find components that are present in the return value of `<Main />`. With that in mind placing `<StructuredDataScript />` at the same level as `<Head />` seems hierarchically misguiding.

My solution was to define one more `components` directory

```
Main
    components
              Head
                   components
                              StructuredDataScript
```

Deeply nested, yes, but now it is evident that `<StructuredDataScript />` is a subcomponent (a _direct_ subcomponent) of `<Head />` and that is explicitly placed there. In turn, the same applies for the relationship between `<Head />` and `<Main />`,

This also allows me to futher break down the `<Head />` component in the future, maybe by creating separate components for `open graph` tags, `twitter cards` and other `meta tags`, if I choose to do so.

What is also important is to decide on how I will be handling the `ld+json` data. Right now the values in `Main` page are hardcoded and that is acceptable, they are not values that are expected to change dynamically. But the same is not the case for the `ld+json` data that will be added in future pages like `<Product />` or `<ProductsListing />` or `<Categories />`. Will I be creating page-specific versions of the `<StructuredDataScript />`? Do I need to consider a generic utility function that will generate the strings? https://json-ld.org/ has a list of available third party packages that I can use but I am hesitant adding dependencies (and thus affecting bundle size) for things that I can make myself with a reasonable degree of quality and useability. At the end of the day, shaving some kilobytes from my served application is expected to have a non-zero impact on the performance metrics.

Next I will resume working on the user interface, this time by creating the navigation bar element.

## 3 September 2021

I said I would continue with the navbar, but I thought I would read about accessibility a bit more, to make sure my footer component is up to par. Now, I know there are a lot of thing you have to implement to make sure your application is accessible (font scaling options, color-blind friendly palette, specific attributes for DOM elements to offer different way to access them) but the first thing I wanted to cover was aria roles (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA). I also would like to find a validator so that I can pinpoint areas of the application that need change. I will create an appopriately named file under `DevNotes/` directory to keep some notes about accessibility.

Reading the documentation, it seems that many aria roles are covered by HTML5 semantic tags (https://w3c.github.io/using-aria/#rule1), not sure about how much the first overlaps with the latter.

I did find two online validator tools:

-   https://achecker.achecks.ca/checker/index.php
-   https://wave.webaim.org/

For example, I get the error that the links in my `footer` element have low contrast with their background.

[45 minutes later]

Alright, so, basically, I straight up copied Amazon's color palette. Jeff forgive me.

Btw, a note on git workflows.

Right now, considering I move and break things a ton, I prefer to stick to my main branch and just be mindful about not doing (too many) "test" or "wip" commits. Under normal circumstances, tasks like "create the footer of the application" would be separate tasks, with separate acceptance criteria, descriptions and, most importantly, git branches and merge requests. I plan to introduce git workflows in the project at a later stage, when the application has a stable release version so any additional feature (something defined as "extra milestone" for example) will be a "new" feature when compared to the initial scope. Until then, working with git workflows will probably prove detrimental to my development experience and time management. I will, however, add a "define git workflow policy" in my TODO list.

I improved my footer element's style, updated my palette and typography defaults and added the `<CssBaseline />` component from `material-ui` to normalize my CSS.

Next, I noticed that my content is not scrollable, so I should continue from there (maybe also check out this: https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/).
