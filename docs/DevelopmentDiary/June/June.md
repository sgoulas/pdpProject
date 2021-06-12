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

Now on to adding react...

Added `react` and `react-dom`.

At this point in order to handle JSX syntax I need a transpiler, meaning Babel comes into play.

As I wrote earlier and by cross referencing the article with the docs I will install these dependencies:

- `@babel/core` to transpile ES6 and above to ES5.
- `@babel/preset-env` to be able to target specific environment for my deployed app.
- `@babel/preset-react` to transpile React to ES5.
- `babel-loader` to transform the Javascript dependencies with Babel (transform `import` statements to `require` ones).

I will skip `@babel/cli` since as per the docs (https://babeljs.io/docs/en/babel-cli) its usage is to transpile files manually from the command line, which is something that I currently do not plan on doing.

After that I will add some loaders:

- `style-loader` to inject a `style` tag to the output HTML file.
- `css-loader` to be able to improt css file to the project (does this also include css modules?)
- `image-webpack-loader` to load images to the project (does this also include svgs?), it also seems to minify them (https://www.npmjs.com/package/image-webpack-loader)

Also added `file-loader` (which is a dependency of at least `style-loader`) and `@babel/plugin-proposal-class-properties`. I will not be using classes, but at the time of writing this, the only way to use error boundaries (https://reactjs.org/docs/error-boundaries.html) is with classes, so it is needed.

I updated `.babelrc` file with the required presets and also added the `"@babel/plugin-proposal-class-properties"` plugin to support javascript classes.

I finally updated `webpack.config.js` with `module` prop, adding `rules` for loading and handling different type of files (specifically `js`/`jsx`, `css`/`scss` and a variety of image formats).

At this point `React` is successfully integrated into the project, I am able to transpile it with `Babel` and bundle and serve it with `Webpack`, while also seeing any changes take effect into real time in the developemnt server.

As a final addition, I would like to add source mapping functionality to my project, to be able to inspect the deployed code despite it being minified and bundled. Webpack has a dedicated section for that: https://webpack.js.org/configuration/devtool/#devtool indicating the various appraoches I can take.

I chose `eval-source-map` since I wanted the best possible quality of information during development.

I tried to differentiate the `devtool` value based on the value of the `process.env.NODE_ENV` variable in order to differentiate the information exposed upon errors based on the environment (development versus production), but it seems the best way to implement it is by splitting the `webpack.config.js` into `development` and `production`, each on configuring `webpack` differently based on the current environment (https://webpack.js.org/guides/production/).

(
Funnily enough, it seems I was not the first one to try ternary-finding-my-way-out of this since there is a dedicated section for that in the docs:
Technically, NODE_ENV is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries.
Contrary to expectations, process.env.NODE_ENV is not set to 'production' within the build script webpack.config.js, see https://github.com/webpack/webpack/issues/2537. Thus, conditionals like process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js' within webpack configurations do not work as expected.
)

So the plan is to have three different webpack configuration files:

- `webpack.common.js` will contain environment-agnostic settings like entry, output, plugins etc. Settings that will remain the same no matter the mode.
- `webpack.dev.js` will contain development settings like mode, full information source maps and devServer settings
- `webpack.prod.js` will contain production settings, specifically the mode (at least for now).

In order to handle the files I will be adding `webpack-merge` which is what the webpack docs suggest I do to merge the different configurations.

(In the end I opted for no source maps in production for maximum performance and security, this may be changed in the future though.)

Thus, I can handle different configurations based on my environment needs.

Next I should probably pick up my reading from here https://dev.to/deadwing7x/setup-a-react-app-using-webpack-babel-and-typescript-5927 which is the second part of the previously mentioned DEV.to article, this time about typescript.
