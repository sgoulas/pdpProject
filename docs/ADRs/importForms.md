# Import format

## Date

12 June 2021

## Status

Accepted

## Context

We need a way to organise the format of our imported packages / files. Instead of importing them in a random way, we should split them based on their origins: an external package, an internal file referenced by an alias, an internal file located in the same directory as the file that imports it.

This change will improve readability and allow to separate the imports at a glance.

## Decision

example:

```js
//Foo.tsx
import React from "react"; //package

import { Button } from "@components"; // application files, but specified by an alias that corresponds to an absolute project path.
import { sortStuff } from "@utils";

import styles from "./styles.module.css"; // application file that is located in the same directory with Foo.tsx
```

## Consequences

Currently there is no automated way to enforce or detect this requirement, so manual inspection in merge requests and code reviews is needed.
