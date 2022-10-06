import gql from 'graphql-tag';

export const BoardState = {
    fragments: {
        GridRowParts: gql`
            fragment GridRowParts on GridRow {
                person {
                    id
                    name
                    __typename
                }
                activeColumn
                __typename
            }
        `,
    }
};

export const MOVE_TILE = gql`
  mutation MoveTile($startPosition: GridCoordinateInput, $hoverPosition: GridCoordinateInput) {
    moveTile (startPosition: $startPosition, hoverPosition: $hoverPosition) @client {
        state {
            id
            createdAt
            rows {
              ...GridRowParts
            }
        }
    }
  }
  ${BoardState.fragments.GridRowParts}
`;

export const SET_BOARD_STATE = gql`
  mutation SetBoardState($boardState: [GridRowInput]) {
    setBoardState (boardState: $boardState) {
        success
        message
        boardState {
          id
          createdAt
          rows {
            ...GridRowParts
          }
        }
    }
  }
  ${BoardState.fragments.GridRowParts}
`;

export const GET_BOARD_STATE = gql`
  query getBoardState ($boardId: ID) {
      boards (filter: {boardId: $boardId}) {
        __typename
        id
        name
        group {
          id
          name
          __typename
        }
        state {
          __typename
          id
          createdAt
          rows {
            ...GridRowParts
          }
        }
      }
  }
  ${BoardState.fragments.GridRowParts}
`;

export const BOARD_STATE_SUBSCRIPTION = gql`
  subscription watchBoardState {
    boards (filter: {boardId: 1}) {
        __typename
        id
        name
        group {
          id
          name
          __typename
        }
        state {
          __typename
          id
          createdAt
          rows {
            ...GridRowParts
          }
        }
      }
  }
  ${BoardState.fragments.GridRowParts}
`;

// The TypeDefs are for the "Client Schema". These make it possible to use named queries
// since we need to know the Type of each input in a named query.
export const boardTypeDefs = gql`
  input GridCoordinateInput {
    row: Int!,
    column: Int!,
  }
`;