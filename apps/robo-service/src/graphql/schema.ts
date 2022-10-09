import { GraphQLDateTime } from 'graphql-scalars';
import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';
import { makeSchema } from 'nexus';
import { join } from 'path';
import * as SchemaTypes from './schema/index';

/**
 * The root folder of the monorepo, i.e. apps/ and libs/ are direct subfolders of the root.
 */
const monorepoRoot = process.cwd();

export const schema = makeSchema({
  // This Nx workspace is set up to run this schema.ts script with a file watcher
  // during development rather than waiting for an inbound GraphQL query to trigger
  // an update to the generated types.  Look at the project.json file.
  shouldGenerateArtifacts: process.argv.includes('--nexus-gen'),
  //   shouldExitAfterGenerateArtifacts: process.argv.includes(
  //     '--nexus-gen-then-exit'
  //   ),

  /**
   * Typedefs used in the schema
   */
  types: {
    DateTime: GraphQLDateTime,
    ...SchemaTypes,
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
    module: join(monorepoRoot, 'apps/robo-service/src/graphql/context.ts'),
    export: 'Context',
  },
  /**
   * The sourceTypes config tells Nexus which Typescript definitions for your internal data to
   * use as the 'root' type that gets handed into each resolver.
   * For example:
   *  - You define a (GraphQL) Type "User" with a field named "firstName"
   *  - You write a resolver for the firstName field
   *  - The first argument to the resolver (the 'root' parameter) will have a (Typescript) type of "UserModel",
   *    which Nexus calls the "sourceType" for the (GraphQL) "User" type.
   *
   * The exact naming convention is defined by the regex in this
   * @see https://nexusjs.org/docs/guides/source-types
   */
  sourceTypes: {
    debug: false,
    modules: [
      {
        /**
         * Path to the file containing your Source Types
         */
        module: join(monorepoRoot, 'apps/robo-service/src/database/db.ts'),

        /**
         * Name used as an alias for Nexus to import your Source Types. eg: import * as <alias> from <path>
         */
        alias: 'db',

        /**
         * @param type The GraphQL Named type to match against your Source Types
         * @param _defaultRegex The Nexus default regex used to match your GraphQL types against your Source Types.
         *                      (the default regex looks for an exact name match between your GraphQL type and your Typescript type)
         */
        typeMatch(type, _defaultRegex) {
          return [
            // _defaultRegex, // Uncomment this to accept an exact match before looking for <Name>Model
            /**
             * This regex which will match `UserModel` with `User`, etc..
             */
            new RegExp(
              `(?:interface|type|class|enum)\\s+(${type.name}Model)\\W`,
              'g'
            ),
          ];
        },
      },
      {
        module: join(monorepoRoot, 'apps/robo-service/src/errors/errors.ts'),
        alias: 'errors',
        typeMatch(_type, defaultRegex) {
          return defaultRegex;
        },
      },
    ],
  },
});
