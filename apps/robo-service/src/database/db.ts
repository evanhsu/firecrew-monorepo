let board1BoardStateRev1: BoardStateModel = {
  id: Buffer.from('board:1:revision:1').toString('base64'),
  revision: 1,
  createdAt: Date.toString(),
  boardId: Buffer.from('1').toString('base64'),
  rows: [
    {
      id: Buffer.from('0').toString('base64'),
      order: 0,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('10').toString('base64'),
        name: 'Albert Einstein',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 1,
    },
    {
      id: Buffer.from('1').toString('base64'),
      order: 1,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('20').toString('base64'),
        name: 'Billy Idol',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 0,
    },
    {
      id: Buffer.from('2').toString('base64'),
      order: 2,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('30').toString('base64'),
        name: 'Charlie Chaplin',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 2,
    },
    {
      id: Buffer.from('3').toString('base64'),
      order: 3,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('40').toString('base64'),
        name: 'David Bowie',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 2,
    },
    {
      id: Buffer.from('4').toString('base64'),
      order: 4,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('50').toString('base64'),
        name: 'Ewan McGregor',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 0,
    },
    {
      id: Buffer.from('5').toString('base64'),
      order: 5,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('60').toString('base64'),
        name: 'Fox McCloud',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 0,
    },
    {
      id: Buffer.from('6').toString('base64'),
      order: 6,
      boardStateId: Buffer.from('board:1:revision:1').toString('base64'),
      person: {
        id: Buffer.from('70').toString('base64'),
        name: 'Gravy Train',
        groupId: Buffer.from('1').toString('base64'),
      },
      activeColumn: 2,
    },
  ],
};

let group1: GroupModel = {
  id: Buffer.from('1').toString('base64'),
  name: 'Celebrities',
};

let board1: BoardModel = {
  id: Buffer.from('1').toString('base64'),
  name: 'Tour Rotation',
  groupId: Buffer.from('1').toString('base64'),
};

let boards = {
  [board1.id]: board1,
};

// All revisions for a specific boardId are contained in an array
let boardStates = {
  [board1BoardStateRev1.boardId]: [board1BoardStateRev1],
};

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
  createdAt: string;
  boardId: string;
  rows: GridRowModel[];
};
export type GridRowModel = {
  id: string;
  order: number;
  boardStateId: string;
  person: PersonModel;
  activeColumn: number;
};
export type PersonModel = {
  id: string;
  name: string;
  qualifications?: string[];
  avatar?: string;
  groupId: string;
};

export interface Db {
  board: (boardId: BoardModel['id']) => BoardModel | undefined;
  /**
   * Get a fully-hydrated boardState for the specified Board (including full Person documents)
   * If no revision is provided, the latest revision is selected.
   */
  boardState: (
    boardId: BoardModel['id'],
    revision?: number
  ) => BoardStateModel | undefined;
}

export const db: Db = {
  board: (boardId) => {
    return boards[boardId];
  },
  boardState: (boardId, revision?) => {
    const allRevisionsForSpecifiedBoard = boardStates[boardId];
    if (!allRevisionsForSpecifiedBoard) {
      // Not found
      return undefined;
    }

    if (revision !== undefined) {
      return allRevisionsForSpecifiedBoard.filter(
        (boardState) => boardState.revision === revision
      )?.[0];
    }

    // Sort by revision descending, then return the first item (the one with the highest revision number)
    return allRevisionsForSpecifiedBoard.sort(
      (a, b) => b.revision - a.revision
    )[0];
  },
};
