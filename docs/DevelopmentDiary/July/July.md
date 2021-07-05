## 4 July 2021

It came to my attention that while I have prettier and eslint, I have them installed on my IDE and not on the project, meaning that if this was a project that had collaborators each one would have different eslint/prettier settings. Or no at all.

I added prettier as a dev dependency, created its configuration file, added some properties that I wanted after reading the docs (https://prettier.io/docs/en/options.html) and made vs code run prettier on save. I also added a script to package.json. I decided against adding a pre-commit hook for prettier, since the on paste/save rule should be proved enough.

`eslint` has a command to initiate a configuration file which was useful. What is peculiar is that I opted to use a JSON file, but then vscode was unable to pick up on it (the CLI was running fine) because apparently vscode is looking for `rc` files (or maybe it does so by default and I should had configured it to look for the JSON instead). I replaced the JSON file with an rc one and I was able to see linter error in my problems tab, as well as in my cli command output.

Added rules that I felt were useful. W

Eventually I was able to find a solution to getting `lint-staged` to work with `husky` and `yarn`.

https://yarnpkg.com/package/husky

-   yarn add husky -D
-   yarn add lint-staged -D
-   add `prepare` script for `husky install`
-   yarn prepare (this is supposed to run once per installation process)
-   husky add .husky/pre-commit "yarn lintStaged"
-   add the following to `package.json`:

```js
    "lint-staged": {
        "*.{ts,tsx,js,jsx}": [
            "eslint --fix"
        ]
    },
    //...
        "scripts": {
        "lintStaged": "lint-staged",
        "prepare": "husky install"// this is the one added in step 3
    },
```

What it does is create a `.husky` folder with a `pre-commit` script which will run the `lintStaged` script, which is just the `lint-staged` command for running `eslint --fix` against ts,tsx,js and jsx files.

The articles I found online suggested I added the `git add` command after `eslint --fix` but it seems it is not needed and the files get commited.

Honestly, not really clear at all. The issues opened in github dated back to 2018 and were revived in 2020 with no definitive solution added. At the end of the day, I feel like this should had been a straight forward issue but it wasn't. (It was however when I did it in the react-ciphers project, granted that one did not include lint-staged).

I think I am going to add NextJS next and maybe try to set up the webpack aliases to pair it with.
