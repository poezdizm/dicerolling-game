import React, {useState} from 'react';
import {Badge, Col, Container, ListGroup, Row} from "react-bootstrap";
import {ICell} from "../models/ICell";
import {Pencil, Trash3} from "react-bootstrap-icons";

interface CellProps {
    cell: ICell,
    openEdit: (cell: ICell) => void
    openDelete: (cell: ICell) => void
}

function CellListItem(props: CellProps) {
    const itemStyle = {
        backgroundColor: props.cell.type ? props.cell.type.color : '#FFFFFF'
    }

    const [contentSize, setContentSize] = useState(12)
    const [badgeClass, setBadgeClass] = useState("hidden")

    function hover() {
        setContentSize(10)
        setBadgeClass("")
    }

    function unHover() {
        setContentSize(12)
        setBadgeClass("hidden")
    }

    return (
        <ListGroup.Item style={itemStyle} className={"list-item cell-list-item"}
                        onMouseEnter={() => hover()} onMouseLeave={() => unHover()}>
            <Container fluid>
                <Row>
                    <Col sm={contentSize} className={"content"}>{props.cell.content}</Col>
                    <Col sm={1} className={"badge-col " + badgeClass}>
                        <Badge onClick={() => props.openEdit(props.cell)}><Pencil /></Badge>
                    </Col>
                    <Col sm={1} className={"badge-col " + badgeClass}>
                        <Badge onClick={() => props.openDelete(props.cell)}><Trash3 /></Badge>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    )
}

export default CellListItem;
