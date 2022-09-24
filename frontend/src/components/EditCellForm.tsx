import React, {useState} from 'react';
import {ICell} from "../models/ICell";
import {Button, Form} from "react-bootstrap";
import {ICellType} from "../models/ICellType";
import CellTypeSelectItem from "./CellTypeSelectItem";
import CellService from "../service/cell-service";

interface ECFormProps {
    cell: ICell,
    cellTypes: ICellType[],
    onHide?: () => void
}

function EditCellForm(props: ECFormProps) {

    const [content, setContent] = useState(props.cell.content)
    const [type, setType] = useState(props.cellTypes[0].id)

    function handleAdd() {
        CellService.saveCell({"id": props.cell.id, "content": content, "type": {"id": type}})
            .then(() => {
                if (props.onHide) {
                    props.onHide()
                }
            })
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Cell Text</Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={event => setContent(event.target.value)}>
                    {props.cell.content}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Cell Type</Form.Label>
                <Form.Select value={type} onChange={event => setType(parseInt(event.target.value))}>
                    {props.cellTypes.map(cellType => <CellTypeSelectItem cellType={cellType} key={cellType.id} />)}
                </Form.Select>
            </Form.Group>
            <Button onClick={() => handleAdd()}>+ Add</Button>
        </Form>
    )
}

export default EditCellForm;
