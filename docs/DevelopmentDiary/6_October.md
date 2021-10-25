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

Now the next thing to do is create the cart. This means a number of things:

-   Cart related state slice to store the cart items alongside cart related actions like `increase`/`decrease` items, `remove` item, `empty` cart etc.
-   Mini cart component in the existing `NavBar` component that shows all the items currently in the cart plus cart related UI actions.

I contemplate implementing the cart as a `useCart` hook. The cart as a concept (meaning UI or actions related to id) is something that I am going to use in the navigation bar, in the product details page and in the checkout page. All these pages are going to use actions that modify the cart. At the same time, I will create a `MiniCart` component that will display the current status of the cart. This implies a UI. This is a case where I have a `model` (the cart) whose data and data related actions are needed both per se and tied to a UI. So the best approach is to extract any logic into a reusable hook and then use this hook anywhere I need.

While setting up the hook I read that `createSelector` from `redux-toolkit` is basically a re-export of the `createSelector` from `reselect` and that it (`createSelector`) actually returns a memoized version of the selector I create. This is really nice.

Also, how cool is the ability to construct selectors of existing selectors?

```ts
export const cartProductsSelector: (state: RootState) => ApiProduct[] = state =>
    state.cart.products;

export const cartProductsTotalCost: (state: RootState) => number =
    createSelector(cartProductsSelector, cartProducts =>
        cartProducts.reduce((acc, curr) => acc + curr.price, 0)
    );
```

My initial `useCart` is this:

```ts
export interface UseCart {
    totalPrice: number;
    products: ApiProduct[];
    actions: {
        addToCart: (product: ApiProduct) => void;
        removeFromCart: (id: string) => void;
        emptyCart: () => void;
    };
}

const useCart: () => UseCart = () => {
    const totalPrice = useSelector(cartProductsTotalCostSelector);
    const products = useSelector(cartProductsSelector);

    const addToCart = useCallback(
        (product: ApiProduct) => addToCartAction({ product }),
        []
    );

    const removeFromCart = useCallback(
        (id: string) => removeFromCartAction({ productId: id }),
        []
    );

    const emptyCart = useCallback(() => emptyCartAction(), []);

    return {
        totalPrice,
        products,
        actions: {
            addToCart,
            removeFromCart,
            emptyCart,
        },
    };
};
```

The reason I am memoizing the actions is so that I can use them from inside the hook. This is because `useCart` should expose everything related to the cart, its store actions included.

As I am writing my reducers I decided to check the difference between relying on the built-in `immer` vs handling immutability on my own:

without relying on `immer` and by making sure I handle the state in an immutable way:

```ts
const handleAddToCart: ActionHandler<CartState, AddToCartActionPayload> = (
    state,
    { payload: { product } }
) => {
    const indexOfProductInCart = state.products.findIndex(
        cartProduct => cartProduct.product.id === product.id
    );

    if (indexOfProductInCart === -1) {
        return { products: [...state.products, { product, quantity: 1 }] };
    } else {
        const newState: CartState = {
            products: state.products.map((cartProduct, index) =>
                index === indexOfProductInCart
                    ? {
                          product: cartProduct.product,
                          quantity: cartProduct.quantity + 1,
                      }
                    : cartProduct
            ),
        };

        return newState;
    }
};
```

with relying on `immer` and handling the state in a mutable way:

_notice that the handler in this case returns void (https://redux-toolkit.js.org/usage/immer-reducers#immer-usage-patterns)_.

```ts
const handleAddToCart: ActionHandler<CartState, AddToCartActionPayload> = (
    state,
    { payload: { product } }
) => {
    const indexOfProductInCart = state.products.findIndex(
        cartProduct => cartProduct.product.id === product.id
    );

    if (indexOfProductInCart === -1) {
        state.products.push({ product, quantity: 1 });
    } else {
        state.products[indexOfProductInCart].quantity += 1;
    }
};
```

I got to say, there is a big difference even in this simple reducer case.

Added `jest-mock-extended` so that I can mock my interfaces and thus reduce the amount of setup code I have to write in tests.

I am also going to add a central "mock" state of the same type as me application state so that I can import it in my selector tests. Tried mocking the whole state but for some reason when it runs inside `expect` it returns undefined.

I think that memoizing the functions exposed from `useCart` provides no optimization value. A custom hook runs at each render of the component so memoizing its functions is not going to prevent re-renders. If the hook exposes some value and this value changes then the component will re-render. If the component renders because something out of the scope of the hook changed, then the hook is going to run again nevertheless. If the hook returns a function and I need to pass this function to child component _then_ I can memoized it with `useCallback` to prevent unnecessary re-renders in the child component. The only case in which I would need a memoizing of the functions in the hook would be one where a parent uses the hooks and passes its exposed functions to a child component as they are, but in this case one would wonder why I am not using the hook inside the child in the first place.

## 5 October 2021

I cleaned up my `useCart` hook so that the exposed functions that dispatch a store action did not duplicate the existing types:

so this

```ts
addToCart: (product: ApiProduct) => void;
```

changed to this

```ts
addToCart: (payload: AddToCartActionPayload) => void;
```

which is strictly better because the single source of truth for the type of this function is `AddToCartActionPayload` whereas `product: ApiProduct` merely copied the typing and acted as a weird and redundant proxy.

I also added the `increaseCartInventory` and `decreaseCartInventory` to the hook.

One thing that I contemplated was changing the return type of `useCart` hoom from `UseCart` to `Cart` or `HeadlessCart`. I think the latter makes the most sense considering my custom hook is everything related to the cart component minus the user interface. Material ui has a "headless" `useAutocomplete` hook that exposes all the autocomplete functions and props and leaves the UI implementation to me, so changing my hook's return type to `HeadlessCart` seems logical. I am not going to make this change right now though, I would like to spend some more time on it.

Apart from that I think that the only thing remaining before merging this MR is to write some tests for the hook `useCart` itself (maybe for the `useDebounce` hook as well while I am on it).

## 9 October 2021

Not sure why I wrote that only testing remains, I still have to create the mini cart component. Anyways. I found that `react-testing-library` has a specific package to test hooks (https://www.npmjs.com/package/@testing-library/react-hooks) which seems super useful, so I added it as a dependency.

## 10 October 2021

Wrote a test for `useDebounce` hook to test the waters with `@testing-library/react-hooks` and started working on a test for `useCart` hook.

I was able to test `addToCart` action of `useCart` but when I begin writing the `removeFromCart` test I realized that in the context of my test file store updates persist through the tests. This means that if in the first test of the suite I add a product to the store, in the second test of the suite this product is still there. However, if I run only the second test, the store has no products because the first test did not run.

This does allow me to write sequential test cases where each test assumes the previous one run, but on the other hand there are two problems:

-   the tests can no longer run in isolation because each one assumes the previous ones run before it.
-   one test failing means all the tests after that may also fail if they rely on the first tests operations.

for these reasons I should reset the store between each test (and probably after all tests, I did not test it but there is a good chance the store updates persist between different jest tests.)

Now, I could create a `makeStore` function inside `@store/store.ts` and get a new store instance everytime I call it. The other option would be to create a `reset` action that resets the store state to its original one and call it inbetween tests.

I would normally opt for the `makeStore` approach, but my problem is that I have to export the types of `store.getState` and `store.dispatch` and I get errors when trying to do so with `makeStore()` instead of `store`.

This is closely related, if not the same, to the problem I had with trying to configure a global state for both server rendered and static pages when implementing the persisted store. I added a new section in the `TODO` file called `Questions` to make sure I revisit the subject in the future.

I left the `buyNow` test of the `useCart` action last, because inside its body it also redirects the user to a new page and this meant I will have to mock the `router` and test that it will be called with the expected parameters.

btw

How freaking awesome is `jest.requireActual` (https://stackoverflow.com/questions/59312671/mock-only-one-function-from-module-but-leave-rest-with-original-functionality).

In my current professional project we spy on the default hooks with `React.use<Hook>`, but with this I can spy on the specific hook without having to change the way I write my component code. Sweet.

After spending almost 3 hours digging through stackoverflow questions, jest's documentation and nextjs' github issues I was able to mock the `useRouter` and test the `buyNow` function.

What did **not** work:

```tsx
it('buyNow', () => {
    const mockPush = jest.fn();
    jest.mock('next/router', () => ({
        ...jest.requireActual('next/router'),
        useRouter: () => ({ push: mockPush }),
    }));

    const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
            <ReduxProvider store={store}>{children}</ReduxProvider>
        ),
    });

    act(() => {
        result.current.actions.buyNow({ product: mockProduct });
    });

    expect(store.getState().cart.products).toStrictEqual([
        { product: mockProduct, quantity: 1 },
    ]);
    expect(mockPush).toHaveBeenLastCalledWith(checkoutPage());
});
```

what **did** work was using good old `spy`:

```tsx
it('buyNow', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
            <ReduxProvider store={store}>{children}</ReduxProvider>
        ),
    });

    act(() => {
        result.current.actions.buyNow({ product: mockProduct });
    });

    expect(store.getState().cart.products).toStrictEqual([
        { product: mockProduct, quantity: 1 },
    ]);
    expect(mockPush).toHaveBeenLastCalledWith(checkoutPage());
});
```

Really not sure what was the problem with the first approach.

Now I have to create the mini cart component.

I also explicitly defined the types of the `useCart` actions so that VS code can infer them when using the hook in another component (previously it inferred them as `any` so I had no autocomplete functionality).

## 11 October 2021

I finished styling the mini cart component and added a `totalQuantity` result to `useCart` hook. Now, the only thing missing was to add tests for the new files. The problem I am currently facing is using redux store inside my tests or, to be more precise, using the redux store at a speciic state. I already import and use the store instance in my tests, but the crucial detail is that I am using the store at its initial state. There are a number of components which assume they are rendered at a specific store state or that they need different store states to be tested (like testing the mini cart component when there are items in the cart and when there aren't).

In order to work around this problem I have to implement a `makeStore` function that will accept an optional parameter for the initial store state and then create the store instance at the specific state, or a new one if no initial state was passed.

Once again, the constraining factor is dynamically determining the correct types for `RootState` and `AppDispatch` out of the function call.

This was my implementation:

```ts
export const makeStore: (
    initialState?: ConfigureStoreOptions['preloadedState']
) => EnhancedStore = (initialState = {}) => {
    const persistConfig = {
        key: 'root',
        version: 1,
        storage,
    };

    const persistedReducer = persistReducer(
        persistConfig,
        combineReducers({ app: appReducer, cart: cartReducer })
    );

    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: persistedReducer,
        preloadedState: initialState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(sagaMiddleware),
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

const store = makeStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

The reason I am passing `store` and not `makeStore()` to `persistStore` is to make sure I use the same store instance for my persistent feature. So the end result is the same `store` I was exporting it up until now, plus a `makeStore` function that returns a new store instance everytime, which is super useful for running tests in isolation (this probably means I can remove the `afterAll -> emptyCart` clause in the `useCart` test file) and for providing an initial state to my `customRender` function.

## 12 October 2021

I had a problem with `RootState` being of type `any` because `EnhancedStore` is a generic that defaulted it's param to `any`. I asked on stackoverflow for the correct way to type the return value of `makeStore` and a user answered to not type it at all and leave the type to be inferred. When I asked if there was a way to fully type the `makeStore` function the user answered "I wrote these types" and what do you know, that user is a redux-tookit maintainer and the creator of RTK-Query. So that was a funny interaction. Lucky too. Getting an answer from a maintainer is as good as it gets.

the question can be found here: https://stackoverflow.com/questions/69534018/how-to-dynamically-determine-rootstate-type-in-redux-toolkit-with-makestore-func

So now I was able to solve the first of my `Questions` in the `TODO` file, which was correctly exporting all the types I need from a `makeStore` function. And since the second question was about the same thing (at its root level) it was answered as well.

Now I am also able to extend `customRender` to accept an `initialState`

```tsx
interface AllTheProvidersProps {
    children?: ReactNode;
    initialState?: RootState;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
    initialState,
}: AllTheProvidersProps) => (
    <ReduxProvider store={makeStore(initialState)}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PersistGate>
    </ReduxProvider>
);

type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
    initialState?: RootState;
};

const renderWithProviders: (
    ui: ReactElement,
    options?: RenderWithProvidersOptions
) => RenderResult = (ui, options) =>
    render(ui, {
        wrapper: props => (
            <AllTheProviders {...props} initialState={options?.initialState} />
        ),
        ...options,
    });
```

The `persistor` passed to `PersistGate` is the persistor of the default store export, so a different store instance from the one I am using inside `AllTheProviders`. I am contemplating on whether to remove or leave it as is. Removing it means my tests run on a store instance that is the same as the one getting persisted. On the other hand, I am never going to test for reload actions, so I am never going to actually test the store persists, I do however want to know if there is any error in my `wrappers`, for example if the order of the wrappers affect a component's render, or if a specific wrapper configuration broke some functionality. For this reason I will keep the `persistor` just to make sure the `wrappers` of my `customRender` correctly mirror the actual wrappers of my application.

I did try to change the function body to `{}` and then create a store instance inside it and persist this instance:

```tsx
const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
    initialState,
}: AllTheProvidersProps) => {
    const store = makeStore(initialState);
    const persistor = persistStore(store);

    return (
        <ReduxProvider store={makeStore(initialState)}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </PersistGate>
        </ReduxProvider>
    );
};
```

but for some reason it was breaking the render of the components (basically it was rendering nothing and the snapshots where just the container HTML code).

In any case that was a pretty wild commit so I am gonna add it here for future reference:

https://github.com/sgoulas/pdpProject/commit/53269e2322ada0c62c31d2eacb0d4d3763cedc66

I also faced a weird bug about too many re-renders in `customRender` function. This was caused by `jest-mock-extended`'s `mock` function. Moral of the story: do **not** pass non-serializable values to the store.

Something interesting that I just noticed is that if I test a subcomponent's cases in a parent component I have test coverage for the subcomponent even if I don't test its cases in its own test file (and vice versa). So in my case testing `MiniCart` thoroughly allows me to only test `MiniCartProductCart` for its snapshot. This means I don't have to write tests for cases I have already tested in a different scope. This is something I hadn't notice in the past (probably because I was writing tests with `enzyme` and rendering the components shallowly).

So, in this MR I created the `useCart` hook, the `cart` state slice, the relevant reducer and selectors, refactored the `customRender` function, added tests for the existing hooks and created the corresponding UI elements. I really feel like I stepped up my understanding of testing.

What's left is going through the accessibility / markup validators and fix any errors / warning that might come up.

For some reason the main page is missing the `title` property although I can see the tab named appropriately.

It seems the error is caused because `redux-persist` does not run in the server, so when the HTML of the page is pre-generated it causes the title to not render (https://github.com/vercel/next.js/issues/8240).

The solution is simple but ugly, if I am on the server, don't wrap the application with the persist provider:

```tsx
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) =>
    typeof window === 'undefined' ? (
        <ReduxProvider store={store}>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ApolloProvider>
        </ReduxProvider>
    ) : (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeProvider>
                </ApolloProvider>
            </PersistGate>
        </ReduxProvider>
    );
```

If I do this change however, I am getting a console.error `react-dom.development.js:67 Warning: Did not expect server HTML to contain a <div>`.

So I have to choose between:

-   the page _source_ not having a `title`, which affects the SEO ranking
-   an error in my `console`, which affects me on a personal level because anyone unsuspecting of the situation will think I just built the application _with_ console errors and disregarded them nontheless.
-   add a `<title>` element with `${SITE_NAME}` as value and expect it will be overwritten by each page's `title` element. So the user will see the correct title and the console will have no errors. The downside of this is that the page source of each page will display the `${SITE_NAME}` as title. This is wrong on a SEO level since different pages have different titles (I am not going to take into account the unecdotal opinions that `googlebot` is clever enough to wait for page updates, it might very well be but I don't want to take any chances). The other downside is that when I fixed the bug so that the correct title appears on the page (and got the error in the console) the mark up validator displayed four errors regarding the usage of `href` on a `<heading>` element. This means that these errors pre-existed and because `<title>` was missing the mark up validator was not picking them up.

SEO ranking aside, which is a major aim from the very start of this project, I think it is wrong on a principle level to disregard that existence of errors, that _are_ going to get caught by the validator if I fix the very bug that should be fixed. At least in the scope of this project, which is after all an educational one.

btw I just realized that it's not an error but a warning in red. Still hurts :(

In any case, I increased the test coverage to make me feel good about myself and then merged the MR.

## 13 October 2021

Having merged the cart functionality I feel I should skip the category page and proceed straight into the checkout one, so that I can have a user journey completed from start to finish. Plus, the checkout page would require a payment method integration (currently thinking about `stripe`) and this is something I have never done before so I am definitely eager to test the waters with this one.

At this point it's important to note that I am just spitballing over here. In a professional setting the cart would exist, at least in a mirrored state, in the back end. I have also seen implementations where the cart exists solely in the back end and no cart information is held in the front end. What I am going to try doing, keep the cart in the redux state and using it "as is" in the checkout page to immediately perform a payment without any sort of back end verification, is plain wrong and should never ever (ever) be done in a professional project. It just so happens that my server is mocked from start to finish and in the scope of this project I have no plans of doing any real back end development. Truth be told at this point, excluding the process of deploying a nextjs application to a host environment and CSS animations, I have implemented everything that I set out to implement. Even the category page would not be something I have never done before since in my previous work I did something really similar (keeping many products in redux state, presenting them in categories and using filters to update the listing). What's left to do is the holy grail of every personal project ever: finish the project.

`stripe` has a relevant developers page with instructions for implementing the technology to one's project (https://stripe.com/docs/stripe-js/react#elements-consumer). I already created a dummy account just so that I could have an API key. Never finished activating the account although I _can_ see in my profile a public and a secret key, plus some dummy cards that can be used to test everything works correctly so hopefully these should prove enough.

I went through the documentation (see above) but I also like checking out some articles with simple yet complete implementations so I used this one https://blog.logrocket.com/integrating-stripe-react-stripe-js/ as a reference point as well.

After messing around with the existing examples, repos and sandbox, I may have to drop `stripe`. The styling options are all pure css and importing it as is breaks all the existing styles. On the other hand, since the component being exported is not my own or a material-ui one I can't override the way it receives styling, because it relies on getting styled from an external `css` file. I tried importing the file as a css module but I got the error "global class is not pure (pure selectors must contain at least one local class or id)", which does make sense. No selectors means no local scope. The documentation does not provide any API page for the component either.

I did find a material-ui implementation (https://javascript.plainenglish.io/stripe-payment-form-with-reactjs-and-material-ui-part-4-118e60fca962) but to be honest, after hitting the 5 months milestone and over 300 commits (tomorrow marks exactly 5 months from my first commit and funnily enough the commit containing this entry will be my 300th) there is a certain element of fatigue. I have been burning the midnight oil for quite some time and I am reaching a point where I want to finish this thing properly, make the repo public and be done with it, at least for now.

What I currently have in mind is to setup a vertical stepper with all the relevant input fields. I would like however to also find a component for accepting credit card details (this looks insane https://reactjsexample.com/a-modern-credit-card-component-for-react/), however if I am not satisfied with any solution I might create one myself.

I did find this nice library https://www.npmjs.com/package/react-credit-cards which actually does work as advertised, so I am gonna use it.

## 24 October 2021

Today I would like to finish the structure of the checkout page and maybe split the page in its relevant components.

In the end I did not have much time but I connected the credit card info to redux. Now in order to finish this component I should add separate error checkers for its individual fields (that will be updated via saga triggers) and also update the next button in the stepper to be disabled if the step content is erroneous.
