import React from 'react';
import {ListGroup} from "react-bootstrap";
import {ICell} from "../models/ICell";

interface CellProps {
    cell: ICell
}

function CellListItem(props: CellProps) {
    const itemStyle = {
        backgroundColor: props.cell.type.color,
        maxHeight: 45,
        overflow: 'hidden',
        flexShrink: 1,
        textOverflow: 'ellipsis',
        fontWeight: 14,
        fontSize: 20
    }

    return (
        <ListGroup.Item style={itemStyle}>{props.cell.content}</ListGroup.Item>
    )
}

export default CellListItem;
