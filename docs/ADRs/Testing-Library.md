# Deciding on testing library

## Date

10 August 2021

## Status

Accepted

## Context

We needed to decide on the testing library that we will use to test our React components, having in mind that we already use `jest` for all other tests. The two major candidates are `react-testing-library` and `enzyme`.

### react-testing-library

https://testing-library.com/react

`react-testing-library` focuses on testing the code in a way that the user is going to use it, this means hiding implementation details like function calls, hook triggers, renders etc. It is a lightweight solution built on top of `react-dom` and `react-dom/test-utils`. `react-testing-library` does not allow access to the inner working of a component such as its state or the properties it receives. All the assertions happen from the DOM perspective, that is by interacting with DOM elements.

### Enzyme

https://enzymejs.github.io/enzyme/

`enzyme` is a javascript testing utility for React. It uses `shallow` rendering to render and interact with components and allows access to the inner workings of a component, like its properties, hooks and state. It can be used to make DOM assertions as well as more specific checks like when a function was called, how many times and with what arguments.

## Decision

It was decided to move with `react-testing-library`.

The reasons for our decision are the following:

-   **It is what React suggests**, this is also coupled with the fact that it is build on top of what `react-dom` offers, so it is safe to assume a certain degree of integration ease.
-   **Bigger community**, `enzyme` has a single repository maintainer and no matter their dedication, the bus factor of their repository is 1.
-   **Testing philosophy**, we want to write meaningful tests, that means we want to test that what we want the user to experiece actually happens. This have little to do with function calls and component renders and everything to do with DOM elements. Approaching testing from the user's perspective means they are bound to be more intuitive.
-   **Enzyme lags behind supporting new React features**, `enzyme` is behind when it comes to supporting new `React` features, like hooks.
-   **We have little experience using it**, at the end of the day this is a personal development project and since we already have professional experience writing tests with `enzyme` it only makes sense to find value in learning something new.

## Consequences

We will add the `react-testing-library` dependency to our project and will have (should) write our tests from the user's perspective instead from the developer's one.
