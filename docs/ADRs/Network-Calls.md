# Deciding fetch implementation

## Date

15 May 2021

## Status

Accepted

## Context

We needed to decide how to implement network calls. Two options were presented, using the native Fetch API or utilizing the Axios module.

### Fetch API

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

Fetch provides a generic definition of Request and Response objects (and other things involved with network requests). This will allow them to be used wherever they are needed in the future, whether it’s for service workers, Cache API, and other similar things that handle or modify requests and responses, or any kind of use case that might require you to generate your responses programmatically (that is, the use of computer program or personal programming instructions).

### Axios

https://github.com/axios/axios

Promise based HTTP client for the browser and node.js

## Decision

It was decided to move with Axios.

Axios automatically converts fetched data to JSON whereas fetch requires explicit conversion.
Axios implements cancelable requests by exposing a cancel function whereas fetch requires an explicit API override to achieve the same result.

Also, with Axios we get time out configuration and http interceptors on requests and responses.

## Consequences

Easy handling and configuration of network calls across the application.

An extra dependency was added and any future collaborators would have to get accustomed to a specific package implementation of network calls.
