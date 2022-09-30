import React, {useEffect, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";
import BasicTooltip from "../BasicTooltip";

interface NumberFormControlProps {
    label: string,
    value: number,
    min?: number,
    max?: number,
    isSmall: boolean,
    valid: boolean,
    setValue: (value: number) => void,
    disableButton: (disable: boolean) => void,
    tooltip?: string
}

function NumberFormControl(props: NumberFormControlProps) {

    const [localValid, setLocalValid] = useState(true)

    function plusOne() {
        setLocalValid(true)
        if ((props.min || props.min === 0 ) && props.value < props.min) {
            props.setValue(props.min)
        } else {
            if (props.value) {
                if ((!props.max && props.max !== 0) || props.value < props.max) {
                    props.setValue(props.value + 1)
                }
            } else {
                props.setValue(1)
            }
        }
    }

    function minusOne() {
        setLocalValid(true)
        if ((props.max || props.max === 0) && props.value > props.max) {
            props.setValue(props.max)
        } else {
            if ((!props.min && props.min !== 0) || props.value > props.min) {
                setLocalValid(true)
                props.setValue(props.value - 1)
            }
        }
    }

    function parseValue(value: string) {
        let intValue = parseInt(value)
        if (value.length === 0 ||
            (props.min || props.min === 0) && intValue < props.min ||
            (props.max || props.max === 0) && intValue > props.max) {
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
        <Form.Group className="mb-2 mt-2 ng-group">
            <Form.Label className={"ng-label " + (props.isSmall ? "ng-label-sm" : "ng-label-md")}>
                {props.label}
                {props.tooltip && <BasicTooltip text={props.tooltip} />}
            </Form.Label>
            <div className={"ng-control-container"}>
                <InputGroup className={"ng-control ng-control-sm"}>
                    <Button variant="outline-secondary" onClick={() => plusOne()}>
                        <ChevronUp />
                    </Button>
                    <Form.Control type="number" min={props.min} max={props.max}
                                  value={props.value} className={"ng-control-number"}
                                  onChange={event => props.setValue(parseValue(event.target.value))}
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

export default NumberFormControl;