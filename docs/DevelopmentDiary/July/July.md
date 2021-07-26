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

## 5 July 2021

While trying to add NextJS to my project I discovered that most tutorials suggest starting with create react app with the option for NextJs, or cloning a default NextJS repo.

The docs (https://nextjs.org/docs) do have information about adding NextJS to an existing project, but what I have trouble understanding is the relation between webpack and Next. The docs suggest I replace my `build` and `start` scripts with `next build` and `next start` (they also suggest a `next lint` script). I also see that Next uses webpack under the hood, but I wonder what this means for an existing webpack configuration. Do I have to remove it? Replace it? Can my existing configuration co-exist with Next's one? My first impression is that by choosing NextJS I give up on having a custom webpack configuration file, let alone multiple ones as I currently do.

Also, it is lowkey unreal that most of the articles are about migrating from CRA projects or cloning existing template repositories. Even the official docs (https://nextjs.org/docs/migrating/incremental-adoption) have only the following options:

-   incremental adoption
-   migrating from gatsby
-   migrating from CRA
-   migrating from react router

## 18 July 2012

My aim for today is to reach a conclusion regarding `next` and `webpack` so I can setup an `apollo-server` and actually start coding. I want to see if (and to what extend) `next` supports custom webpack configuration, with the aim of preserving my existing configurations. If this can not be, then I will replace the latter with `next` since I already managed to setup `webpack` and `next` plays an integral part in routing, SEO and code splitting, which are all concepts that I want to explore in this project.

Links I have found so far that are relavent:

-   https://nextjs.org/docs
-   https://nextjs.org/docs/messages/webpack5
-   https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
-   https://nextjs.org/docs/advanced-features/source-maps

It seems that I can actually retain a standalone (see: explicitly defined by me) `babel` configuration according to this: https://nextjs.org/docs/advanced-features/customizing-babel-config. So even by adoptin `next` I can retain any babel configuration.

I installed `next`, updated the scripts and then kept getting a run time regenerator error even after adding the `@babel/plugin-transform-runtime` plugin. In the end I found in the babel docs that I also needed to add `@babel/runtime` and I actually managed to start my development server again, this time pre-rendered by `next`.

Honestly, I am feeling sad about having to remove my webpack configurations. It took me a bit of time to learn and add them and I was meticulous about adding only what I needed. To remove them before even starting developing was not a great feeling. I did create the `0.2.0` pre-release tag which contains them though, so I can always go back and see what I did. I also got to actually read and learn, so at the end of the day not a net loss by all means.

The rendering change is evident from the fact that when viewing the souce (`view-source:` not to confuse with the `inspect` tool) I can actually see the HTML code, whereas viewinig the source of another deployed non-next-using react app like https://sgoulas.github.io/react-ciphers/ shows just javascript code. So it works!

Also, thank God my existing `babel` configuration for typescript does not need any more tinkering and `next` works with it from the get go.

I also removed the explicit `webpack` and `webpack-cli` dependencies, since `next` uses webpack internally and it seemed redundant to have them on their own.

According to the docs https://nextjs.org/docs/deployment if I run `build` then `start`, then `next` will spin up a node server hosting my `next` application. The one thing I wonder is why my react dev tools indicates that the page has loaded a development build of react and not a production one. ----> I should run the `build` script followed by the `start` one and it actually deployed a production build to localhost. Cool.

I should also consider singing up for a Vercel account I guess.

Next steps: go over `next` configuration files and see if I should add anything important or if I see something that seems nice to have. Go over my `next` notes. Then setup an apollo server, add some mock files and test if it responds. Then add an apollo client to my application and then actually start coding? I also have to add react testing library. And Jest.

One step at a time!

P.S should I add `/.next` to my `.gitignore` file?

## 25 July 2012

My plan for today is to setup `apollo-server`.

Reading from https://www.apollographql.com/docs/apollo-server/getting-started/ I need to add `apollo-server` and `graphql` dependencies.

Added `apollo-server` as development only dependency and `graphql` as a normal one.

I will recreate the example project as is, meaning no typescript and all in an `index` file but as soon as it functions as expected I will transform it to typescript and also split the code to different files according to their intended functionality.

Added faker as dev dependency, checked the "next steps" section from https://www.apollographql.com/docs/apollo-server/getting-started/#combined-example and added a sample query / schema stitching example in the server.

Added a `phone` type in my server, as well as mocks and resolves and also splitted the schema into sub-schemas to improve efficiency and readability.
