import React from 'react';
import {ICellType} from "../models/ICellType";

interface CTSProps {
    cellType: ICellType
}

function CellTypeSelectItem(props: CTSProps) {
    const itemStyle = {
        color: props.cellType.color === '#FFFFFF' ? '#000000' : props.cellType.color
    }

    return (
        <option value={props.cellType.id} style={itemStyle}>{props.cellType.label}</option>
    )
}

export default CellTypeSelectItem;
