## 12 June 2021

I need to add the bare minimum packages, meaning babel to transpile Javascript, react and react dom, then later typescript.

Going through the Babel docs (https://babeljs.io/docs/en/) it seems I need the following:

- `@babel/core`, `@babel/cli`, `@babel/preset-env` plugins for the main babel functionality, cli support and environment targetting.
- `@babel/preset-react` plugin το support jsx transpiling.
- `@babel/preset-typescript` to support typescript

I also found a DEV.to article detailing the installation process (https://dev.to/deadwing7x/setup-a-react-app-using-webpack-babel-and-typescript-5927).

I installed webpack-dev-server to dynamically reload the application on file change and the html-webpack-plugin to generate an HTML5 file containing all my bundles.

I also updated `webpack.config.js` to add the new plugin, support relative imports and add a directive to the devServer to serve the `/src` files.

Thus far I am able to bundle `index.js` and inject it to the output `index.html` file. On running the `start` script (which is webpack serve) I am able to deploy the application to localhost and also see any changes to `index.js` take place immediately, as weback re-deploys the changed files.

One deviation I made from the article was not to download the `path` package since at its npm page it states that it's just a copy of the node `path`, so no real reason to have it as an external dependency.

Now on to adding react...

Added `react` and `react-dom`.

At this point in order to handle JSX syntax I need a transpiler, meaning Babel comes into play.

As I wrote earlier and by cross referencing the article with the docs I will install these dependencies:

- `@babel/core` to transpile ES6 and above to ES5.
- `@babel/preset-env` to be able to target specific environment for my deployed app.
- `@babel/preset-react` to transpile React to ES5.
- `babel-loader` to transform the Javascript dependencies with Babel (transform `import` statements to `require` ones).

I will skip `@babel/cli` since as per the docs (https://babeljs.io/docs/en/babel-cli) its usage is to transpile files manually from the command line, which is something that I currently do not plan on doing.

After that I will add some loaders:

- `style-loader` to inject a `style` tag to the output HTML file.
- `css-loader` to be able to improt css file to the project (does this also include css modules?)
- `image-webpack-loader` to load images to the project (does this also include svgs?), it also seems to minify them (https://www.npmjs.com/package/image-webpack-loader)

Also added `file-loader` (which is a dependency of at least `style-loader`) and `@babel/plugin-proposal-class-properties`. I will not be using classes, but at the time of writing this, the only way to use error boundaries (https://reactjs.org/docs/error-boundaries.html) is with classes, so it is needed.

I updated `.babelrc` file with the required presets and also added the `"@babel/plugin-proposal-class-properties"` plugin to support javascript classes.

I finally updated `webpack.config.js` with `module` prop, adding `rules` for loading and handling different type of files (specifically `js`/`jsx`, `css`/`scss` and a variety of image formats).

At this point `React` is successfully integrated into the project, I am able to transpile it with `Babel` and bundle and serve it with `Webpack`, while also seeing any changes take effect into real time in the developemnt server.

As a final addition, I would like to add source mapping functionality to my project, to be able to inspect the deployed code despite it being minified and bundled. Webpack has a dedicated section for that: https://webpack.js.org/configuration/devtool/#devtool indicating the various appraoches I can take.

I chose `eval-source-map` since I wanted the best possible quality of information during development.

I tried to differentiate the `devtool` value based on the value of the `process.env.NODE_ENV` variable in order to differentiate the information exposed upon errors based on the environment (development versus production), but it seems the best way to implement it is by splitting the `webpack.config.js` into `development` and `production`, each on configuring `webpack` differently based on the current environment (https://webpack.js.org/guides/production/).

(
Funnily enough, it seems I was not the first one to try ternary-finding-my-way-out of this since there is a dedicated section for that in the docs:
Technically, NODE_ENV is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries.
Contrary to expectations, process.env.NODE_ENV is not set to 'production' within the build script webpack.config.js, see https://github.com/webpack/webpack/issues/2537. Thus, conditionals like process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js' within webpack configurations do not work as expected.
)

So the plan is to have three different webpack configuration files:

- `webpack.common.js` will contain environment-agnostic settings like entry, output, plugins etc. Settings that will remain the same no matter the mode.
- `webpack.dev.js` will contain development settings like mode, full information source maps and devServer settings
- `webpack.prod.js` will contain production settings, specifically the mode (at least for now).

In order to handle the files I will be adding `webpack-merge` which is what the webpack docs suggest I do to merge the different configurations.

(In the end I opted for no source maps in production for maximum performance and security, this may be changed in the future though.)

Thus, I can handle different configurations based on my environment needs.

Next I should probably pick up my reading from here https://dev.to/deadwing7x/setup-a-react-app-using-webpack-babel-and-typescript-5927 which is the second part of the previously mentioned DEV.to article, this time about typescript.

## 13 June 2021

I need to add typescript to the project. I will need the following:

- `@types/react` and `@types/react-dom` which contain type definitions for `react` and `react-com` respectively.
- `@babel/preset-typescript` so that `babel` can work with typescript.
- `ts-loader` to be able to load typescript files with `webpack`.

I also updated `webpack.common.js`, created a `tsconfig.json` and changed the existing `js` files to `ts` ones.

## 19 June 2021

Having estasblished the toolchain (yarn webpack and babel) and the core technologies (react, typescript) I need to decide on the surrounding technologies that I will be using to build the application and I chose to start with the network calls. I want to work with GraphQL because all my previous projects were using REST and also because I find the idea behind GraphQL really cool. I do however need to mock all my calls, or find a public API to consume, because the project is going to need mock data in order to speed up development and mimic a live, deployed, result.

I already know of faker.js (https://github.com/Marak/faker.js) and my initial thought was to use it to generate any data I need. I do however need to finalise the architecture I am going to use for fetching data with GraphQL, as well as fill any gaps in my knowledge.

GraphQL org has many (many) packages for using graphql in FE or BE in javascript environments (https://graphql.org/code/#javascript) depending on the stack. It seems that when it comes to "front end + react" the suggested package is apollo client (https://www.apollographql.com/docs/react) (apollo being a company that creates tools for bulding application with GraphQL).

So basically I need to figure out how to make the following work together:

- GraphQL (with Apollo Client)
- Axios (do I have another option besides axios and fetch api when it comes to GraphQL calls?)
- Mocking network calls (assuming I go with axios I can do that with axios-mock-adapter but I am not sure how to return only what the GraphQL query requests instead of everything.)
- Answering the aforementioned calls with mock data generated by faker.

Also, I recently took a closer look at react-query (https://react-query.tanstack.com/) and I would like the explore the possibility of adding it to my tech stack as well, but only assuming the previous bullets have been taken care of.

Going through https://www.apollographql.com/docs/react/get-started/.

So far the list of required packages looks like the following:

- `@apollo/client` which includes the in-memory cache, local state management, error handling, and a React-based view layer, basically everything that is needed for Apollo Client in an application built with React.
- `graphql` which provides logic for parsing GraphQL queries.

But before adding them I need to find out how to mock my GraphQL calls and this is where things become a bit confusing.

It seems that the suggested way is to use `graphql-tools` to create an executable schema alongside its relevant resolvers and type definitions and then couple the resolver functions with a library that generates fake data. The way to generate such a schema is described here https://www.graphql-tools.com/docs/generate-schema.

The documentation is a bit scuffed though. https://graphql.org/blog/mocking-with-graphql/ uses `mockServer` from `graphql-tools` to create a mockServer and it passes a simple string as a schema (and the link to the example is broken), whereas https://www.graphql-tools.com/docs/generate-schema uses `makeExecutableSchema ` from `@graphql-tools/schema` to create a full executable schema (meaning schema + resolvers + type definitions) and there is no full example (not even plain code). Neither of the two articles showcases a deployed server, or how to perform a call to one. To confuse things even further https://www.apollographql.com/docs/react/development-testing/client-schema-mocking/ suggests an entire different approach using a client-side schema and `read` function.

Considering the graphql.org itself uses `graphql-tools` I am leaning towards choosing this.

Why does `graphql-tools` use a resolver named `Query` which acts like a `query` as it's defined in the graphql docs, but is also named like one? It's confusing.

```js
const resolvers = {
  Query: {
    posts() {
      return posts;
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    // I don't understand why this query is not under Query field.
    posts(author) {
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    // same here
    author(post) {
      return find(authors, { id: post.authorId });
    },
  },
};

export default resolvers;
```

```js
//https://graphql.org/learn/queries/
// this is a query named Hero and the keyword for that is 'query'
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
// and 'mutation' for mutation.
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {// and a mutation named CreateReviewForEpisode
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

If we take a look at how graphql-tools (https://github.com/ardatan/graphql-tools) defines its schemas:

```js
const typeDefs = `
type Author {
  id: ID! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  """
  the list of Posts by this author
  """
  posts: [Post]
}

type Post {
  id: ID!
  title: String
  author: Author
  votes: Int
}

# the schema allows the following query:
type Query {
  posts: [Post]
}

# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: ID!
  ): Post
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

export default typeDefs;
```

So, it seems like `graphql-tools` defines a type Query and lists every query under it, but they never name anything as RootQuery, unless the naming is theoretical and not actualy present in the code.

Same goes for apollo (https://www.apollographql.com/docs/tutorial/schema/)

```js
type Query {
  // these are queries
  launches: [Launch]!
  launch(id: ID!): Launch
  me: User
}
```

The one thing I do not understand is why the `graphql-tools` example has `Author`. If `Query` is the "RootQuery" shouldn't it contain all the queries? Also, why does their mocking example (https://www.graphql-tools.com/docs/mocking/) "use the schema definition from the previous article" (https://www.graphql-tools.com/docs/generate-schema/#example) but actually uses a query `tasksForUser` which is assosiated with a type `user` that does not exist whatsoever in the schema they said they would be using? Am I missing something?

At this point, I am honestly not exactly sure what `graphql-tools` offers. It seems like it enforces a certain way (The GraphQL-first philosophy) of workflow and a certain way for defining a schema.

"GraphQL Tools is an npm package and an opinionated structure for how to build a GraphQL schema and resolvers in JavaScript, following the GraphQL-first development workflow."

Maybe this can help? https://dev.to/ekafyi/typing-and-mocking-a-graphql-api-server-with-apollo-3f4h

I still have not figured out how to actually mock my GraphQL calls. Hell, I am not even sure if I need `apollo-server`. It seems like the only way to mock the calls purely in the front end, without needing a server running is by using the `MockedProvider` normally used for testing https://www.apollographql.com/docs/react/development-testing/testing/.

I am going to sleep...

## 20 June 2021

I continue reading the docs in order to get a clear grasp on the "big picture" and what is needed. One thing that I notice is that apollo client suggests using a hook named `useQuery` in order to fetch, but does not seem to provide (at least at first glance) a simple "query" function. This means that the fetching operation is "known" to my components and that the two concepts (component and "fetching via apollo") are coupled together. Ideally I would like any data that is the result of a network call to exist in the Redux store and either be available through the component props (after a `connect`) or by calling `useSelector`, thus eliminating any need of explicitly calling `useQuery` inside my components. This would allow me to implement a "separation of concerns" where components only know their pros, not where the props came from or how they came to be, which in turn makes any future change / update easier.

Also, there is `apollo-client` and `@apollo/client` and they seem to be different versions of the same thing.

Turns out `@apollo/client` is the up to date (3.x.x), with `apollo-client` being the older verion.`@apollo/client` package also includes both React hooks and GraphQL request handling, which previously required installing separate packages.

After some further reading it seems that if I want to use graphQL then I really need to setup an apollo-server that will also mock every response with faker. `MockedProvider` should only be used for the front end testing and not for mocking data while the application is running.

So the list at the moment looks something like this:

- `@apollo/client` which includes the in-memory cache, local state management, error handling, and a React-based view layer, basically everything that is needed for Apollo Client in an application built with React.
- `graphql` which provides logic for parsing GraphQL queries.
- `apollo-server` for setting up a simple server to answer to the graphQL requests from an apollo client.

I still need to find a way to perform the fetching in the middleware instead of inside the components.

It seems that the way to do it is create a new apollo client from `@apollo/client`, and expose a `query` function which is basically the same as running the built in `query` method of the apollo client. Then I should use this exposed function in my middleware, thus fetching without the usage of the `useQuery` hook. I would be missing out on the `loading`,`error` and `data` values returned from the hook though...

Also, I should consider using `apollo-boost` to quickly configure my client.

Problem is, `apollo-boost` uses `apollo-client` instead of `@apollo/client`, meaning it still uses the 2.x.x version instead of the 3.x.x one, so I should probably just set it up manually myself one package at a time.

I got to say, this is the first time I am having so much trouble choosing the correct packages and indentifying what needs to be where. Multiple packages with almost identical names (what is the usage of `react-apollo` that all the other mentioned packages do not provide?), documentation that abstracts the "big view", broken example links and no clear overview of a completed project (even a bare bones one). I guess this is what back end developers hate when they talk about the "front end ecosystem".

Considering the apollo client uses the `fetch` api there are 4 disadvantages that I have to keep in mind:

- The response has to be formatted into a JSON.
- HTTP request / response interceptors ---> this is actually handle-able on the apollo client layer so not an issue.
- No (easy) way to cancel an ongoing request (would have to overwrite the api, something that I do not want to do).
- No way to set up a time out configuration.

So it seems I have two options regarding the networking:

- Go with apollo client and its `query`.
- Use `axios`, which does support graphQL calls.

Going with `axios` low key means I will not be using `@apollo/client` at all, meaning I would lose:

- caching.
- declarative data fetching (the `loading`,`error` and `data` that `useQuery` returns).

(honestly, these are the two major selling points https://www.apollographql.com/docs/react/why-apollo/ is trying to push, local state management https://www.apollographql.com/docs/react/local-state/local-state-management/ looks cool but I do want to use redux with saga so my application state will be there).

Considering I was not planning to use `useQuery` (and all its goodies) in the first place, opting for "network agnostic" components and the fact that I don't really want the apollo only featurues but I do want the `axios` only ones, I am not sure I need `@apollo/client` after all. I definitely need to make sure this is actually the case and try to find out if there is something else that `@apollo/client` offers that is important and I would be missing out. But if this is not the case the setup would be something like:

Back end:

- `apollo-server`
- `faker`

Front end:

- `graphql`
- `axios`

I can also mock without a back end at all, if I manage to actually read the `graphql-tools` docs https://www.graphql-tools.com/docs/mocking/.
If I understand correctly the way `graphql-tools` mocking works, it does not intercept any call whatsoever, it just executes a graphql query against an executable schema and returns the results:

```js
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";

// Fill this in with the schema string
const schemaString = `...`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema });

const query = `
query tasksForUser {
  user(id: 6) { id, name }
}
`;

graphql(schemaWithMocks, query).then(
  (
    result // this is an imperative call, it does not intercept a network call
  ) => console.log("Got result", result)
);
```

So, I am guessing, in order to set up a front end only mock I would have to use `axios-mock-adapter` to actually intercept `axios` calls, then instead of returning a response object I should extract the params, execute a graphql query in the same way described above, then return the object containg the results.

I am not exactly sure about that. And I still need to read more to make sure, absolutely sure, that not using `@apollo/client` is the correct decision.

## 21 June 2021

To recap the plan is the following:

1. Decide if I actually need `@apollo/client`, this will also decide if I will move forward with `query` or `axios`.
2. Decide if I will mock the graphQL server in the front end with `graphql-tools` or set up an actual graphQL server with mock responses with `apollo-server`.

## 27 June 2021

I decided to mock the graphQL server in the back end, which means setting up a server that will serve mock data using `apollo-client`. I added some information behind this decision in the ADR folder in the `BackEnd-Mocking.md`.
