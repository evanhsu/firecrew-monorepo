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

export type AddPersonToBoardMutationResponse = {
  __typename?: 'AddPersonToBoardMutationResponse';
  boardState?: Maybe<BoardState>;
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

export type CreatePersonInput = {
  /** The full name of the Person you're adding (full names make it easier to tell people apart) */
  name: Scalars['String'];
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
  addExistingPersonToBoard?: Maybe<AddPersonToBoardMutationResponse>;
  createAndAddPersonToBoard?: Maybe<AddPersonToBoardMutationResponse>;
  moveTile?: Maybe<MoveTileMutationResponse>;
  /** Remove a Person from a Board. The Person's crew roster membership will not be affected */
  removePersonFromBoard?: Maybe<RemovePersonFromBoardMutationResponse>;
};


export type MutationAddExistingPersonToBoardArgs = {
  boardId: Scalars['ID'];
  personId: Scalars['ID'];
};


export type MutationCreateAndAddPersonToBoardArgs = {
  boardId: Scalars['ID'];
  person: CreatePersonInput;
};


export type MutationMoveTileArgs = {
  boardId: Scalars['ID'];
  newPosition: GridPositionInput;
  tileId: Scalars['ID'];
};


export type MutationRemovePersonFromBoardArgs = {
  boardId: Scalars['ID'];
  personId: Scalars['ID'];
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
  name: Scalars['String'];
  qualifications: Array<Maybe<Scalars['String']>>;
};

export type PersonQueryIncludeFilterInput = {
  /** This string will be fuzzy-matched with Peoples' names */
  fuzzyName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** Only people with this qualification will be returned. Example: `{ qualification: "ICT4" }` */
  qualification?: InputMaybe<Scalars['String']>;
};

export type PersonQueryOmitFilterInput = {
  /** Omit people who appear on this specific Rotation Board */
  boardId?: InputMaybe<Scalars['ID']>;
  /** Omit People with these specific IDs from the results */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
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
  people: Array<Maybe<Person>>;
};


export type QueryGetBoardByGroupArgs = {
  groupId: Scalars['String'];
};


export type QueryGetBoardByIdArgs = {
  boardId: Scalars['String'];
};


export type QueryPeopleArgs = {
  include?: InputMaybe<PersonQueryIncludeFilterInput>;
  omit?: InputMaybe<PersonQueryOmitFilterInput>;
};

export type RemovePersonFromBoardMutationResponse = {
  __typename?: 'RemovePersonFromBoardMutationResponse';
  boardState?: Maybe<BoardState>;
};

export type Subscription = {
  __typename?: 'Subscription';
  watchBoard: Board;
};


export type SubscriptionWatchBoardArgs = {
  boardId: Scalars['String'];
};

export type GetBoardByGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GetBoardByGroupQuery = { __typename?: 'Query', getBoardByGroup: Array<{ __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } | null> };

export type GetBoardByIdQueryVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type GetBoardByIdQuery = { __typename?: 'Query', getBoardById?: { __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } | { __typename: 'NotFoundError', message?: string | null, notFoundTypename?: string | null, notFoundId?: string | null } | null };

export type WatchBoardSubscriptionVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type WatchBoardSubscription = { __typename?: 'Subscription', watchBoard: { __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } };

export type MoveTileMutationVariables = Exact<{
  boardId: Scalars['ID'];
  tileId: Scalars['ID'];
  newPosition: GridPositionInput;
}>;


export type MoveTileMutation = { __typename?: 'Mutation', moveTile?: { __typename: 'MoveTileMutationResponse', boardState?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } | null };

export type BoardPartsFragment = { __typename: 'Board', id: string, name?: string | null, group?: { __typename: 'Group', id?: string | null } | null, state?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null };

export type BoardStatePartsFragment = { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> };

export type FindPersonByNameQueryVariables = Exact<{
  fuzzyName: Scalars['String'];
  omitPeopleOnBoard?: InputMaybe<Scalars['ID']>;
}>;


export type FindPersonByNameQuery = { __typename?: 'Query', people: Array<{ __typename?: 'Person', id: string, name: string, qualifications: Array<string | null> } | null> };

export type CreateAndAddPersonToBoardMutationVariables = Exact<{
  person: CreatePersonInput;
  boardId: Scalars['ID'];
}>;


export type CreateAndAddPersonToBoardMutation = { __typename?: 'Mutation', createAndAddPersonToBoard?: { __typename?: 'AddPersonToBoardMutationResponse', boardState?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } | null };

export type AddExistingPersonToBoardMutationVariables = Exact<{
  personId: Scalars['ID'];
  boardId: Scalars['ID'];
}>;


export type AddExistingPersonToBoardMutation = { __typename?: 'Mutation', addExistingPersonToBoard?: { __typename?: 'AddPersonToBoardMutationResponse', boardState?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } | null };

export type RemovePersonFromBoardMutationVariables = Exact<{
  personId: Scalars['ID'];
  boardId: Scalars['ID'];
}>;


export type RemovePersonFromBoardMutation = { __typename?: 'Mutation', removePersonFromBoard?: { __typename?: 'RemovePersonFromBoardMutationResponse', boardState?: { __typename: 'BoardState', id: string, revision: number, createdAt: any, rows: Array<{ __typename: 'PersonTile', id: string, row: number, column: number, person: { __typename: 'Person', id: string, name: string, qualifications: Array<string | null> } } | null> } | null } | null };

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
export const BoardPartsFragmentDoc = gql`
    fragment boardParts on Board {
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
    ...boardParts
  }
}
    ${BoardPartsFragmentDoc}`;

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
      ...boardParts
    }
    ... on NotFoundError {
      message
      notFoundTypename
      notFoundId
      __typename
    }
  }
}
    ${BoardPartsFragmentDoc}`;

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
export const WatchBoardDocument = gql`
    subscription watchBoard($boardId: String!) {
  watchBoard(boardId: $boardId) {
    ...boardParts
  }
}
    ${BoardPartsFragmentDoc}`;

/**
 * __useWatchBoardSubscription__
 *
 * To run a query within a React component, call `useWatchBoardSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWatchBoardSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchBoardSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useWatchBoardSubscription(baseOptions: Apollo.SubscriptionHookOptions<WatchBoardSubscription, WatchBoardSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WatchBoardSubscription, WatchBoardSubscriptionVariables>(WatchBoardDocument, options);
      }
export type WatchBoardSubscriptionHookResult = ReturnType<typeof useWatchBoardSubscription>;
export type WatchBoardSubscriptionResult = Apollo.SubscriptionResult<WatchBoardSubscription>;
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
export const FindPersonByNameDocument = gql`
    query findPersonByName($fuzzyName: String!, $omitPeopleOnBoard: ID) {
  people(include: {fuzzyName: $fuzzyName}, omit: {boardId: $omitPeopleOnBoard}) {
    id
    name
    qualifications
  }
}
    `;

/**
 * __useFindPersonByNameQuery__
 *
 * To run a query within a React component, call `useFindPersonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPersonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPersonByNameQuery({
 *   variables: {
 *      fuzzyName: // value for 'fuzzyName'
 *      omitPeopleOnBoard: // value for 'omitPeopleOnBoard'
 *   },
 * });
 */
export function useFindPersonByNameQuery(baseOptions: Apollo.QueryHookOptions<FindPersonByNameQuery, FindPersonByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(FindPersonByNameDocument, options);
      }
export function useFindPersonByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPersonByNameQuery, FindPersonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(FindPersonByNameDocument, options);
        }
export type FindPersonByNameQueryHookResult = ReturnType<typeof useFindPersonByNameQuery>;
export type FindPersonByNameLazyQueryHookResult = ReturnType<typeof useFindPersonByNameLazyQuery>;
export type FindPersonByNameQueryResult = Apollo.QueryResult<FindPersonByNameQuery, FindPersonByNameQueryVariables>;
export const CreateAndAddPersonToBoardDocument = gql`
    mutation createAndAddPersonToBoard($person: CreatePersonInput!, $boardId: ID!) {
  createAndAddPersonToBoard(person: $person, boardId: $boardId) {
    boardState {
      ...boardStateParts
    }
  }
}
    ${BoardStatePartsFragmentDoc}`;
export type CreateAndAddPersonToBoardMutationFn = Apollo.MutationFunction<CreateAndAddPersonToBoardMutation, CreateAndAddPersonToBoardMutationVariables>;

/**
 * __useCreateAndAddPersonToBoardMutation__
 *
 * To run a mutation, you first call `useCreateAndAddPersonToBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAndAddPersonToBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAndAddPersonToBoardMutation, { data, loading, error }] = useCreateAndAddPersonToBoardMutation({
 *   variables: {
 *      person: // value for 'person'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateAndAddPersonToBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateAndAddPersonToBoardMutation, CreateAndAddPersonToBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAndAddPersonToBoardMutation, CreateAndAddPersonToBoardMutationVariables>(CreateAndAddPersonToBoardDocument, options);
      }
export type CreateAndAddPersonToBoardMutationHookResult = ReturnType<typeof useCreateAndAddPersonToBoardMutation>;
export type CreateAndAddPersonToBoardMutationResult = Apollo.MutationResult<CreateAndAddPersonToBoardMutation>;
export type CreateAndAddPersonToBoardMutationOptions = Apollo.BaseMutationOptions<CreateAndAddPersonToBoardMutation, CreateAndAddPersonToBoardMutationVariables>;
export const AddExistingPersonToBoardDocument = gql`
    mutation addExistingPersonToBoard($personId: ID!, $boardId: ID!) {
  addExistingPersonToBoard(personId: $personId, boardId: $boardId) {
    boardState {
      ...boardStateParts
    }
  }
}
    ${BoardStatePartsFragmentDoc}`;
export type AddExistingPersonToBoardMutationFn = Apollo.MutationFunction<AddExistingPersonToBoardMutation, AddExistingPersonToBoardMutationVariables>;

/**
 * __useAddExistingPersonToBoardMutation__
 *
 * To run a mutation, you first call `useAddExistingPersonToBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExistingPersonToBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExistingPersonToBoardMutation, { data, loading, error }] = useAddExistingPersonToBoardMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useAddExistingPersonToBoardMutation(baseOptions?: Apollo.MutationHookOptions<AddExistingPersonToBoardMutation, AddExistingPersonToBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExistingPersonToBoardMutation, AddExistingPersonToBoardMutationVariables>(AddExistingPersonToBoardDocument, options);
      }
export type AddExistingPersonToBoardMutationHookResult = ReturnType<typeof useAddExistingPersonToBoardMutation>;
export type AddExistingPersonToBoardMutationResult = Apollo.MutationResult<AddExistingPersonToBoardMutation>;
export type AddExistingPersonToBoardMutationOptions = Apollo.BaseMutationOptions<AddExistingPersonToBoardMutation, AddExistingPersonToBoardMutationVariables>;
export const RemovePersonFromBoardDocument = gql`
    mutation removePersonFromBoard($personId: ID!, $boardId: ID!) {
  removePersonFromBoard(personId: $personId, boardId: $boardId) {
    boardState {
      ...boardStateParts
    }
  }
}
    ${BoardStatePartsFragmentDoc}`;
export type RemovePersonFromBoardMutationFn = Apollo.MutationFunction<RemovePersonFromBoardMutation, RemovePersonFromBoardMutationVariables>;

/**
 * __useRemovePersonFromBoardMutation__
 *
 * To run a mutation, you first call `useRemovePersonFromBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonFromBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonFromBoardMutation, { data, loading, error }] = useRemovePersonFromBoardMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useRemovePersonFromBoardMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonFromBoardMutation, RemovePersonFromBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonFromBoardMutation, RemovePersonFromBoardMutationVariables>(RemovePersonFromBoardDocument, options);
      }
export type RemovePersonFromBoardMutationHookResult = ReturnType<typeof useRemovePersonFromBoardMutation>;
export type RemovePersonFromBoardMutationResult = Apollo.MutationResult<RemovePersonFromBoardMutation>;
export type RemovePersonFromBoardMutationOptions = Apollo.BaseMutationOptions<RemovePersonFromBoardMutation, RemovePersonFromBoardMutationVariables>;