import React, {useEffect, useState} from "react";
import {ICellType} from "../../models/ICellType";
import {Button, Form, InputGroup} from "react-bootstrap";
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";

interface CTFormControlProps {
    cellType: ICellType,
    value?: number,
    max: number,
    valid: boolean,
    disableButton: (disable: boolean) => void,
    setValue: (cellType: ICellType, value: number) => void
}

function CellTypeFormControl(props: CTFormControlProps) {

    const [localValid, setLocalValid] = useState(true)

    const itemStyle = {
        backgroundColor: props.cellType.color
    }

    function plusOne() {
        setLocalValid(true)
        if (props.value) {
            if (props.value !== props.max) {
                props.setValue(props.cellType, props.value + 1)
            }
        } else {
            props.setValue(props.cellType, 1)
        }
    }

    function minusOne() {
        if (props.value && props.value !== 0) {
            setLocalValid(true)
            props.setValue(props.cellType, props.value - 1)
        }
    }

    function parseValue(value: string) {
        if (!value || value.length === 0) {
            setLocalValid(false)
        } else {
            setLocalValid(true)
        }
        return parseInt(value)
    }

    useEffect(() => {
        props.disableButton(!localValid)
    }, [localValid])

    return (
        <Form.Group className="mb-3 mt-2 ng-group">
            <Form.Label className={"ng-label ng-label-sm"}>{props.cellType.label}</Form.Label>
            <div className={"ng-control-container"}>
                <InputGroup className={"ng-control ng-control-sm"}>
                    <Button variant="outline-secondary" onClick={() => plusOne()}>
                        <ChevronUp />
                    </Button>
                    <Form.Control type="number" min="0" max={props.max} style={itemStyle}
                                  value={props.value} className={"ng-control-number"}
                                  onChange={event => props.setValue(props.cellType, parseValue(event.target.value))}
                                  isInvalid={!props.valid || !localValid}>
                    </Form.Control>
                    <Button variant="outline-secondary" onClick={() => minusOne()}>
                        <ChevronDown />
                    </Button>
                </InputGroup>
            </div>
        </Form.Group>
    )
}

export default CellTypeFormControl;