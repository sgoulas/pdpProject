# Mocking graphQL calls

## Date

27 June 2021

## Status

Accepted

## Context

We needed to decide how to mock our graphQL calls so that the front end development can proceed uninterrupted.

Both approaches use `graphql-tools`, the first one explicitly and the second one under the hood. The main difference is where the mocking logic exists.

With `graphql-tools`, the mocking exists in the front end. On the plus side, this means we do not need a server to be running at all and everything that the front end needs is packaged inside the application. On the minus side, there is additional code to be written in order to be able to switch from mocking to non mocking in a seemless way (like getting an environment variable in order to intercept the call and pass it to the front end generated server and not on the target back end url).

With `apollo-server` we have to set up a back end server. This means additional development dependencies and expanding the codebase a bit more than initially intendend, but the benefit we get is the removal of the concept of "mocking" from the front end codebase. The front end app, for all it is concerned, does not know anything about mocking or not mocking. It has a target server and it requests "things" from it. How these things are generated and served is hidden from the client. This also means that in the future, if we decide to expand this project with an actual back end, the basic infastructure (dependencies, schema, folder structure) for it will already exists.

### graphql-tools

https://www.graphql-tools.com/docs/introduction
https://www.graphql-tools.com/docs/mocking/

GraphQL Tools is an npm package and an opinionated structure for how to build a GraphQL schema and resolvers in JavaScript, following the GraphQL-first development workflow.

When it comes to mocking, GraphQL Tools creates an executable schema (that is, a graphQL schema that can be queried / mutated + relevant resolvers for doing so) which then exposes and thus it can be queried.

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

graphql(schemaWithMocks, query).then((result) =>
  console.log("Got result", result)
);
```

Alternatively, one can create a server that can be called:

```js
import { addMocksToSchema, mockServer } from "@graphql-tools/mock";
// Mock object.
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello",
  DateTime: () => casual.date((format = "YYYY-MM-DDTHH:mm:ss.SSSZZ")),
};
const preserveResolvers = false;
// Mock the server passing the schema, mocks object and preserverResolvers arguments.
const server = mockServer(schema, mocks, preserveResolvers);
// Alternatively, you can call addMocksToSchema with the same arguments.
const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers,
});
```

### Apollo server

https://www.apollographql.com/docs/apollo-server/testing/mocking/

Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.

```js
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  mocks: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

Apollo client also supports mocking specific types

```js
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
    resolved: String
  }
`;

const resolvers = {
  Query: {
    resolved: () => "Resolved",
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello",
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## Decision

It was decided to move with `apollo-server`.

Expanding on the initial project idea is always a risky move, but the docs indicate that setting up a basic mock server is fairly straight forward and the additional logic for generating mock data (via plugging `faker` on mock resolvers) would be the same regardless of the decided approach. Extracting the back end data mocking from the front end codebase was also an important factor in our decision. The front end does not have to know what is happening when it requests data and it shouldn't.

## Consequences

- We have to expand the project folder structure in order to facilitate the mock server.
- The application will require the mock server to be running (meaning deployment to a live environment is going to be a bit more complex compared to simply using `gh-pages` for example).
