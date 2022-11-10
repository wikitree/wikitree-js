# Publishing a new version to npm

## Prerequisites

To publish new versions of **wikitree-js**, you need the following permissions:
- maintainer permission for https://github.com/wikitree/wikitree-js
- ownership of the [wikitree-js](https://www.npmjs.com/package/wikitree-js) package in https://npmjs.com

## Publishing

1. Check out a clean version of the repository

```bash
git clone git@github.com:wikitree/wikitree-js.git && cd wikitree-js
```

2. Install dependencies

```bash
npm install
```

3. Make sure tests pass

```bash
npm test
```

4. Update the version

Run one of the following commands:
```bash
npm version patch
```
```bash
npm version minor
```
```bash
npm version major
```
See https://semver.org/ for an explanation of semantic versioning.

5. Push the version update to GitHub

```bash
git push
```

6. Build

```bash
npm run build
```

7. Publish the new version

```bash
npm publish
```
