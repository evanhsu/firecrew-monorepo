import { ApolloError } from '@apollo/client/errors';
import styled from '@emotion/styled';
import {
    Board as BoardType,
    BoardStatePartsFragment,
} from '@firecrew/robo-service-client';
import AddTileForm from '../add-tile-form/add-tile-form';
import HeaderRow from '../header-row/header-row';
import Row from '../row/row';

export interface BoardProps {
    board: BoardType;
    boardState?: BoardStatePartsFragment | null;
    columnHeaders: string[];
    loading: boolean;
    error?: ApolloError | undefined;
}

const StyledBoard = styled.div({
    display: 'flex',
    flexDirection: 'column',
});

export function Board(props: BoardProps) {
    const { board, boardState, columnHeaders, loading = false, error } = props;

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(`Error loading data: ${props.error}`);
        return <div>Error: {error.message}</div>;
    }

    // Return early if there's no data
    if (!boardState || !boardState.rows?.length) {
        return renderBoard(board, columnHeaders, []);
    }

    const boardRows = boardState.rows.map((row, index: number) => {
        if (!row) {
            throw new Error('WAT!?');
        }

        const person = {
            id: row.person.id,
            name: row.person.name,
        };
        return (
            <Row
                person={person}
                activeColumn={row?.column}
                index={index}
                key={person.id}
            />
        );
    });

    return renderBoard(board, columnHeaders, boardRows);
}

const renderBoard = (
    board: any,
    headers: string[],
    boardRows: JSX.Element[]
) => (
    <div>
        <HeaderRow headers={headers} />
        {boardRows.length > 0 ? (
            <StyledBoard>{boardRows}</StyledBoard>
        ) : (
            <div>This Board is empty</div>
        )}

        <AddTileForm boardId={board.id} />
    </div>
);

export default Board;
