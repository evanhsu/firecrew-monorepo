import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Board = {
  __typename?: 'Board';
  group?: Maybe<Group>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  state?: Maybe<BoardState>;
};


export type BoardStateArgs = {
  revision?: InputMaybe<Scalars['Int']>;
};

export type BoardState = {
  __typename?: 'BoardState';
  board: Board;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** The revision is an integer that's incremented every time the Board is updated (an "update" consists of a single Person being moved on the Board) */
  revision: Scalars['Int'];
  rows: Array<Maybe<PersonTile>>;
};

export type Error = {
  message?: Maybe<Scalars['String']>;
};

export type GetBoardOutput = Board | NotFoundError;

export type GridPositionInput = {
  /** The left-most column on the Board is Column 0. The column number increases as you move to the _right_. */
  column: Scalars['Int'];
  /** The row at the very top of the Board is Row 0. The row number increases as you move down the board. */
  row: Scalars['Int'];
};

export type Group = {
  __typename?: 'Group';
  /** The Board that this Group owns (each Group owns a single Board) */
  board?: Maybe<Board>;
  id?: Maybe<Scalars['ID']>;
  members?: Maybe<Array<Maybe<Person>>>;
  name?: Maybe<Scalars['String']>;
};

export type MoveTileMutationResponse = {
  __typename?: 'MoveTileMutationResponse';
  boardState?: Maybe<BoardState>;
};

export type Mutation = {
  __typename?: 'Mutation';
  moveTile?: Maybe<MoveTileMutationResponse>;
};


export type MutationMoveTileArgs = {
  boardId: Scalars['ID'];
  newPosition: GridPositionInput;
  tileId: Scalars['ID'];
};

export type NotFoundError = Error & {
  __typename?: 'NotFoundError';
  message?: Maybe<Scalars['String']>;
  notFoundId?: Maybe<Scalars['String']>;
  notFoundTypename?: Maybe<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  qualifications?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PersonQueryFilterInput = {
  id?: InputMaybe<Scalars['ID']>;
  /** Only people with this qualification will be returned. Example: `{ qualification: "ICT4" }` */
  qualification?: InputMaybe<Scalars['String']>;
};

export type PersonTile = {
  __typename?: 'PersonTile';
  /** Columns are 0-indexed from left-to-right (column 0 is the left-most).The activeColumn is the column in which the Person on this row resides. */
  column: Scalars['Int'];
  id: Scalars['ID'];
  person: Person;
  /** The 0-index row number, where Row 0 is at the top of the Board */
  row: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getBoardByGroup: Array<Maybe<Board>>;
  getBoardById?: Maybe<GetBoardOutput>;
  people?: Maybe<Array<Maybe<Person>>>;
};


export type QueryGetBoardByGroupArgs = {
  groupId: Scalars['String'];
};


export type QueryGetBoardByIdArgs = {
  boardId: Scalars['String'];
};


export type QueryPeopleArgs = {
  filter?: InputMaybe<PersonQueryFilterInput>;
};

export type GetBoardByGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GetBoardByGroupQuery = { __typename?: 'Query', getBoardByGroup: Array<{ __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name?: string | null, qualifications?: Array<string | null> | null } } | null> } | null } | null> };

export type GetBoardByIdQueryVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type GetBoardByIdQuery = { __typename?: 'Query', getBoardById?: { __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name?: string | null, qualifications?: Array<string | null> | null } } | null> } | null } | { __typename: 'NotFoundError', message?: string | null, notFoundTypename?: string | null, notFoundId?: string | null } | null };

export type MoveTileMutationVariables = Exact<{
  boardId: Scalars['ID'];
  tileId: Scalars['ID'];
  newPosition: GridPositionInput;
}>;


export type MoveTileMutation = { __typename?: 'Mutation', moveTile?: { __typename: 'MoveTileMutationResponse', boardState?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name?: string | null, qualifications?: Array<string | null> | null } } | null> } | null } | null };

export type BoardFragmentFragment = { __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name?: string | null, qualifications?: Array<string | null> | null } } | null> } | null };

export type BoardStatePartsFragment = { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name?: string | null, qualifications?: Array<string | null> | null } } | null> };

export const BoardStatePartsFragmentDoc = gql`
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
      qualifications
    }
  }
}
    `;
export const BoardFragmentFragmentDoc = gql`
    fragment boardFragment on Board {
  __typename
  id
  group {
    __typename
    id
  }
  name
  state {
    ...boardStateParts
  }
}
    ${BoardStatePartsFragmentDoc}`;
export const GetBoardByGroupDocument = gql`
    query getBoardByGroup($groupId: String!) {
  getBoardByGroup(groupId: $groupId) {
    ...boardFragment
  }
}
    ${BoardFragmentFragmentDoc}`;

/**
 * __useGetBoardByGroupQuery__
 *
 * To run a query within a React component, call `useGetBoardByGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardByGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardByGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetBoardByGroupQuery(baseOptions: Apollo.QueryHookOptions<GetBoardByGroupQuery, GetBoardByGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardByGroupQuery, GetBoardByGroupQueryVariables>(GetBoardByGroupDocument, options);
      }
export function useGetBoardByGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardByGroupQuery, GetBoardByGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardByGroupQuery, GetBoardByGroupQueryVariables>(GetBoardByGroupDocument, options);
        }
export type GetBoardByGroupQueryHookResult = ReturnType<typeof useGetBoardByGroupQuery>;
export type GetBoardByGroupLazyQueryHookResult = ReturnType<typeof useGetBoardByGroupLazyQuery>;
export type GetBoardByGroupQueryResult = Apollo.QueryResult<GetBoardByGroupQuery, GetBoardByGroupQueryVariables>;
export const GetBoardByIdDocument = gql`
    query getBoardById($boardId: String!) {
  getBoardById(boardId: $boardId) {
    ... on Board {
      ...boardFragment
    }
    ... on NotFoundError {
      message
      notFoundTypename
      notFoundId
      __typename
    }
  }
}
    ${BoardFragmentFragmentDoc}`;

/**
 * __useGetBoardByIdQuery__
 *
 * To run a query within a React component, call `useGetBoardByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardByIdQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, options);
      }
export function useGetBoardByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, options);
        }
export type GetBoardByIdQueryHookResult = ReturnType<typeof useGetBoardByIdQuery>;
export type GetBoardByIdLazyQueryHookResult = ReturnType<typeof useGetBoardByIdLazyQuery>;
export type GetBoardByIdQueryResult = Apollo.QueryResult<GetBoardByIdQuery, GetBoardByIdQueryVariables>;
export const MoveTileDocument = gql`
    mutation moveTile($boardId: ID!, $tileId: ID!, $newPosition: GridPositionInput!) {
  moveTile(boardId: $boardId, tileId: $tileId, newPosition: $newPosition) {
    __typename
    boardState {
      ...boardStateParts
    }
  }
}
    ${BoardStatePartsFragmentDoc}`;
export type MoveTileMutationFn = Apollo.MutationFunction<MoveTileMutation, MoveTileMutationVariables>;

/**
 * __useMoveTileMutation__
 *
 * To run a mutation, you first call `useMoveTileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTileMutation, { data, loading, error }] = useMoveTileMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      tileId: // value for 'tileId'
 *      newPosition: // value for 'newPosition'
 *   },
 * });
 */
export function useMoveTileMutation(baseOptions?: Apollo.MutationHookOptions<MoveTileMutation, MoveTileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveTileMutation, MoveTileMutationVariables>(MoveTileDocument, options);
      }
export type MoveTileMutationHookResult = ReturnType<typeof useMoveTileMutation>;
export type MoveTileMutationResult = Apollo.MutationResult<MoveTileMutation>;
export type MoveTileMutationOptions = Apollo.BaseMutationOptions<MoveTileMutation, MoveTileMutationVariables>;