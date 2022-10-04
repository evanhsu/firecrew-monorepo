let board1BoardState: BoardState = {
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

let group1: Group = {
  id: Buffer.from('1').toString('base64'),
  name: 'Celebrities',
};

let board1: Board = {
  id: Buffer.from('1').toString('base64'),
  name: 'Tour Rotation',
  groupId: Buffer.from('1').toString('base64'),
  state: board1BoardState,
};

export const db: Db = {
  boards: {
    'MQ==': board1,
  },
};

type Group = {
  id: string;
  name: string;
};
type Board = {
  id: string;
  name: string;
  groupId: string;
  state: BoardState;
};
type BoardState = {
  id: string;
  revision: number;
  createdAt: string;
  boardId: string;
  rows: GridRow[];
};
type GridRow = {
  id: string;
  order: number;
  boardStateId: string;
  person: Person;
  activeColumn: number;
};
type Person = {
  id: string;
  name: string;
  qualifications?: string[];
  avatar?: string;
  groupId: string;
};
export interface Db {
  boards: Record<Board['id'], Board>;
}
