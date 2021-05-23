# Deciding on a package manager

## Status

What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?

## Context

We need to decide on a package manager for our project. The two major options are yarn and npm. There are alternative options such as pnpm and yarn pnp but the decision will be made betweeen npm and yarn considering they are the two major ones and the context of this application (which is to familiarize ourselves with as many of the established major tools possible.)

## npm

https://www.npmjs.com/

## yarn

https://classic.yarnpkg.com/en/

## Decision

It was decided to use yarn.

Although in the past yarn was superior in terms of performance and security, lastest npm versions (namely version 6) appear to have improved considerably in this areas. Still, yarn is currently regarded as the better alternative. Moreover, yarn allows parallel package installation from the hard drive (if they are present), something that npm does not. Also, yarn output is leaner and more structured compared to npm's and it appears to be the fastest of the two. Also, considering we have never used yarn in the past in our personal projects it is considered the better choice to improve on an previous uncharted area.

## Consequences

According to metrics (https://github.com/pnpm/benchmarks-of-javascript-package-managers) yarn is expected to have slower installation times when run without lockfile or updating packages with no lockfile present and a clean cache.
