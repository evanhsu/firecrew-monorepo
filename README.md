# Firecrew

Run the robo backend with: `npx nx serve robo-service`

---

## Getting Started

- Start up the dev server

      npx nx serve robo-service

- Open GraphQL Playground in your browser at http://localhost:4000/

- Try these queries:

### Fetch a Board

```graphql
query {
  getBoardByGroup(groupId: "group-1-uuid") {
    ...boardFragment
  }
}

fragment boardFragment on Board {
  __typename
  id
  name
  state {
    ...boardStateParts
  }
}

fragment boardStateParts on BoardState {
  __typename
  revision
  rows {
    __typename
    id
    row
    column
    person {
      __typename
      name
    }
  }
}
```

### Move a Tile

```graphql
mutation {
  moveTile(
    boardId: "board-1-uuid"
    tileId: "person-2-uuid"
    newPosition: { row: 2, column: 0 }
  ) {
    __typename
    boardState {
      ...boardStateParts
    }
  }
}

fragment boardStateParts on BoardState {
  __typename
  id
  revision
  createdAt
  rows {
    __typename
    id
    row
    column
    person {
      __typename
      id
      name
    }
  }
}
```

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@firecrew/mylib`.

## Development server

Run `nx serve robo-service` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=robo-ui` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
