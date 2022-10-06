import React, { FunctionComponent, CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import Theme from '../../theme';

type TileProps = {
    primaryText: string,
    secondaryText?: string,
    id: number,
    position: {
        row: number,
        column: number,
    },
}

const styles = {
    tile: {
        // border: `3px solid ${Theme.colors.dark}`,
        boxShadow: `1px 2px 3px ${Theme.colors.dark}`,
        flex: 1,
        opacity: 1,
        backgroundColor: Theme.colors.primary,
        display: "flex",
        flexDirection: "column",
    } as CSSProperties,
    primaryText: {
        fontSize: "20px",
        flex: 1,
        color: Theme.colors.accent,
    } as CSSProperties,
    secondaryText: {
        fontSize: "15px",
        flex: 1,
        color: Theme.colors.accent,
    } as CSSProperties,
};

const Tile: FunctionComponent<TileProps> = ({ primaryText, secondaryText, id, position }) => {
    const [{ opacity }, dragRef] = useDrag({
        item: { type: "TILE", id, position },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
        isDragging: monitor => {
            return id === monitor.getItem().id;
        },
    });

    return (
        // TODO: The opacity is retained while dragging vertically, but not while dragging horizontally.
        <div ref={dragRef} style={{ ...styles.tile, opacity }}>
            <span style={styles.primaryText}>{primaryText}</span>
            <span style={styles.secondaryText}>{secondaryText}</span>
        </div>
    );
};

export default Tile;
