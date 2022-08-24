# wikitree-js

JavaScript library to access the WikiTree API for Node.js and Web environments.

# Setup

Add `wikitree-js` package to your project:
```
npm install wikitree-js
```

# Usage

## getAncestors

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/getAncestors.md#wikitree-api-getancestors)

### Example 1

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

### Example 2

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

## getRelatives

[API documentation](https://github.com/wikitree/wikitree-api/blob/main/getRelatives.md#wikitree-api-getrelatives)

### Example

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
