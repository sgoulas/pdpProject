## 4 July 2021

It came to my attention that while I have prettier and eslint, I have them installed on my IDE and not on the project, meaning that if this was a project that had collaborators each one would have different eslint/prettier settings. Or no at all.

I added prettier as a dev dependency, created its configuration file, added some properties that I wanted after reading the docs (https://prettier.io/docs/en/options.html) and made vs code run prettier on save. I also added a script to package.json. I decided against adding a pre-commit hook for prettier, since the on paste/save rule should be proved enough.

`eslint` has a command to initiate a configuration file. What is peculiar is that I opted to use a JSON file, but then vscode was unable to pick up on it (the cli was running fine) because apparently vscode is looking for `rc` files (or maybe it does so by default and I should had configured it to look for the JSON instead). I replaced the JSON file with an rc one and I was able to see linter error in my problems tab, as well as in my cli command output.

Added rules that I felt were useful.
