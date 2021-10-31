# pdpProject

This project is part of my personal development plan at Agile Actors. My aim is to use technologies and practices that I am not familiar with in order to build an e-commerce site and futher develop my professional skills.

One of the major aims of this project is to set up the toolchain from the scratch, in order to familiarise myself with the whole process of creating an application, rather than writing code on top of a pre-configured development environment.

## Stack

-   React 18
-   Material-UI
-   Redux, redux-saga, redux toolkit
-   Webpack 5
-   Babel
-   Typescript
-   Next 11
-   Apollo
-   GraphQL
-   Jest and React Testing Library

## Points of interest

-   Project and toolchain set up from zero, no forks of premade projects, no create react app.
-   Mobile first design
-   Apollo server introspection script for generating server schema on the front end
-   Github pipeline
-   DUCKS folder structure
-   Husky pre-commit hooks
-   SEO, OpenGraph protocol implementation and structure data mark up
-   Mark up validated by W3C mark up validator
-   ADR folder detailing architectural decisions
-   Detailed development diary with daily entries for each development day, the problems I encountered, the driving factors behind my decisions and my thoughts during each step of the way

## How to deploy locally

-   Clone this repository
-   Install the dependencies by running `yarn`
-   In two separate terminal instances run `yarn startServer` to start the mock back end server and `yarn dev` to start the front end client.
-   The front end should be deployed at `http://localhost:3000/` and the back end at `http://localhost:4000/` (check the terminals to make sure these are the ports)
