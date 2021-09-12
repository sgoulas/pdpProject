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

## 4 September 2021

I made the navbar and the footer fixed, and added min height and margin-bottom to the body element to make my main content scrollable.

todo:make it more tidy, maybe move the margin-bottom from body to main, maybe add margin top, investigate the `margin: spacing(8, 0),` and if it's good to be there. Ideally body should have top / bottom margin equal to the height of the navbar / footer elements + something for styling reasons.

[done]

Now I want to start working on the navbar element, which is one of the most important ones. My current plan is to merge the "app bar" and "drawer" examples from the material ui docs (https://material-ui.com/components/app-bar/ and https://material-ui.com/components/drawers/ respectively) to create a navigaton bar wth a primary search field and a button that opens a sidedrawer. The sidedrawer will contain my navigation menu. I would also like to have more than one levels in the menu, each level covering the previous menu display when clicked, so that if a user navigates to a deep level they will continue to see just one navigation window and not an ever expanding sequense of them.

I implemented the toggle functionality and refactored the side menu with some text and icons. I only added one category, technology, alongside some subcategories. I will most probably refactor this section in the future depending on the products and categories I decided to display, but for now it's alright.

## 6 September 2021

I am going to write a couple of tests for my sidemenu component then probably work on further styling the navigation bar.

I am trying to use RTL to find a button. I want to use the `name` property by the library notes it's deprecated. The same comment provides no information about what I should use instead and the official documentation still uses the `name` property. It's on of those days I suppose.

Regarding the navbar element I will be using `grid` to align the different elements (the logo/text, the search field, possible additional buttons on the far right). I could do it with material-ui's `<Grid />` component, but I will try to make it with the css `grid` rule, which I have never used in the past and is a primary goal of this project, as defined in the `TODO` document.

I styled the navigation bar with a menu icon (the classc humburger one) and a search icon, using css grid. As a sidenote, if I didn't have (as per the initially set requirements) to do it with css grid, I would most definitely use material-ui's `<Grid />` component, especially for more complex grids (an option I would like to reserve for the future if the use case demmands it).

Now, while I work on the `<Search />` component, the next thinkg I will be doing is add a dedicated `api` sub-directory to handle the "search product" query and subsequent data / no data results. This means jumping back in the server and addding the relevant query and query resolver. After that I will also have to write the tests.

## 7 September 2021

I refactored the server files to have a central `products` folder that contains all the product directories (so again, a by-feature architecture pattern like ducks) and created a `union` named `Product` that is either of the actual products. This also meant I had to add some unique per product props so that the `__resolveType` function could differentiate them.

Btw, how life saving is that server introspection script now huh?

In the scope of implementing the search product functionality I will create a `useDebounce` hook with a standard 500ms delay to handle user input then query the server.

I encountered a weird problem where the graphql call was successful but I was getting empty objects in my react component (although the network tab was showing correct values). After some searching it turns out this was caused because I was quering for a union type and I had to also include `__typename` in my query results so that apollo could make sense of the returned `type` during runtime.

Now, let's take a lookat my `graphql` query:

```ts
import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_NAME = gql`
    query getProductByName($name: String!) {
        getProductByName(name: $name) {
            __typename
            ... on Phone {
                name
                image
                price
                url
            }
            ... on Tablet {
                name
                image
                price
                url
            }
        }
    }
`;
```

what happens with a structure like this is that my data return with the following structure:

```json
{
    "data": {
        "getProductByName": {
            "__typename": "Phone",
            "url": "https://rhiannon.name",
            "price": 97,
            "name": "recusandae"
        }
    }
}
```

and this means I have to access them by accessing the `getProductByName` property.

```ts
useEffect(() => {
    data &&
        data.getProductByName.forEach(({ name }: { name: string }) =>
            console.log('product found:', name)
        );
}, [data]);
```

This is ugly right?

Digging around it seems that `getProductByName` **is not** a query name, but rather a regular field on the root query type `Query` and that having results on the exact same shape as the query is one of the core design principles of GraphQL (https://stackoverflow.com/questions/45238631/any-reason-i-am-getting-back-the-query-name-in-the-graphql-results).

This explains the format of my `gql` queries. I create a `query` of name whatever (but this time, of name `getProductByName`), which calls the `getProductByName` query that I have actually declared on my server.

If I need the returned values to be under `products` I would have to change my schema definition from this:

```ts
const ProductTypeDef = gql`
    union Product = Phone | Tablet

    extend type Query {
        "Returns products that include the input name in their name"
        getProductByName(name: String!): [Product]
    }
`;
```

to this:

```ts
const ProductTypeDef = gql`
    union Product = Phone | Tablet

    extend type Query {
        "Returns products that include the input name in their name"
        products(name: String!): [Product]
    }
`;
```

I think I should change my schema to be more generic (this feels very `REST` like). What I want to find before that is if I will be polluting the name space. For example, I may want a `products` query that has only the name as an input param but also another `products` that will maybe have a price range too. Should I create a general one? Can I declare two and make the server differentiate them somehow?

That being said, I feel that defining a single query and playing around with default args to customize the resolver based on the number and type of provided arguments leans a bit on the back end side of things.

In any case, I renamed my queries to be more GraphQL-like (for example renamed `getProductById` to simply `product`).

Now, since I can fetch data on my search bar, I need to display them. This means displaying a list with the returned products as links, each one directing the user to it's assocciated product details page. This means that my mock data can not be randomly generated (at least not all of them), since at the very least I need the image urls to be specific, so that I can actually serve them from my `static` folder. I think this is what I should do next, especially since what's left to finish the landing page is displaying a bunch of products / categories on the front page, and this needs some properties of my generated data to be the specific.

So, I need to find some random phone / tablet images (or a single one) and create a not-so-random mock generator function for these two products.

## 8 September 2021

Found out I could alias the result of my graphQL query

```ts
export const GET_PRODUCT_BY_NAME = gql`
    query getProductsByName($name: String!) {
        results: products(name: $name) { //notice the alias results here
            __typename
            ... on Phone {
                name
                image
                price
                url
            }
            ... on Tablet {
                name
                image
                price
                url
            }
        }
    }
`;
```

impostor syndrome intesifies.

Generally speaking, the search component needs only to display its results and can be considered ready. That being said, this consideration can only be done in the context of the scope of this project. What I am going to do is grab the first 5 results and display them. What happens if the results are more than 5? What happens if they are 30? Or 50? In a production setting I would add a "see more" on the bottom of the result mini list and then navigate the user to a dedicated "search page" where they will be able to see all the results of their query. I am not going to do that, since it would only add to the initially specified scope of the project, a scope that so far has only expanded.

I add this note to indicate that while "done", the component will not be "optimal" or close to what I consider "optimal". This is in order to rein a bit on the developement effort and to try to reach the (self imposed) deadline of December 1st. I will however add this note as an entry under "maybe" in the TODO list.

Now I think I will be using material-ui's `Autocomplete` component to implement the dropdown I have in mind, replacing the current input base I am using.

[later]

Tried setting something up but I was too tired, messed it up, reverted everything but some minor clean up changes and called it a day.

## 11 September 2021

Ideally I would like to finish with the autocomplete component today. Since I don't really have a clear implementation in mind (desing-wise) I will work in a separate branch. I decided that since I have the styling ready I can use the headless variation of the `Autocomplete` component, the problem is enforcing a consistent typing, since my autocomplete input can be `string`, `null` or `SearchOption` where the latter is the type of the data that the query returns `type SearchOption = Pick<ApiProduct, 'name' | 'image' | 'price' | 'url'>;`.

In the end, I was baited by the component's `onChange` prop. What I actually needed was `onInputChange` to specifically target user input (which is always string) and not user's selection (which is `string`, `null` or `Option`).

With that change I am able to retain my search bar's style as well as display possible results. Now I need to style the list and also fix a problem where an `<li />` key is not unique (caused by me assigning the product name to it and the server actually generating non-unique product names, which is acceptable in the scope of a real world scenario).

Regarding the generation of unique ids, I know I can use lodash, a uuid library or native javascript code. Regarding the latter I know you can implement an rfc4122 compliant string but you have to rely on the poor entropy of `Math.random`. On the other hand you I remember reading about generating a uuid by leveraging a native javascript function, but can't really remember details. I remember you were creating "something" and that something had a prop which had to be implemented in a specific way that made it rfc4122 compliant. In any case, I can just also retrieve the `id` property of the `Product` and be done with it, especially since I already generate it as a `uuid`.

Now I could create a new component that will receive the products fetched by the query and display them in a nice manner (I am thinking of small cards, with images and whatnot), or display the `error` and `loading` states but I am checking amazon's implementation and they just display the options. I think it's a clean approach and it will definitely save development time, so I will just style a bit the existing component to better display the results

I updated the styles to use my existing color palette and now I have to turn the search results into clickable hyperlinks to the product details page, plus to handle the `loading` and `error` states of the query call. Then, I should perform a clean up by moving the `material-ui` components that I am currently importing from the library inside my `components` folder. This will allow me to compress all the different "component" imports into a single import line and also will loosely define the components currently in use by my codebase. The latter seems strict but it's actually not. It exists so that a possible collaborator in the application will have a quick reference of the components we use to create the UI. If said person needs another `material-ui` not currently in use, they can just add it to the `components` folder exports and carry on. This is to avoid directly importing `material-ui` components in other components, consolidating the exports to a single point of reference, allowing me greater flexility in the future to replace a `material-ui` component I don't like with another custom or third party one. It also loosely enforces the usage of specific components, which allows a certain degree of design cohesiveness (meaning, if `material-ui` exports an `<UnecessaryComponent />` that doesn't mean it can be used just because it's available. Maybe the same UI can be achieved with some other components already available, this makes development more structured since all the developers work with the same set of components, which contains less than the total available components provided by the library). But again, just to stress it out, if someone needs another `material-ui` not currently in use, they can just add it to the `components` folder exports and carry on.

Quick update on that, there seems to be a problem when dynamically using a component exported like that, in cases for example that I render a list when a fetch call is finished, the UI is broken (I am guessing it's an issue with styling not dynamically applying to the components that were not used until now or something similar). I moved the imports inside the components again for some of them.

I should also consider adding a toast notification for failed calls or success messages, preferrably in a centralized way. Added it to the "maybe" list (just thinking it should be a fun integration with `redux-saga`).

Now the only thing left is to add some tests and the MR should be finished.

Also, just realized the `url` property in my products is not needed, since the pages are dynamically created via the `id` prop.

To do tomorrow: finish test, consider adding toastify.

## 12 September 2021

I spent two hours trying to test the search autocomplete functionality. For a while I thought the problem was that my DOM selectors were wrong, but in the end the problem was that my mock graphql call did not include any "variables". I thought if you mocked the results you did not have to be explicit (or include in any capacity) the query variables but it seems they have to be sent as well, probably because the query fails on a declaration level.

After writing the test I removed some redundant types from my query, since I only need `name` and `id` in my results (and `__typename` of course).

I considered adding `react-toastify` which I had used in the past. The plan would be to leverage its customization options to replace the default rendered component with `<Alert />` from `material-ui` but this would take some time to get it right and would add to the TODO list, which I am trying to keep under control. If I need notifactions I can consider using `<Alert />` in a specific part of the page and trigger it via `redux` or go with `react-toastify` + `<Alert />`. For the time being I have to keep my deadline in mind. I hae already updated the `maybe` section of my TODO list to reconsider this feature implementation in the future, should time and energy allows it. For now, the `<Search />` component is done.

Just for the fun of it, I added a github workflow to run my jest tests when trying to merge a pull request. There is also a repository setting to enforce the pipeline not failing in order to merge it (https://stackoverflow.com/questions/58654530/how-to-reject-a-pull-request-if-tests-are-failed-github-actions) but unfortunately I have to make the repository public, which is something I would like to avoid until finishing the whole thing.

On to my next task: create a "product" card to display various different products and their information in the main page, create the relevant query, display them in the main section of the `Main` page, pay attention to using semantic HTML5 tags (image / figure, section, article, details) and make sure the grid is responsive for all screen sizes. Doing this will wrap app all my tasks in "Main" page.
