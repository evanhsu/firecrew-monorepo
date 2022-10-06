import React, { CSSProperties, useEffect } from 'react';
import { ApolloError } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import Row from './Row';
import { GET_BOARD_STATE, BOARD_STATE_SUBSCRIPTION } from './typeDefs';
import Theme from '../../theme';

export interface GridCoordinate {
  row: number;
  column: number;
}

export type GridRow = {
  person: {
    id: number;
    name: string;
  };
  activeColumn: number;
};

export type BoardState = {
  id: number;
  createdAt: number;
  rows: [GridRow];
};

export type BoardProps = {
  columnHeaders: string[];
  loading: boolean;
  error?: ApolloError | undefined;
  data: {
    boards: {
      __typename: String;
      id: number;
      name: String;
      group: {
        id: number;
        name: String;
      };
      state: BoardState;
    }[];
  };
  //   subscribeToBoardState: Function,
};

export type BoardWithDataProps = {
  columnHeaders: string[];
};

const styles = {
  board: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    height: '75px',
  } as CSSProperties,
  header: {
    display: 'flex',
    flexDirection: 'column',
    opacity: 1,
    backgroundColor: Theme.colors.accent,
    fontSize: '30px',
    color: Theme.colors.white,
    width: '300px',
    marginLeft: '2px',
    marginRight: '2px',
  } as CSSProperties,
};

const Board = ({ columnHeaders, ...props }: BoardProps) => {
  useEffect(() => {
    props.subscribeToBoardState();
  });

  if (props.loading) {
    return <div>Loading...</div>;
  }
  if (props.error) {
    console.error(`Error loading data: ${props.error}`);
    return <div>Error: {props.error.message}</div>;
  }

  const headers = columnHeaders.map((headerText: string, index: number) => (
    <div style={styles.header} key={`${index}-${headerText}`}>
      {headerText}
    </div>
  ));

  // Return early if there's no data
  if (!props?.data?.boards?.[0]?.state) {
    return renderBoard(headers, []);
  }

  const rows = props.data.boards[0].state.rows.map((row: GridRow) => ({
    person: {
      id: row.person.id,
      name: row.person.name,
    },
    activeColumn: row.activeColumn,
  }));

  const boardRows = rows.map((row: GridRow, index: number) => {
    const person = {
      id: row.person.id,
      name: row.person.name,
    };
    return (
      <Row
        person={person}
        activeColumn={row.activeColumn}
        index={index}
        key={person.id}
      />
    );
  });

  return renderBoard(headers, boardRows);
};

const renderBoard = (headers: JSX.Element[], boardRows: JSX.Element[]) => (
  <div>
    <div style={styles.headerRow}>{headers}</div>
    {boardRows.length > 0 ? (
      <div style={styles.board}>{boardRows}</div>
    ) : (
      <div>This Board is empty</div>
    )}
  </div>
);

// Wrap the Board component with a GraphQL subscription
const BoardWithData = (props: BoardWithDataProps) => {
  const { subscribeToMore, ...result } = useQuery(GET_BOARD_STATE, {
    variables: { boardId: 1 },
  });

  return <Board {...result} columnHeaders={props.columnHeaders} />;
};

export default BoardWithData;
export { Board };
