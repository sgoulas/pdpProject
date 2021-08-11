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

If I chance the above import statement to

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

The problem I am currently facing is that the page I am currently trying to test is connected to the store in order to dispatch a simple action and I am getting the error "could not find react-redux context value; please ensure the component is wrapped in a <Provider>", which makes sense. I remember the `testing-library` docs mentioning something about a custom `render` component that I can use in order to wrap my component-to-test with any provider that I need. But I know I am on a good path to solving the issue because removing the `dispatch` action and testing for something simple I am able to render the component and run the test successfually.

This is what I was remembering: https://testing-library.com/docs/react-testing-library/setup#custom-render should resume from here.

## 11 August 2021

I added a custom `testUtils` file that exports everything from `@testing-library/react` plus an overriden version of the `render` function that wraps the component it receives will all the application providers (currently just the store provider) of the application. Took me around 10 mins to correctly type everything, since the example provided above has some clashes with my eslint setup (I also had to provide typing for the `wrapper` prop and `AllTheProviders` component).

With this addition the test runs and I am able to test a component that is connected to the redux store. I do wonder though if instead of overriding the current `render` export with my `customRender` one, it would be best to export both of them, in order to retain the flexibility of using the simpler `render` function when I want to test components that are not connected to the store. I think this makes sense, especially for presentational components (although this classification is slowly fading away these days).

In the end I did rename `customRender` to `renderWithProviders` in order to keep the default `render` around. I contemplated naming the new function `renderWithStore` to be more specific since in the future I might add more providers (like the class light / dark theme one for example), but this would mean that I would have to make a mental or typed note to go back to this file and rename the function to `renderWithProviders` since `renderWithStore` would be lacking. No reason to have suck kinds of notes in the back of one's head in my opinion, so I chose the more generic variable name to be at peace.

Now, considering I am overriding (even for a single function) the `@testing-library/react`, this means (as the docs suggest) that instead of importing my testing functions from `@testing-library/react`, I will be importing them from my `testUtils` file. This immediately differentiates this file from all the other "utility" files of the `utils` directory and makes me want to add it to a directory of its own.

I also added `index` files to `utils` and `testUtils` directories. This meant updating the `paths` property in `tsconfig.son` but not in `jest.config.ts`. This makes sense, `tsconfig.json` was hard-replacing `@path/*` with `@path/*` so the existence of `/` made a difference, whereas `jest.config.ts` is a bit more clever with its replacements. I may do that for all other directories too to avoid having to specify the directory sub-folder when I import something specific from an alias. Will leave that change for later as the need naturally occurs.
