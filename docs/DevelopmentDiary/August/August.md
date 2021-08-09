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
