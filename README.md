# Firecrew

Run the robo backend with: `npx nx serve robo-service`

---

## Getting Started

During development, you'll probably want to run the stack in `watch` mode to update
the autogenerated GraphQL typedefs (and corresponding client-library code) whenever schema
files are modified.

-   Start up the dev server with GraphQL schema file watchers

        npm run watch

-   The frontend UI should be available at http://localhost:4200

-   GraphQL Playground is available in your browser at http://localhost:4000/

If you want to run the backend & frontend without the GraphQL codegens watching,
you can do this instead:

      npm run start

### GraphQL Codegens

`robo-service`:

-   The `robo-service` app uses Nexus to automatically generate a `schema.graphql` SDL schema file and Typescript
    type definitions that are used to provide type-safety within
    your resolver code.

`robo-service-client`:

-   The `robo-service-client` library uses `graphql-codegen` to watch the `schema.graphql` file (from the `robo-service` app) and our GraphQL queries (defined in this library) and autogenerates Typescript code that can be used to execute those queries against the API with type-safe input args and return values.

`robo-ui`:

-   The `robo-ui` app imports Typescript definitions and query functions from the `robo-service-client` library for fetching data from the `robo-service` api.

## GraphQL Query Examples

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
