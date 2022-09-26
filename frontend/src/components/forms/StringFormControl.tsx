import React from "react";
import {Form} from "react-bootstrap";
import BasicTooltip from "../BasicTooltip";

interface StringFormControlProps {
    label: string,
    value: string,
    isLarge: boolean,
    valid: boolean,
    setValue: (value: string) => void,
    tooltip?: string
}

function StringFormControl(props: StringFormControlProps) {

    return (
        <Form.Group className="mb-3 mt-3 ng-group">
            <Form.Label className={"ng-label"}>
                {props.label}
                {props.tooltip && <BasicTooltip text={props.tooltip} />}
            </Form.Label>
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