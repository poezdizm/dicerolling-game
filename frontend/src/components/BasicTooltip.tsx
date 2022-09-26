import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {QuestionCircle} from "react-bootstrap-icons";

interface BasicTooltipProps {
    text: string
}

function BasicTooltip(props: BasicTooltipProps) {

    return (
        <OverlayTrigger placement={"right"}
            overlay={
                <Tooltip>
                    {props.text}
                </Tooltip>
        }>
            <QuestionCircle className={"basic-tooltip"} />
        </OverlayTrigger>
    )
}

export default BasicTooltip;