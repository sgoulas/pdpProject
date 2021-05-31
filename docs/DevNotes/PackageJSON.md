# package json

https://yarnpkg.com/configuration/manifest

Manifest files (also called package.json because of their name) contain everything needed to describe the settings unique to one particular package. Project will contain multiple such manifests if they use the workspace feature, as each workspace is described through its own manifest. Note that defaults for these fields can be set via the initFields settings.

- private: If you set "private": true in your package.json, then npm will refuse to publish it. This is a way to prevent accidental publication of private repositories.
- resolutions: allows you to instruct Yarn to use a specific resolution instead of anything the resolver would normally pick.
