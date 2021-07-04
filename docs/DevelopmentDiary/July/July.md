## 4 July 2021

It came to my attention that while I have prettier and eslint, I have them installed on my IDE and not on the project, meaning that if this was a project that had collaborators each one would have different eslint/prettier settings. Or no at all.

I added prettier as a dev dependency, created its configuration file, added some properties that I wanted after reading the docs (https://prettier.io/docs/en/options.html) and made vs code run prettier on save. I also added a script to package.json. I decided against adding a pre-commit hook for prettier, since the on paste/save rule should be proved enough.
