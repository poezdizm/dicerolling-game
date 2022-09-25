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
    const [type, setType] = useState(props.cell.type ? props.cell.type.id : props.cellTypes[0].id)
    const [errorMsg, setErrorMsg] = useState("");

    function handleAdd() {
        CellService.saveCell({"id": props.cell.id, "content": content?.trim(), "type": {"id": type}})
            .then(response => {
                if (response.status === 200) {
                    if (props.onHide) {
                        props.onHide()
                    }
                } else {
                    setErrorMsg(response)
                }
            });
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Cell Text</Form.Label>
                <Form.Control as="textarea" rows={3} value={content}
                              onChange={event => setContent(event.target.value)}
                              isInvalid={errorMsg !== ""}>
                    {props.cell.content}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errorMsg}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
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
