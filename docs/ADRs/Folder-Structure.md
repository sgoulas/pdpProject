# Folder structure decision

## Date

3 August 2021

## Status

Accepted

## Context

We need to decide on the folder structure for the codebase. The two options are feature based and ducks based.

## Feature based structure

In a feature based folder structure the codebase is split into feature folders and each folder contains sub-folders for each logical entity.

Example with redux

```js
reducers__
          |
          |
         reducerA__
                   |
                  reducerA.js
          |
          |
         reducerB__
                   |
                  reducerB.js
actions__
         |
         |
         actionsA__
                   |
                  actionsA.js
          |
          |
         actionsB__
                   |
                  actionsB.js
```

In this model, the "reducer" is a feature, and it contains its sub-entities meaning sub-reducers or to be more precise redux state slices.

## Ducks based structure

With ducks, each folder is a module containing everything that is relating to it. This means we have folders like these:

```js
thingA__
        |
        |
        reducerA.js
        |
        |
        actionsA.js
thingB__
        |
        |
        reducerB.js
        |
        |
        actionsB.js
```

In the approach each folder is a stand alone entity containing everything related to that entity.

## Comparing the two approaches

With feature based architecture each separate feature or operation is contained within a relevant parent folder and is easy to split the codebase in large specific areas. Each folder is pure in what it contains, since this ends up being a set of same-purpose files that follow the same structure and philosopgy (a folder full of reducers, a folder full of types, a folder full of action dispatchers and so on).

With ducks based architecture the folders become more complex because each one has to contain everything relating to that entity, but this means we achieve a greater modularity in our project. Everything related to that entity exists entirely in its folder. This means that every development effort is focused in a single directory and is not split between different parent directories. Adding or removing features becomes easier because, again, all the changes need to happen in a singular folder.

## Decision

It was decided to use the ducks pattern.

First of all, I have never used ducks before and this is a great opportunity to familiarise myself with the pattern. Secondly, I have first hand professional experience on working in large codebases that follow the feature based structure and I know full well how daunting jumping between directories and files to change a single thing can be. Concentrating all the code that an entity requires under a single directory should make my life easier both during development and during maintainance of the project and will also introduce the concept of modulatiry in the codebase, which I think is closely related to the separation of concerns approach that I would like to follow.

## Consequences

I will have to rewrite the entire server directory to follow the new pattern and will have to follow said pattern during development of the front end of the application.
