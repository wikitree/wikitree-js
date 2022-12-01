[![npm](https://img.shields.io/npm/v/wikitree-js.svg)](https://www.npmjs.com/package/wikitree-js)
[![Node.js CI](https://github.com/wikitree/wikitree-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/PeWu/wikitree-js/actions/workflows/node.js.yml)

# wikitree-js

JavaScript library to access the WikiTree API for Node.js and Web environments.

## Setup

Add `wikitree-js` package to your project:
```
npm install wikitree-js
```

Import package:
```typescript
import {getAncestors} from 'wikitree-js';
```

## Usage

### getPerson

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/getPerson.md#wikitree-api-getperson)

#### Example 1

Async/await:
```typescript
const response = await getPerson('Skłodowska-2');
```

Promise:
```typescript
const responsePromise = getPerson('Skłodowska-2')

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getperson1?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetPerson1#index.ts) (Node.Js)

#### Example 2

Async/await:
```typescript
const response = await getPerson(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
  }
);
```

Promise:
```typescript
const responsePromise = getPerson(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
  }
);

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getperson2?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetPerson2#index.ts) (Node.Js)

### getAncestors

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/getAncestors.md#wikitree-api-getancestors)

#### Example 1

Async/await:
```typescript
const response = await getAncestors('Skłodowska-2');
```

Promise:
```typescript
const responsePromise = getAncestors('Skłodowska-2')

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getancestors1?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetAncestors1#index.ts) (Node.Js)

#### Example 2

Async/await:
```typescript
const response = await getAncestors(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
    depth: 2,
  }
);
```

Promise:
```typescript
const responsePromise = getAncestors(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
    depth: 2,
  }
);

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getancestors2?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetAncestors2#index.ts) (Node.Js)

### getDescendants

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/getDescendants.md#wikitree-api-getdescendants)

#### Example 1

Async/await:
```typescript
const response = await getDescendants('Skłodowska-2');
```

Promise:
```typescript
const responsePromise = getDescendants('Skłodowska-2')

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getdescendants1?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetDescendants1#index.ts) (Node.Js)

#### Example 2

Async/await:
```typescript
const response = await getDescendants(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
    depth: 2,
  }
);
```

Promise:
```typescript
const responsePromise = getDescendants(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
    depth: 1,
  }
);

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getdescendants2?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetDescendants2#index.ts) (Node.Js)

### getRelatives

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/getRelatives.md#wikitree-api-getrelatives)

#### Example

Async/await:
```typescript
const response = await getRelatives(
  ['Skłodowska-2'],
  {
    getChildren: true,
    getParents: true,
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth'],
  }
);
```

Promise:
```typescript
const responsePromise = getRelatives(
  ['Skłodowska-2'],
  {
    getChildren: true,
    getParents: true,
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth'],
  })

responsePromise.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getrelatives?file=index.ts) (Web)
* [Replit](https://replit.com/@PeWu/WikiTree-GetRelatives#index.ts) (Node.Js)

### login (Node.Js)

This login method works only in Node.Js. To log in in a Web application use 

#### Example

```typescript
const auth = await login('user@example.com', 'P@s$w0Rd');
const response = await getRelatives(['Private-123'], {}, { auth });
```

Live demo: [Replit](https://replit.com/@PeWu/WikiTree-Login#index.ts)

### login (Web)

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/authentication.md#wikitree-api-authentication)

The Web login only works for apps hosted on https://apps.wikitree.com/. See [WikiTree Apps](https://www.wikitree.com/wiki/Project:WikiTree_Apps) page for details on how to host your app there.

The login flow works as follows:

1. Redirect the user to the WikiTree login page giving it a URL to redirect back:
```typescript
navigateToLoginPage('https://apps.wikitree.com/my-app');
```
2. Once the user logs in, they will be redirected back to your app with an `authcode` URL parameter, e.g.
```
https://apps.wikitree.com/my-app?authcode=abc123abc
```

3. The app needs to take this authcode and call `clientLogin` with it.
```typescript
clientLogin(authcode);
```

4. All subsequent requests to WikiTree will be authenticated. 

Use `getLoggedInUserName()` to get the currently logged in user's profile name.
