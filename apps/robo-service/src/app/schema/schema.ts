import { GraphQLDateTime } from 'graphql-scalars';
import { makeSchema } from 'nexus';
import { join } from 'path';
import { GetBoardByGroupQuery, GetBoardByIdQuery } from './Board';
import { PersonQuery } from './Person';

/**
 * The root folder of the monorepo, i.e. apps/ and libs/ are direct subfolders of the root.
 */
const monorepoRoot = process.cwd();

export const schema = makeSchema({
  /**
   * Typedefs used in the schema
   */
  types: {
    DateTime: GraphQLDateTime,
    GetBoardByGroupQuery,
    GetBoardByIdQuery,
    PersonQuery,
  },

  /**
   * Nexus will autogenerate typescript types and GraphQL SDL when this is invoked.
   * This section of the config defines where Nexus will output this autogenerated code.
   */
  outputs: {
    /**
     * The filepath where Nexus will write autogenerated Typescript definitions derived from the schema
     */
    typegen: join(monorepoRoot, 'apps/robo-service/generated/nexus-typegen.ts'),

    /**
     * The filepath where Nexus will write the GraphQL schema SDL
     */
    schema: join(monorepoRoot, 'apps/robo-service/generated/schema.graphql'),
  },
  contextType: {
    module: join(monorepoRoot, 'apps/robo-service/src/app/context/context.ts'),
    export: 'Context',
  },
});
