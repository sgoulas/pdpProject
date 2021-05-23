# NextJS

- The static generation feature of Next.js works only under the dedicated `pages` folder.
- `getStaticProps` can be async meaning I can fetch any necessary data before returning and rendering the page.
- Any code written inside `getStaticProps` will **not** end up on the client, so in there I can write code that e.g accesses the file server or connects to a DB. This code will be executed during the **build** process.
- `getStaticProps` must return an object with a property `props` whicn in turn contains all the props that the component would normally expect to receive.
- The `revalidate` prop can be read as "never serve page older than <x> seconds.
- `getServerSideProps` always runs on the server **after** deployment and **not** during build. It will **not** run on the client. For this function, `revalidate` has no value.
- `getStaticProps` has access to the `context.params` prop to receive url specific params but it does need `getStaticPaths` to pre-generate all the possible paths.
