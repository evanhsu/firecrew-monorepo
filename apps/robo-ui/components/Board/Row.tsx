import React, { FunctionComponent, CSSProperties } from 'react';
import Cell from './Cell';

export type RowProps = {
    person: {
        id: number,
        name: string,
    },
    activeColumn: number,
    index: number,
}

const styles = {
    display: 'flex',
    flexDirection: 'row',
    height: '75px',
} as CSSProperties;

const Row: FunctionComponent<RowProps> = ({ person, activeColumn, index }) => {
    const cells = [0, 1, 2].map((_, i) => {
        return <Cell tile={i === activeColumn ? person: undefined} row={index} column={i} key={`${person.id}${i}`} />
    });

    return <div style={styles}>{cells}</div>
}

export default Row;
