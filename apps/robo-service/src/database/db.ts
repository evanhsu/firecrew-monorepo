import { v4 as uuidv4 } from 'uuid';
import {
  people,
  person01,
  person02,
  person03,
  person04,
  person05,
  person06,
  person07,
} from './people';

let group1: GroupModel = {
  id: 'group-1-uuid',
  name: 'Celebrities',
};

let board1: BoardModel = {
  id: 'board-1-uuid',
  name: 'Tour Rotation',
  groupId: group1.id,
};

let boards = {
  [board1.id]: board1,
};

let board1BoardStateRev1: BoardStateModel = {
  id: uuidv4(),
  revision: 1,
  createdAt: Date.now() - 3600,
  boardId: board1.id,
  rows: [
    {
      id: person01.id,
      row: 0,
      column: 1,
      personId: person01.id,
    },
    {
      id: person02.id,
      row: 1,
      column: 0,
      personId: person02.id,
    },
    {
      id: person03.id,
      row: 2,
      column: 2,
      personId: person03.id,
    },
    {
      id: person04.id,
      row: 3,
      column: 2,
      personId: person04.id,
    },
    {
      id: person05.id,
      row: 4,
      column: 0,
      personId: person05.id,
    },
    {
      id: person06.id,
      row: 5,
      column: 0,
      personId: person06.id,
    },
    {
      id: person07.id,
      row: 6,
      column: 2,
      personId: person07.id,
    },
  ],
};

let board1BoardStateRev2: BoardStateModel = {
  id: uuidv4(),
  revision: 2,
  createdAt: Date.now(),
  boardId: board1.id,
  rows: [
    {
      id: person03.id,
      row: 0,
      column: 0,
      personId: person03.id,
    },
    {
      id: person01.id,
      row: 1,
      column: 1,
      personId: person01.id,
    },
    {
      id: person02.id,
      row: 2,
      column: 1,
      personId: person02.id,
    },
    {
      id: person04.id,
      row: 3,
      column: 2,
      personId: person04.id,
    },
    {
      id: person05.id,
      row: 4,
      column: 0,
      personId: person05.id,
    },
    {
      id: person06.id,
      row: 5,
      column: 0,
      personId: person06.id,
    },
    {
      id: person07.id,
      row: 6,
      column: 2,
      personId: person07.id,
    },
  ],
};

// All revisions for a specific boardId are contained in an array
let boardStates = {
  [board1.id]: [board1BoardStateRev1, board1BoardStateRev2],
};

// Each key is a boardId. The value is an array of TileMoveEvents for that Board.
let tileMoveEvents: Record<string, TileMoveEventModel[]> = {};

export type GroupModel = {
  id: string;
  name: string;
};
export type BoardModel = {
  id: string;
  name: string;
  groupId: string;
  //   state: BoardState;
};
export type BoardStateModel = {
  id: string;
  revision: number;
  createdAt: number; // Unix timestamp
  boardId: string;
  rows: PersonTileModel[];
};
export type BoardStateInputModel = {
  boardId: BoardStateModel['id'];
  rows: PersonTileInputModel[];
};

export type PersonTileModel = {
  /**
   * The ID of the PersonTile is the same as the ID of the Person it contains.
   * It seems redundant, but helps the frontend Apollo cache to work properly.
   */
  id: string;
  row: number;
  column: number;
  //   boardStateId: string; // Removing this field in favor of just embedding the PersonTileModel json directly into the BoardState.rows property (not a foreign reference)
  personId: PersonModel['id'];
};
export type PersonTileInputModel = {
  row: PersonTileModel['row'];
  personId: PersonModel['id'];
  column: PersonTileModel['column'];
};

export type PersonModel = {
  id: string;
  name: string;
  qualifications?: string[];
  avatar?: string;
  groupId?: string; // Current crew membership? This will vary by year
};

export type CreatePersonInputModel = {
  name: string;
  qualifications?: string[];
};

type GridPosition = {
  row: number;
  column: number;
};

export type TileMoveEventModel = {
  id: string;
  boardId: BoardModel['id'];
  createdAt: number; // Timestamp
  tileId: PersonTileModel['id'];
  oldPosition: GridPosition;
  newPosition: GridPosition;
  toBoardStateRevision: BoardStateModel['revision'];
  fromBoardStateRevision: BoardStateModel['revision'];
};
export type TileMoveEventInputModel = Omit<
  TileMoveEventModel,
  'id' | 'createdAt'
>;

export interface Db {
  boards: (groupId: GroupModel['id']) => Promise<BoardModel[]>;
  board: (boardId: BoardModel['id']) => Promise<BoardModel | undefined>;
  person: (id: PersonModel['id']) => Promise<PersonModel | undefined>;
  people: () => Promise<PersonModel[]>;
  createPerson: (newPerson: CreatePersonInputModel) => Promise<PersonModel>;
  /**
   * Get a fully-hydrated boardState for the specified Board (including full Person documents)
   * If no revision is provided, the latest revision is selected.
   */
  boardState: (
    boardId: BoardModel['id'],
    revision?: number
  ) => Promise<BoardStateModel | undefined>;

  setBoardState: (
    boardId: BoardModel['id'],
    state: BoardStateInputModel
  ) => Promise<BoardStateModel>;

  tileMoveEvents: (boardId: BoardModel['id']) => Promise<TileMoveEventModel[]>;
  addTileMoveEvent: (
    event: TileMoveEventInputModel
  ) => Promise<TileMoveEventModel>;
}

export const db: Db = {
  boards: async (groupId) => {
    return Object.values(boards).filter((board) => board.groupId === groupId);
  },
  board: async (boardId) => {
    return boards[boardId];
  },
  person: async (personId) => {
    return people[personId];
  },
  people: async () => {
    return Object.values(people);
  },
  createPerson: async (newPerson) => {
    const newId = uuidv4();
    people[newId] = {
      ...newPerson,
      id: newId,
    };
    return people[newId];
  },
  boardState: async (boardId, revision?) => {
    const allRevisionsForSpecifiedBoard = boardStates[boardId];
    if (!allRevisionsForSpecifiedBoard) {
      // Not found
      return undefined;
    }

    if (revision !== undefined) {
      const requestedRevision = allRevisionsForSpecifiedBoard.filter(
        (boardState) => boardState.revision === revision
      );
      console.log(JSON.stringify(requestedRevision));
      return requestedRevision?.[0];
    }

    // Sort by revision descending, then return the first item (the one with the highest revision number)
    return allRevisionsForSpecifiedBoard.sort(
      (a, b) => b.revision - a.revision
    )[0];
  },
  setBoardState: async (boardId, state) => {
    const newRevisionNumber = await getNextBoardStateRevisionForBoard(boardId);
    const newBoardStateId = uuidv4();
    const newBoardState: BoardStateModel = {
      id: newBoardStateId,
      boardId: boardId,
      revision: newRevisionNumber,
      createdAt: Date.now(),
      rows: state.rows.map((inputRow) => {
        return {
          id: inputRow.personId,
          row: inputRow.row,
          column: inputRow.column,
          boardStateId: newBoardStateId,
          personId: inputRow.personId,
        };
      }),
    };

    boardStates[boardId].push(newBoardState);
    return newBoardState;
  },
  tileMoveEvents: async (boardId) => {
    return tileMoveEvents[boardId];
  },
  addTileMoveEvent: async (eventInput) => {
    const event = {
      ...eventInput,
      id: uuidv4(),
      createdAt: Date.now(),
    };
    if (!Object.prototype.hasOwnProperty.call(tileMoveEvents, event.boardId)) {
      tileMoveEvents[event.boardId] = [event];
    } else {
      tileMoveEvents[event.boardId].push(event);
    }
    return event;
  },
};

// TODO: maybe just have the db autoincrement this field for scalability?
const getNextBoardStateRevisionForBoard = async (
  boardId: BoardStateModel['boardId']
) => {
  const allRevisionsForSpecifiedBoard = boardStates[boardId];
  // Sort by revision descending, then return the first item (the one with the highest revision number)
  const lastRevision = allRevisionsForSpecifiedBoard.sort(
    (a, b) => b.revision - a.revision
  )[0].revision;

  return lastRevision + 1;
};
