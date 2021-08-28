# NextJS

-   The static generation feature of Next.js works only under the dedicated `pages` folder.
-   `getStaticProps` can be async meaning I can fetch any necessary data before returning and rendering the page.
-   Any code written inside `getStaticProps` will **not** end up on the client, so in there I can write code that e.g accesses the file server or connects to a DB. This code will be executed during the **build** process.
-   `getStaticProps` must return an object with a property `props` whicn in turn contains all the props that the component would normally expect to receive.
-   The `revalidate` prop can be read as "never serve page older than <x> seconds.
-   `getServerSideProps` always runs on the server **after** deployment and **not** during build. It will **not** run on the client. For this function, `revalidate` has no value.
-   `getStaticProps` has access to the `context.params` prop to receive url specific params but it does need `getStaticPaths` to pre-generate **all** the possible paths (this means returning multiple possible objects detailing the multiple different versions of the page, in order to avoid hard coding the full range of dynamic values the latter would need to be pre-fetched). The prop `fallback` can be used to allow or disallow the user from manually typing a value that falls outside of the range of dynamic values. So for example if a SG page expects the ids to be 1 and 2, `fallback:true` would singal the page to try to accomadate for a possible id of value 3, whereas `fallback:false` would disallow it.
-   `fallback` is also nice for pre-generating some of the pages that are vissited more frequently (e.g the IDs that correspond to sough after commodities) and dynamically generating page for the missing IDs when IDs for them come in.
-   Next uses an under the hood centralized `App` component to render each route. I can override this component with a custom one by creating an `_app.js` component under the `pages` directory https://nextjs.org/docs/advanced-features/custom-app.
-   https://github.com/vercel/next.js/tree/canary/examples
