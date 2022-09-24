import React from 'react';
import {ListGroup} from "react-bootstrap";
import {ICell} from "../models/ICell";

interface CellProps {
    cell: ICell
}

function CellListItem(props: CellProps) {
    const itemStyle = {
        backgroundColor: props.cell.type ? props.cell.type.color : '#FFFFFF',
    }

    return (
        <ListGroup.Item style={itemStyle} className={"cell-list-item"}>{props.cell.content}</ListGroup.Item>
    )
}

export default CellListItem;
