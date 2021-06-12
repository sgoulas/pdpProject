## 12 June 2021

I need to add the bare minimum packages, meaning babel to transpile Javascript, react and react dom, then later typescript.

Going through the Babel docs (https://babeljs.io/docs/en/) it seems I need the following:

- `@babel/core`, `@babel/cli`, `@babel/preset-env` plugins for the main babel functionality, cli support and environment targetting.
- `@babel/preset-react` plugin το support jsx transpiling.
- `@babel/preset-typescript` to support typescript

I also found a DEV.to article detailing the installation process (https://dev.to/deadwing7x/setup-a-react-app-using-webpack-babel-and-typescript-5927).

I installed webpack-dev-server to dynamically reload the application on file change and the html-webpack-plugin to generate an HTML5 file containing all my bundles.

I also updated `webpack.config.js` to add the new plugin, support relative imports and add a directive to the devServer to serve the `/src` files.

Thus far I am able to bundle `index.js` and inject it to the output `index.html` file. On running the `start` script (which is webpack serve) I am able to deploy the application to localhost and also see any changes to `index.js` take place immediately, as weback re-deploys the changed files.

One deviation I made from the article was not to download the `path` package since at its npm page it states that it's just a copy of the node `path`, so no real reason to have it as an external dependency.
