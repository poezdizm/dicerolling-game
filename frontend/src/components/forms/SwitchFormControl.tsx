import React from "react";
import {Form} from "react-bootstrap";
import BasicTooltip from "../BasicTooltip";

interface SwitchFormControlProps {
    label: string,
    value: boolean,
    isSmall: boolean,
    onToggle: () => void,
    tooltip?: string
}

function SwitchFormControl(props: SwitchFormControlProps) {

    return (
        <Form.Group className={"mb-3 ng-group " + (!props.isSmall ? "mt-3" : "")}>
            <Form.Label className={"ng-label "  + (props.isSmall ? "ng-label-sm" : "ng-label-md")}>
                {props.label}
                {props.tooltip && <BasicTooltip text={props.tooltip} />}
            </Form.Label>
            <div className={"ng-control-container"}>
                <Form.Switch id="shared-check" aria-label="shared"
                             checked={props.value}
                             className={"ng-control " + (props.isSmall ? "ng-control-switch-sm" : "")}
                             onChange={() => props.onToggle()} />
            </div>
        </Form.Group>
    )
}

export default SwitchFormControl;