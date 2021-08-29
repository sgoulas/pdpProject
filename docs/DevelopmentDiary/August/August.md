## 3 August 2021

I refactored the server to follow the ducks structure pattern. I will also add the https://github.com/erikras/ducks-modular-redux link for future reference when I add redux to the codebase.

P.S strictly speaking ducks is a pattern for structuring redux folders but I will be using it to describe the modular approach it advocates. The broader and more accurate term would be the law of Demeter that I previously mentioned https://en.wikipedia.org/wiki/Law_of_Demeter.

## 8 August 2021

I read some articles about redux toolkit, to try and understand how it is configured in conjuction with redux saga. As a side note, I think I am a person that can equally advocate for boilerplate or full on "magic" when it comes to code, but what I dislike is magic that instead of hiding the problem it fixes, seemingly transforms it into a non problem. This came to my mind when I saw redux toolkit library allowing things like:

```js
state.todos[3].completed = true;
```

which at first glance is a mutation of the redux store, but because redux toolkit under the hood uses the `immer` library, it ends up being an immutable operation. I think this is a bit misleading and can easily confuse some people, the reason for the latter being that many developers (juniors or not) prefer to jump into the code first and read the documentation later, meaning that many developers know how to write code, but not necessarily how this code works. An unsuspecting developer can see projects using `immer` implementing the above snipper and completely skip the concept of object immutability, which of course becomes a concern for situations when (for any reason) redux toolkit and immer are not available or not preffered. I guess what I mean to say is that "magic" is only useful when you understand the steps it allows you to skip.

Anyways....

my aim for today is to read about redux toolkit and see some examples, preferably ones that also implement `redux-saga`, in order to add both dependencies. The order I have in mind is the following:

-   `redux`, `@reduxjs/toolkit`
-   `redux-saga`
-   `jest`
-   `apollo-client`

My reasoning boils down to incrementary additions. `redux` and `@reduxjs/toolkit` can be considered a single paltform evolution step, because they are essentialy redux + redux quality of life functions. `redux-saga` requires the previous two, but can be understood as a separate concern, since it is by all means a way to handle something in a different way, when you think `redux` you do not necessarily think of `redux-saga`, it comes (naturally) later when you have to think of handling complex async logic, thus it can be understood as a separate entity. The order of adding `jest` and `apollo-client` is interchangeable to be honest and by all means the two dependencies are not part of "redux + hanlding async logic via it" step of platform evolution, but since the driving force behing setting up redux now is configuring the network layer of my project and since this means actually writing code and not configuration files, testing this code is the next logical step, hence why I included these two packages in this step.

So, I will be reading the `@reduxjs/toolkit` documentation (https://redux-toolkit.js.org/) to familiarize myself with what is offers, then proceed as described above.

My first simple example will be to create a simple "app state" reducer, that will have a boolean `running` property, initially set to false, that will be set to true as soon as the main `App.tsx` component mounts.

Then, I will add `redux-saga` and refactor the above code to work with sagas.

Since this is going to be a simple proof of concept example, I will create the necessary files directly under the `store` directory, that is to say I will not try to follow the ducks pattern so I can take it one step at a time.

After adding the first two dependencies and configuring the individual files, I tried to wrap my `App` component with the store provider. At this point the realization hits me, there is no centralized `App` component because I am using `NextJS`. How do I provide a centralized `store` to all the different pages?

Going back to the docs it seems the main idea is that if the page is SSG or SSR, the client receives a server side created store which is a new store instance every time, in other cases the client gets the same store. The way to provide a centralized store throught the application is by overriding the (under the hood) `App` component with one of my own.

The official example is here: https://github.com/vercel/next.js/tree/canary/examples/with-redux.

btw: https://github.com/vercel/next.js/tree/canary/examples/with-redux-toolkit-typescript WOW!!!! (The whole repo is a text book case on how to scale your product by providing community working examples using a multitude of tools.)

## 9 August 2021

I want to add `redux-saga` to the application and after going through the examples provided in the previously mentioned repository it seems the suggested way to do so is by using the `next-redux-wrapper` library. At the time of writing these lines however the package has only 137k weekly downloads with 6 open issues and 2 pull requests and if it's to add a dependency to the application I would like it to have a bit more usage. In fact, I am a bit curious if another, better, option is available. `NextJS` is extremely popular and `redux-saga` has almost 900k weekly downloads. One would guess that a package that eases the combined usage of the two would be more popular.

I added `redux-saga` and was able to set it up, without using `next-redux-wrapper`. I understand the motivation behind the library (handling store persistence in case of pages that are navigated on the server and end up getting a new store instance everytime, thus forcing large re-renders) but truth be told, the provided examples are a bit convoludated for my tastes and in any case, I prefer using a solution after I have encountered the problem, at least in cases where I am not sure I will face the problem in the first place (I am a bit curious to see how redux toolkit will handle things).

Before adding jest to my project I would like to solve some linter warnings in my saga files, due to functions with no return type and `action` params having implicitly `any` type. Reading more into it, I found the `Genetaror` type in the official Typescript docs and the `StrictEffect` type in `redux-saga`, but it seems there are several types to describe the action the function generators receive and also the return value of `yield` is of type `any`. I think this is one of those cases that being ultra strict on adding typing to everything may yield less clarity than more (see what I did there?).

I did find two solution for typing the received `action` param of my generator functions.

The first one uses Typescript's type guard (https://basarat.gitbook.io/typescript/type-system/typeguard)

```ts
import { Action } from '@reduxjs/toolkit';
import { setRunningAction } from './actions';

function* setOnline(action: Action) {
    if (setRunningAction.match(action)) {
        const { running } = action.payload;

        yield put(setOnlineAction({ online: running }));
    }
}
```

The second one uses `ReturnType` to dynamically expect the type of the expected action.

```ts
import { setRunningAction } from './actions';

function* setOnline(action: ReturnType<typeof setRunningAction>) {
    const { running } = action.payload;

    yield put(setOnlineAction({ online: running }));
}
```

The second approach has one less import and no `if` block so it seems better.

It is important to stress out however, that the first solution is the officially suggested one from the redux toolkit docs (https://redux-toolkit.js.org/api/createAction#actioncreatormatch) while the second one is just something I found on stackoverflow. Considering what I want to do is fairly simple (assume the received action type is the one I expect it to be and to be able to see its payload props as suggested autocomplete options in my IDE), I see no possible problems arising from using the second solution.

Also I found out that `redux-saga-test-plan` is the suggested way to test `redux-saga` as per the latter's documentation.

Trying to add `jest` and I am facing some issues regarding the global availability of the `describe` variable, despite running the `jest --innit` command + adding `ts-node`, jest types and node types AND configuring a `ts.spec.config` file. I probably missed something since I was in a hurry. Should check https://stackoverflow.com/questions/54139158/cannot-find-name-describe-do-you-need-to-install-type-definitions-for-a-test after I resume work.

In the end I added `jest`, `@types/jest`, `@types/node`, `ts-node`, the `types` property to my `ts-config` with values "jest" and "node" and the `jest` property set to `true` in my eslint `env` property and I was able to get it to work. Also, just for the fun of it I added `jest-extended`. It has some extra matchers that might be proven useful. Usually I don't add something before I actually need it, but in this case I also wanted to test adding custom setup files that customize the testing environment and it was a good chance to do so.

I also added coverage check for the application and that introduced some new concerns, as I am not exactly sure as to how to test fairly straightforward files like action creators, or the redux toolkit hooks (`useAppDispatch` and `useAppSelector`). I will need to look into that in the future or maybe even exclude them from the test coverage.

## 10 August 2021

I am trying to make `redux-saga-test-plan` to work and it seems there is an issue with `jest`, because when I run my test, it uses an action from another file, in which I import a function from another file and said file is a module which my test can't find. It seems like a configuration issue with either `jest` or maybe `tsconfig.json` or even `package.json`.

Basically what is happening is that the test fails to run because it imports a file which imports

```ts
import { withPrefix } from '@utils/withPrefix';
```

If I change the above import statement to

```ts
import { withPrefix } from '../utils/withPrefix';
```

The test runs, so it seems that `jest` fails to recognize the paths specified in the `tsconfig.json` file.

Going over the jest docs it seems there is a property called `moduleNameMapper` (https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring) that is used to stub out modules, so I should try to map my aliases to their absolute paths to make them visible to my `jest` configuration.

Fixed it by adding

```json
{
    "moduleNameMapper": {
        "@utils(.*)$": "<rootDir>/src/utils$1"
    }
}
```

to my `jest.config.ts`.

A couple of points of interest:

-   I thought `<rootDir>` was a placeholder value for my actual rootDir. It is not. You have to literally add it to the path.
-   It seems it follows a unix like arguments format, basically handling anything past `@utils` with the `$` symbol. So everything I type past the alias is used as a param to be added on the property value to the right. Did not expect this kind of dynamic coding in a configuration file.

I also added all the other aliases I already use and it also means this configuration property will need to always be up to date with the `paths` property of `tsconfig.json` file.

Next I have to add `react-testing-library` (should I write an ADR for that? It feels like I should write an ADR for that).

I wrote an ADR for that.

I always have to google for a couple of minutes the "refers to a value, but is being used as a type here" error when it always ends up being a `.test.ts` file that should be named `.test.tsx`.

I also encountered a little bit of a rabbit hole while trying to add import `'@testing-library/jest-dom/extend-expect'`. Apparently later versions of the library lack the type definitions as described here: https://github.com/testing-library/jest-dom/issues/123, in order to avoid the "risk people getting autocomplete suggestions when jest-dom has not been configured properly."

I have to say, when it comes to toolchain configuration stack overflow tends to be a bit of a wild place, with people's answers starting with "in my case I had to `[block of code]` which means they got it to work, but are not sure why it is working. Like, in the post I read (https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany) the accepted answer suggests installing an _earlier_ version of the library in order to get the built-in type definitions, while one could argue that the supposedly best approach is to bear the burden of the additional dependencies / configuration and get the latest version, while also ensuring your toolchain configuration is ready to support future versions of the library.

I spent an hour trying to configure `jest` to make sense of `tsx` components and `import` statements, reading many answers and blog posts suggesting a variety of different configurations. In the end the solution was to set the `testEnvironment` to `jsdom` in the `jest.config.ts` file and updating my `.babelrc` file with react preset and node as the target environment:

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ],
        "@babel/preset-react"
    ]
}
```

For some reason I also had `"@babel/react"`. Not sure how it ended up there, could not find a preset named like that in the docs either (https://babeljs.io/docs/en/presets/). Could it be that I was meaning to add `"@babel/preset-react"` and made a typo?

The problem I am currently facing is that the page I am currently trying to test is connected to the store in order to dispatch a simple action and I am getting the error "could not find react-redux context value; please ensure the component is wrapped in a `Provider`", which makes sense. I remember the `testing-library` docs mentioning something about a custom `render` component that I can use in order to wrap my component-to-test with any provider that I need. But I know I am on a good path to solving the initial issue because removing the `dispatch` action and testing for something simple I am able to render the component and run the test successfually.

This is what I was remembering: https://testing-library.com/docs/react-testing-library/setup#custom-render should resume from here.

## 11 August 2021

I added a custom `testUtils` file that exports everything from `@testing-library/react` plus an overriden version of the `render` function that wraps the component it receives will all the application providers (currently just the store provider). Took me around 10 mins to correctly type everything, since the example provided above has some clashes with my eslint setup (I also had to provide typing for the `wrapper` prop and `AllTheProviders` component).

With this addition the test runs and I am able to test a component that is connected to the redux store. I do wonder though if instead of overriding the current `render` export with my `customRender` one, it would be best to export both of them, in order to retain the flexibility of using the simpler `render` function when I want to test components that are not connected to the store. I think this makes sense, especially for presentational components (although this classification is slowly fading away these days).

In the end I did rename `customRender` to `renderWithProviders` in order to keep the default `render` around. I contemplated naming the new function `renderWithStore` to be more specific since in the future I might add more providers (like the classic light / dark theme one for example), but this would mean that I would have to make a mental or typed note to go back to this file and rename the function to `renderWithProviders` since `renderWithStore` would be lacking. No reason to have such kind of notes in the back of one's head in my opinion, so I chose the more generic variable name to be future proof.

Now, considering I am overriding (even for a single function) the `@testing-library/react`, this means (as the docs suggest) that instead of importing my testing functions from `@testing-library/react`, I will be importing them from my `testUtils` file. This immediately differentiates this file from all the other "utility" files of the `utils` directory and makes me want to add it to a directory of its own.

I also added `index` files to `utils` and `testUtils` directories. This meant updating the `paths` property in `tsconfig.son` but not in `jest.config.ts`. This makes sense, `tsconfig.json` was hard-replacing `@path/*` with `@path/*` so the existence of `/` made a difference, whereas `jest.config.ts` is a bit more clever with its replacements. I may do that for all other directories too to avoid having to specify the directory sub-folder when I import something specific from an alias. Will leave that change for later as the need naturally occurs.

All in all, it's coming along nicely. Now I need to setup the network layer of the front end application, meaning installing the apollo client dependency, configuring a client instance and exporting its `query` and `mutate` methods, then creating relevant redux actions for both of them and a redux saga (or two, we will see) to handle the dispatched actions.

## 16 August 2021

Continuing from where I stopped, I want to create the network layer of the front end part of the application. This means:

-   installing `@apollo/client`
-   creating a `client` and then exposing its `query` and `mutate` functions.
-   creating corresponding redux actions, sagas and reducer cases that will handle said actions.
-   wrapping everything up by performing a query to my back end, retrieving results and then exposing them.
-   making sure each of the above cases is tested.

I restructured the `pages` directory a bit, creating a `Main` folder to contain the previously named `index.tsx` file, which now was renamed to `Main.tsx`. My aim was to prepare the `pages` directory for the `ducks` pattern, meaning I had to have folders to contain my modules. Since I want my new `Main.tsx` component to match the `/` route I also created a new `pages/index.ts` file that exports the `Main.tsx` component

At this point I considered installing `apollo-boost`, but I quickly dropped the idea. Firstly, bootstraping anything goes against the core idea of this project, which is to manually add everything by myself in order to experience and learn from the configuration process. Secondly, inspecting the `apollo-boost` dependencies I can see that it lists `apollo-client` and not `@apollo/client`, meaning it has no `3.x.x` version support. Also, for what it's worth and if we abide by what versioning numbers are supposed to indicate, at the time of writing this `apollo-boost` is at version `0.4.9` and any `0.x.x` version is considered not stable and prone to be updated without backwards compatibility in mind. For the above stated reasons, moving forward with installing each package on my own is the most sensible thing to do.

I created an `api` directory to initialize my apollo client configuration. I quickly reminded myself that I should use the ducks pattern, meaning this new directory should _not_ contain sub-directories that refer to pages, components, containers etc. Instead, I will just create and export the client configuration and then create `api` sub-directories in each (modular) folder.

I created an `errorLink` as per the docs example, however I do need to make sure I handle the error logging in the redux layer (and subsequently with a toast notification) and certainly not by console logging the errors.

Also, I would like to take a look at schema introspection, to make sure that my server exposes its `schema` to my client and any changes are easily cascaded to it.

I added the `apollo.ts` file which exposes an apollo client as well as custom `query` and `mutation` methods on it. In order to fully type these two methods I used a couple fancy types (specified in `src/api/types.ts`) which basically boils down to copying how `apollo-boost` defines `ExecutionResult` and then wrapping everyhing in a high level function type.

Right now I wonder what is the best approach to expose these network calls as redux actions.

In my current professional project, my team uses a custom `actionCreator` that based on an argument (`simple` or `event`) would extend a redux action with two properties to indicate a success or fail result, both of which being the original action `type` plus `_succeeded` or `_failed` suffixes. The main idea was that an event action initially dispatches its `action.type` then based on the outcome a `redux-observable` epic would dispatch `${action.type}.succeeded` or `${action.type}.failed`, which were equivalent to `${action.type}/SUCCEEDED` and `${action.type}/FAILED` respectively. These actions would in turn be handled by other epics or reducers. All that jazz was necessary to allow us to bypass the declarative data fetching nature the apollo client hook api introduced, in order to be able to separate the concepts of "component" and "fetching/mutating". A component would dispatch `getSomething` or `doSomething` and everything would be handled in the redux layer, in contrast to importing GQL queries and apollo client hooks and handling the data fetching (as well as the `error` and `loading` states) inside the component itself.

My only concern is actually going to these lengths in order to be able to impose my way of handling network calls on my current apollo client configuration. Also, creating a custom action creator would mean messing around with the way `redux toolkit` is currently handling things, either by bypassing it or by using it in my custom solution.

This does make me wonder if it is worth adding all this custom code on top of `@apollo/client` in pursuit of the separation of concerns paradigm. I think I might have to revisit my decision, at the very least to confirm it.

## 18 August 2021

I decided to post a question over at `/r/reactjs` regarding my concerns. I was lucky enough to have acemarke (among other things: a redux maintainer) answer, providing
excellent food for thought.

Fully separating the concerns means fully separating the technologies. Indeed, in my current development plan my component dispatches a generic "fetch" action, a saga detects it and performs the network call, then receives the data from the back end, stores it in the redux store, then the component detects the change to the store connected variable and proceeds with using it. In this scenario the component does not know how the call is performed (axios or apollo, graphql or rest), actually it does not even know that a call is performed at all. For all it is concerned, it just dispatches an action. Separating the concerns of "fetching" and "displaying" effectively meant separating the technologies of "apollo" and "react".

Think of the ducks.

Previously I wrote that I plan on using the ducks pattern, which advocates for modularity. I was wrong to think that by separating the technologies in different files (under the same folder), I would also be achieving separation of concerns. By structuring each component folder as a separate but fully fledged module, I mesh the technologies together into a single folder-entity, thus merging the concerns.

acemarke mentioned that the introduction of hooks fundamentaly changes the way we perceive our applications. A trully "concern free" component would be receiving additional functionality / data via its `props`. This means a development style that implements higher order components to enhance basic components. The moment external functionality or store variables are introduced via hooks (not via `connect`), the component is "concerned" (has knowledge of) `redux`, `dispatch`, and `selectors`. It is no longer "concern free".

The full reddit thread can be found here: https://www.reddit.com/r/reactjs/comments/p6e9m4/separation_of_concerns_design_principle_and/

acenarke was also kind enough to provide external resources. for further reading. I am ashamed to admit that I had read his blog post regarding separation of concerns when using redux in the past. This means it was a resource that if applied to my case, was answering my question, but I had not fully understood at the time I was reading it. This is a lesson in being more focused and open minded with my studies. Also, a lesson that all developers learn: you best learn something when you build it.

To wrap up this extremely interesting discussion in acemarke's own words: **code that changes together should stay together**.

Having a more clear view on the matter, I decided to use apollo's hook API.

I wrapped my `_app.tsx` component with the `ApolloProvider` and updated my `api` folder to only export the apollo `client`. I also removed the custom types I had previously added since they were redundant. I also added the new provider to the custom `render` method I am exporting from the `testUtils` directory. Naming the variable `AllTheProviders` paid off :P.

Now I want to add a simple network call to my `Main.tsx` component (the `/` route of the application) to fetch some data from my server and display them on the front end. This is the moment of truth!

In the end it was wrong to have my actual apollo provider in the testing utilities file. Makes sense. I added an additional type to be exported that describes the graphQL mocks, basically the `MockedProviderProps['mocks']` type, so that I don't have to type it each time.

Currently, what I kind of don't like is that my tests need to wrap the component with apollo's `MockProvider` component and I also have to set `addTypesNames` property to false each time:

```tsx
it('fetches and displays the server information message', async () => {
    const expected = `server message: ${mockServerMessage}`;
    const { getByText } = renderWithProviders(
        <MockedProvider mocks={GQL_MOCKS} addTypename={false}>
            <Main />
        </MockedProvider>
    );

    expect(getByText('loading')).toBeInTheDocument();
    await waitFor(() => expect(getByText(expected)).toBeInTheDocument());
    expect(getByText('finished loading')).toBeInTheDocument();
});
```

I am thinking of creating a HOC that will wrap my `Main` component with `MockedProvider` and also provide it with the `mocks` and `addTypename` (set to false) properties.

My custom solution was the following:

```tsx
///testUtils.tsx
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';

export type GQLmocks = MockedProviderProps['mocks'];

export const withApolloMocks =
    (mocks: GQLmocks) =>
    (Component: ReactElement): JSX.Element =>
        (
            <MockedProvider mocks={mocks} addTypename={false}>
                {Component}
            </MockedProvider>
        );
```

and now the previous snippet:

```tsx
const { getByText } = renderWithProviders(
    <MockedProvider mocks={GQL_MOCKS} addTypename={false}>
        <Main />
    </MockedProvider>
);
```

can be written like this:

```tsx
const { getByText } = renderWithProviders(
    withApolloMocks(GQL_MOCKS)(<Main {...defaultProps} />)
);
```

Next I want to enable schema introspection for my back end server, so that the client can always be up to date with any schema updates. I should pick up my reading from here:

https://www.graphql-code-generator.com/

update: I have been trying to find a sensible way to introspect my server for a good hour now. Am I missing something? The previous link assumes I have the `schema.graphql` file at my server. I found the `rover` package on `npm` and I was actually able to introspect my server, but I have been having a hard time writing the ouput (which is not exactly a schema, not sure of the format) to a file. Am I missing something obvious?

Hitting the 2 hours mark, I have to say writing `.yml` files and, most imporantly, trying to make sense of their weird errors is a bit irritating.

I finally got it to work. Basically, it came down to showing **absolute and ironclad** respect to the format (spacing, columns, etc) of the `.yml` file. I also had to add the following packages:

-   `@graphql-codegen/add`
-   `@graphql-codegen/cli`
-   `@graphql-codegen/typescript`
-   `@graphql-codegen/typescript-resolvers`

and also exclude `codegen.template.yml` and `codegen.yml` from my prettier configuration.

I also created a script to generate the schema from a target environement, or `http://localhost:4000` if one is not provided.

So now I can generate an `api.ts` file containing all the types defined by my server `schema` and thus I can quickly cascade any schema changes to my client (prefixed with `Api` to denote they correspond to server defined types).

Currently considering what I should do next. I think I should revisit my `NextJS` notes, to refresh what I learned regarding SSG and SSR, as well as check out some examples of `NextJS` + `Redux` implementations. Then it would probably be time to add `@material-ui` to my codebase and start setting up the UI layer of the application. This includes deciding on a UI to copy (:P this is **not** a _design_ personal development project :P), designing with a mobile-first approach, taking care of SEO and accessibility (the latter is a super gray area for me, there is some reading to do there) and building the pages one by one. But generally speaking, I think the overall infrastructure is at a good (all things consider) point and I can focus my attention on the UI layer, at least for now.

## 28 August 2021

I am reading through `NextJS`'s documentation, going over the SEO parts that interest me, starting with the `<Head />` component. It seems that each distinct page imports it then uses it with its own set of properties, so there is no "merging" of different `<Head />` components going on.

The documentation itself is clear on that:

_"The contents of head get cleared upon unmounting the component, so make sure each page completely defines what it needs in head, without making assumptions about what other pages added."_

What I want to do next is actually start building the UI of my application. This means (considering I do not plan to create the components myself but merely style the overall result a bit) that I need a component library. I will be using Material-UI (https://material-ui.com/), mainly because I have experience in using and setting it up and I would like to speed up the UI development. But for the sake of keeping a development diary, I want to point out that if I wanted to actually make a case study of how to style / create the UI of the application I would follow these steps:

-   Identify application scope and needs (maybe this is an application that really needs to stand out and be unique in terms of design).
-   Based on previous, consider bootstrap-like solutions like component libraries (e.g `material-ui`) or opt for solutions that facilitate custom styling options (like `styled-components`). Consider libraries like `TailwindCSS ` that exist in the middle of the spectrum, allowing centralized styling with enhanced customization options.
-   Estimate implementation effort (integrating it into the existing project) and how easy it would be to opt out for a different design solution in the future (how easy would it be to transition from one solution to the other, what reasons would lead to that decision, are said reasons present now or possible to be present in the future?).

Before installing `material-ui` and setting it up (I intend to set up a custom theme, for the sake of displaying how to do so and because in a professional setting I would have a designer suggesting alterations on the default theme so I would need a centralized way to cascade all the changes) I want to decide on...what to copy. I will be looking around the web for professional and personal projects alike, in order to find a design that I like (this needs some clarification) and then proceed to recreate it with `material-ui`.

What I am looking for:

-   Simple, clean, intuitive design (I am fully aware I just recited the holy trinity of application design).
-   All the basic options one would expect from an e-commerce site: navigation to products / other pages, search bar, mini cart.
-   Simple color palette.
-   No "attack the eye" solutions (huge jumbotrons, flashing texts, striking contrast, fast carousels).

The site will include a "login" button, but considering what a logged in user commonly has access to (wishlists, purchase history, personalized suggestions) it falls under the "extra milestones" of the project, so upon clicking it the button will just display a mock. And now that I think about it, it would be a nice place to have a CSS animation of some kind playing, which _is_ a milestone of the project.

I will check out domestic and international retail sites, as well as portfolio projects. Will not list what I checked and what I like / dislike about them. I am not a designer and also don't think that critiquing other people's work publicly is a nice thing to do, _especially_ when not asked to do so. I will just focus on finding an approach that I like and implement it.

## 29 August 2021

I set up a codebox to quickly experiment with layouts and ideas. The way I am thinking it I will need:

Landing Page:

-   a container to hold everything centered in the page
-   navigation bar on the top
-   footer with basic info, maybe some links like faq, my bio, something like that.

Product Listing Page:

-   Same as above plus a sidebar with filtering options and a breadcrumb menu.

Product Details Page:

-   Same as Landing Page and a breadcrumb menu.

What I am going to do is have a `components` folder that will strictly define all the material ui or custom components that I will be using (the simple, low level re-usuable ones, that is) and then use them to create higher level yet still re-usuable components like the navigation bar and the footer. I will then create a `Layouts` folder that will wrap all my pages with the default layout.

I also need to decide on a color pallete.

Some sites that are useful for this kind of task:

-   https://2colors.colorion.co/ (2 color palette)
-   https://www.happyhues.co/palettes/1 (6 color palette)
-   https://coolors.co/palettes/trending (multi color palette)

I added the `@material-ui/core` and `@material-ui/icons` dependencies and set up a custom theme. My current problem is that I need variations on my palette. I already decided on a color palette that I like (https://www.happyhues.co/palettes/3), but by default material-ui defines three version for each color, `main`, `light` and `dark`, using them for hover animations and such. So I need to find a way to translate my `main` colors in their respective `light` and `dark` versions.

Actually, after going throught the official docs (https://material-ui.com/customization/palette/) it seems I do _not_ need to provide the `light` and `dark` variations, as they will be dynamically calculated if I provide the `main` one. That's cool.

Next I would like to use a custom font, so I will be using https://fonts.google.com/ to find one.

It seems I need to override the default `document` component (https://nextjs.org/docs/basic-features/font-optimization).

For reference, importing itvia a custom `font.css` file in `_app.tsx` also seems to work

```css
/* /src/styles/font.css */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR');

body {
    font-family: 'Noto Sans KR';
}
```

```tsx
import React from 'react';
import { AppProps } from 'next/app';

import '../styles/font.css';

//...
```

But I do not really like this approach, because I would rather let `Next` handle serving my font and also it's generally good approach to serve your application's fonts yourself and not force the user's browser to fetch it, so I will be ditching this solution to make it work the right way.

While meddling around I added a `public` folder with `robots.txt` and a `favicon.ico` files.

Hitting the one hour mark, why is this so hard? Am I missing something obvious?

The official documentation exampels does not work:

```tsx
// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
```

Alright, so, I was indeed missing something.

Adding the stylesheet link to my app head meant the font was available to my application. Trying to add the font to my material-ui theme was not working, but hardcoding the `fontFamily` in my tsx code was actually working.

this works:

```tsx
//Main.tsx

//...
<h1 style={{ color: 'orange', fontFamily: 'Inter' }}>Hello World!!</h1>
//...
```

but this doesn't:

```ts
const typography: TypographyOptions = {
    fontSize: 16,
    fontFamily: 'Inter',
    h1: {
        color: '#094067',
        fontFamily: 'Inter',
    },
};
```

I guess if I want to serve a font I have to do it either via material-ui (https://material-ui.com/customization/typography/#self-hosted-fonts), or by creating a generic css file and importing it in my application (basically what I initially did).

Material-ui's way of doing it requires more code and also to install a plugir or loader in my build process to handle the different font file formats. Considering my "build process" is entirely NextJS' business I would rather just import the font file in the `_document.tsx` file and move on with my life.
