## 15 May 2021

Started reading how to setup a new react/typescript project without using third party tools, namely create-react-app.

Of the top of my head, I will need a transpiler and a module manager. I will also need to create some configuration files for them and the typescript compiler.

The problem I am currently facing is that there is a multitude of articles detailing "what" I have to install, but not so many arguing "why" I have to install them. For example this https://paulallies.medium.com/react-create-app-without-react-create-app-7c8341282645 medium article immediately starts with its "goals" (them being what needs to be installed) but does not answer why (e.g) I should install css-loader or style-loader. What is their usage? Do I have alternative options? Can I make this decision on a later stage of the application development?

The official react docs https://reactjs.org/docs/create-a-new-react-app.html contain a small list for required tools namely:

-   A package manager (yarn or npm)
-   A bundler (webpack or parcel)
-   A compiler (like babel)

An article linked in the official docs contains a better explanation of why specific packages are needed. This article can be found here https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658.

## 19 May 2021

Continued reading about parcel and ways to use it in a new react app (without the use of CRA).

https://www.freecodecamp.org/news/how-to-up-a-react-app-with-parcel/

This together with the list mentioned in the previous entry indicates that I can start a new project with yarn, babel and parcel and then just install the required packages, them being react and react dom, which is a much more understanable plan and also boils down to the minimum expected configuration to get something started. I wonder though what is necessary for installing and more importantly configuring babel.

Since I am still at the beginning of the project I will need to figure out the exact list of packages and technologies that I will be using. I know I want to try SEO and this immediately means I need server side rendering (SSR). Next.js is the go to framework when it comes to that and it can solve some important problems such as routing, code splitting and of course pre-rendering of the JSX code. My only concern is the scope. Using Next automatically implies a server that will pre-render my pages. I do want to dab into node.js but not as part of this project. My only goal is to set up a bare minimum node server that will use Next to server pre-rendered, (code) split pages to the user upon request, but naturally I have to consider the added complexity a back end (even bare boned) will introduce. I don't think there is another option, at least on this quality however. With that in mind I revisisted Academind's videos on Next, hoping to learn how to setup something functional with the least possible burden on the planned roadmap (https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25616722).

My goal is to learn how Next is going to function in the context of the application I am going to build, what additional configuration it will introduce and how the latter will interact with the libraries / technologies that I have already decided to use. Following that I will make a wrap up and decide on the final toolchain and main packages of the project.

## 23 May 2021

Continued reading about Next.js. It seems I had I misconception regarding the role of the server in the ecosystem. I was under the impression that Next handles the routing and code splitting, but that I also needed a dedicated backend running (a node server that I would need to build on my own), that would need to be configured to work with Next in order to server SSR pages.This seems to not be the case. Reading in Next's documentation (https://nextjs.org/docs/basic-features/pages) it seems both server side rendering and static generation (SSR and SG) are handled by the same codebase and there is no need for a dedicated server to run my app, but I do think I am mistaken and that for SSR I do actually need a custom made back end, albeit a simple one.

I was also under the impression that every page had to be SSR but it seems that for purely static content that is not expected to change anytime soon (like a FAQ page) SG should be used, whereas SSR should be the go to option when content changes fast or is unique to each user (product listing or user profile pages).

[update]

It seems that SG can be paired with data fetching via the (async) `getStaticProps` in order to fetch data before rendering the page. Since the data can (and are expected to) change over time this means that SG can be actually used to rendering pages with varied content (like a product listing page). Does this mean that SSR should be used for pages that vary greatly to their expected rendered result? And to what degree?

[update]

It seems that the fetched data are determined during build time, so a SG page will not receive updates about new data without rebuilding. However the `revalidate` allows us to use incremental static generation (**ISG**) to re-generate the page on a specific interval on the server side, in order to serve up to date pre-rendered pages (this is really awesome lol). So, when is there a need for true SSR? I guess when there is a need for the most accurate representation of data? Like, even with a `revalidate` value of 1, the server can serve an "old" page, assuming the latter changed in the span of a second between two requests. But when the accuracy matters the most, SSR is the best opion. Also, SSR has access to the request and response object, so this is somethig to keep in mind.
Of course, SSR adds a time overhead, so unless I work with data that change multiple times _per second_ and are also _mission critical_ to be laser point accurate, SSR is not required.

Finished the Next.js section of Academind.

## 30 May 2021

After talking with my coach we decided it was better to use webpack as a bundler, because it's more widely used and thus will be more useful in my professional works. Thus, I started reading the webpack documenattion and getting started section (https://webpack.js.org/guides/getting-started/).

After finishing with the getting started guide I changed the project structure and also set up a webpack.config.js file and a build script and was able to get an output bundle with an html page that was loading a main.js file.

I also found out that at the moment yarn doesn't offer a way to prevent the installation of dev dependencie, so this is something I was not aware of when choosing the package manager.

There seems to be a need for html-webpack-plugin (https://webpack.js.org/plugins/html-webpack-plugin/), at least in the future, since it allows bundling files whose name change each time (like files that contain hashes or dates or generally have dynamic names, CSS files are the first to come to mind when reading this). I am not going to use it from the beginning since there is no need for it at the moment, but it is definitely something I should have in mind.

Now I need to install the necessary react packages and try to do two things: boot up a dev server that hot-reloads and create a script that successfully builds my application. I wonder when is the best time to add typescript to the application, before adding react or after.
