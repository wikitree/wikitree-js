# wikitree-js

JavaScript library to access the WikiTree API for Node.js and Web environments.

# Usage

## getAncestors

### Example 1

Async/await:
```typescript
const response = await getAncestors('Skłodowska-2');
```

Promise:
```typescript
const response = getAncestors('Skłodowska-2')

response.then(response => {
  // ...
});
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getancestors1?file=index.ts)
* [Replit](https://replit.com/@PeWu/WikiTree-GetAncestors1#index.ts)

### Example 2

Async/await:
```typescript
const response = getAncestors(
  'Skłodowska-2',
  {
    fields: ['Id', 'Name', 'FirstName', 'LastNameAtBirth', 'Father', 'Mother'],
    depth: 2,
  }
);

response.then(response => {
  // ...
});
```

Promise:
```typescript
getAncestors('Skłodowska-2')
    .then(response => {
        // ...
    });
```

Live demo:
* [Stackblitz](https://stackblitz.com/edit/wikitree-getancestors2?file=index.ts)
* [Replit](https://replit.com/@PeWu/WikiTree-GetAncestors2#index.ts)
