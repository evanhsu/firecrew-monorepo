import styled from '@emotion/styled';
import {
    useGetBoardByGroupQuery,
    WatchBoardDocument,
    WatchBoardSubscription,
} from '@firecrew/robo-service-client';
import { useEffect } from 'react';
import BoardComponent from '../../components/board/board';

/* eslint-disable-next-line */
export interface BoardProps {}

export function Board(props: BoardProps) {
    const { data, loading, error, subscribeToMore } = useGetBoardByGroupQuery({
        variables: {
            groupId: 'group-1-uuid',
        },
    });

    useEffect(() => {
        subscribeToMore({
            document: WatchBoardDocument,
            variables: {
                boardId: 'board-1-uuid',
            },
            updateQuery: (
                prev,
                {
                    subscriptionData,
                }: { subscriptionData: WatchBoardSubscription }
            ) => {
                // These aren't exactly the same shape (they're wrapped in top-level query fields),
                // but the guts will properly overwrite the existing Board in the Apollo cache (because the typename & id will line up)
                return subscriptionData ?? prev;
            },
        });
    }, []);

    if (error || !data?.getBoardByGroup[0]?.__typename) {
        return (
            <div>
                Can't load data {error?.message} {JSON.stringify(error)}
            </div>
        );
    }

    const { state, ...board } = { ...data?.getBoardByGroup[0] };

    return (
        <BoardComponent
            board={board}
            boardState={state}
            columnHeaders={['Available', 'Unavailable', 'Assigned']}
            loading={false}
            error={error}
        />
    );
}

export default Board;
