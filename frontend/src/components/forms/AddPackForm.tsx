import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import CellService from "../../service/cell-service";

interface APFormProps {
    onHide?: () => void
}

function AddPackForm(props: APFormProps) {

    const [title, setTitle] = useState("")
    const [errorMsg, setErrorMsg] = useState("");

    function handleAdd() {
        CellService.savePack({"id": 0, "title": title?.trim()})
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
                <Form.Label>Pack Name</Form.Label>
                <Form.Control type="text"
                              onChange={event => setTitle(event.target.value)}
                              isInvalid={errorMsg !== ""}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errorMsg}
                </Form.Control.Feedback>
            </Form.Group>
            <Button onClick={() => handleAdd()}>+ Add</Button>
        </Form>
    )
}

export default AddPackForm;
