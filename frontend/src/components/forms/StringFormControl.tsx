import React from "react";
import {Form} from "react-bootstrap";

interface StringFormControlProps {
    label: string,
    value: string,
    isLarge: boolean,
    valid: boolean,
    setValue: (value: string) => void
}

function StringFormControl(props: StringFormControlProps) {

    return (
        <Form.Group className="mb-3 mt-3 ng-group">
            <Form.Label className={"ng-label"}>{props.label}</Form.Label>
            <div className={"ng-control-container"}>
                <Form.Control size="lg" type="text" value={props.value}
                              className={"ng-control " +  + (props.isLarge ? "ng-control-lg" : "")}
                              onChange={event => props.setValue(event.target.value)}
                              isInvalid={!props.valid}>
                </Form.Control>
            </div>
        </Form.Group>
    )
}

export default StringFormControl;