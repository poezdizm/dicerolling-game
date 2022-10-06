import React from 'react';
import {ICellPack} from "../../models/ICellPack";

interface CPSProps {
    pack: ICellPack
}

function CellPackSelectItem(props: CPSProps) {
    return (
        <option value={props.pack.id} >{props.pack.title}</option>
    )
}

export default CellPackSelectItem;
