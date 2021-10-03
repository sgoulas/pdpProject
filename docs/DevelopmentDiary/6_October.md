## 1 October 2021

I further improved the test coverage by leveraging the `rerender` function exposed by react testing library's `render` method to test that the `ImageWithFallback` component rerenders as expected. Furthermore, upon inspecting the jest snapshot I found out that the text of the `describe` function gets prepended to the text of each `it` function. That means that I should remove the `suite` word from my `describe`s in order to have my test ouputs resemble more natural language.

Regarding implementing the `DUCKS` pattern in my store (https://github.com/erikras/ducks-modular-redux) it seems there is a difference between it and the modular proposal of law of Demeter. `DUCKS` advocate for everything in a single file, so actions, action creators and reducer all go in a single file, under the 'module' that needs them. The law of Demeter does not seem to incdicate a specific structure, rather that no 'reach through' takes place, meaning if in a chain of `a->b->c` `a` can call `b` but if `a` needs `c` it should invoke it via `b` and not reach to it _through_ `b` (https://en.wikipedia.org/wiki/Law_of_Demeter).

The structure I originally had in mind was something like this:

```
___module
        |
        Thing.tsx
        |
        Thing.test.tsx
        |
        apiDir
        |
        componentsDir
        |
        storeDir
                |
                actions.ts
                |
                reducer.ts
                |
                sagas.ts
```

So, a modular approach, but strictly speaking not `DUCKS`. If I had to structure it like `DUCKS` proposes it would be something like this:

```
___module
        |
        Thing.tsx
        |
        Thing.test.tsx
        |
        apiDir
        |
        componentsDir
        |
        module.ts
```

where `actions`,`reducer` and `sagas` would be inside `module.ts`. Again, in spirit this is the same approach. A `module` folder contains everything that it needs so that it can be attached or move around and function virtually the same, since it contains everything relevant to it and exposes an "interface" to the outer world (the component that it renders in my case, or whatever else it uses to communicate with the codebase generally speaking).

How does it scale though? Erikras on their github (https://github.com/erikras/ducks-modular-redux) writes "I have been keeping these in separate files and even separate folders, however 95% of the time, it's only one reducer/actions pair that ever needs their associated actions.". One of the provided examples can be found here: https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/modules/auth.js and it features 9 different actions. Now, some of them are status ones, so you have `LOAD`, `LOAD_SUCCESS` and `LOAD_FAIL`, all of which would be handled by apollo client's declarative data fetching nature so I would not need to ever define them. But, for the sake of discussion let's assume they are all different, entirely unique actions.

Personally, and this is important to stress out, I think putting everything in one file is not so scalable if it's different things. If you have some actions and their senders and a reducer case, sure, throw them in a file, it's like 30 lines tops. But if you want it to scale to 30 actions, 30 action senders and 30 action handlers, suddenly you scroll through a 200 (or more) lines file of different things. Also, and again this is a personal opinion, if a dev opens a 500 line file and sees 500 things of the same type one after the other, it's ok, they are gonna think it's huge, but it's manageable because everything has the same structure and so they can blitz their way through searching for what they need. If they open a 300 line file and see 3 stacks of different things (actions, senders and handlers in this case) with each stack being responsible for something else, they are gonna raise some eyebrows. So, modulatiry, yes, but scaleability too. Of course, this is assuming a case of a really large module. A module which would number actions in the low hundreds, or maybe "just" close to 100. What purpose would such a large module serve? At one point one might think that this module "has" to be breakable into smaller ones so the end result would be modules which need few enough actions to justify putting them into one place. This might be true, but I still believe that even for small use cases maintaining a few files is better than maintaining a single file. At the end of they day I think jumping between 3 files is almost the same as jumping between 3 points in a single file, with the added benefit you can always find the file in contrast to having to find the specific line in the file.

Also, and this is an afterthought on the initial argument but I think it holds true, having a dedicated `store` folder under a `Module` folder solves the naming problem. You can expect that each `store` folder will have an `actions` folder, a `reducer` folder, maybe a `sagas` folder and if you see them you immediately know what's inside them. You can't tell exactly what they do, but you know how they connect and interfere with each other.

Having everything into a single file introduces the problem of picking the correct name for the single file. Let's say I create the `cart` module, which handles the customer's cart. What would I have to name this file according to `DUCKS`? It would have to be something along `cart.ts`. What if I have a `Cart.tsx` in the same module? How can someone that hasn't opened these files know beforehand that `cart.ts` is the redux related functionality and not (let's say) a logical extraction of the `Cart.tsx` component's business (something that unless I am mistaken is considered a `model`)?

For the reasons above I will be moving forward with separate files for each redux related module functionality.

Having decided on that, I contemplate between implementing the `cart` module and its relevant files or investigating redux state persistence. At the end of the day I will do both, but I think the order matters. I believe investigating persistence first makes sense, because it will probably affect the central `store` files and possibly others that I do not foresee now, whereas the `cart` module will be exactly that, a module that I can work in isolation without affect the rest of the application, so it makes sense to break some eggs now before adding more eggs to the basket.

And I _will_ work in a separate branch for that. This was a big reason I worked on improving the test coverage to levels acceptable by the initial scope (a line I like to consider red, at least in the context of an educational project like that), so that my MRs can pass the simple pipeline I introduced. This is also an interesting take on organizing things, I myself decided on test coverage, but by working on the `main` branch I was able to circumvent them. The moment I made a simple pipeline, I needed a real life scenario to test it, so I added a pull request test coverage rule. Later, when I need to work on a fairly complext feature, I have to work in a separate branch, which means having to have good test coverage, which means I had to write tests before starting work on the actul thing I wanted to make. But the actual thing I want to make is not an ecommerce site, it's a good project that will teach me stuff. And this also means tests. And self discipline I guess.

Pick up from:

-   https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
-   https://www.robinwieruch.de/redux-persist-next-js
-   https://github.com/vercel/next.js/tree/canary/examples/with-redux-persist

## 3 October 2021

I was able to make the redux state persist by following the documentation of redux-toolkit (https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist). However, I was not able to find any solution to making it work with `NextJS`. The main idea is that if the code runs on the web (so, the app is compiled and deployed and runs in a browser) the `store` that is returned should be the persisted store, whereas if the code runs in `Node` (so in my case at build time) it should return a new store instance (and this could be merged with an existing store instance or whatever).

My main obstacle is making everything work together. I have found documentation for `redux-persist` + `redux-toolkit` and I have found documentation for `redux-persist` + `NextJS`. But I was not able to find an example of all of them working together, let alone in `typescript`. `Typescript` + `redux-toolkit` means I export `RootState` and `AppDispatch` alongside my `store` instance and the first two require the latter. All the `NextJS` examples I found were exporting a `makeStore` function that depending on whether the code was running in the client or in the server was returning the result of the `createStore` with or withought the `persistedReducer` configuation. When I tried to replace

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

with

```ts
export type RootState = ReturnType<typeof makeStore().getState>;
export type AppDispatch = typeof makeStore().dispatch;
```

I was getting the following error:

```
A non-serializable value was detected in an action, in the path: `register`. Value: [Function: register]
Take a look at the logic that dispatched this action:  {
  type: 'persist/PERSIST',
  register: [Function: register],
  rehydrate: [Function: rehydrate]
}
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)
```

I could always dive in the `types.d.ts` file and excavate the correct typing, but this would make the `store` file too complicated.

At the end of the day, persistent server side store is not going to be needed in my application. It is however strictly speaking something I was not able to figure out.
