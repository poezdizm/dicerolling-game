import React from 'react';
import {Badge, Col, Container, ListGroup, Row} from "react-bootstrap";
import {Trash3} from "react-bootstrap-icons";
import {IGameSimplified} from "../models/IGameSimplified";
import {Link} from "react-router-dom";

interface GameListItemProps {
    game: IGameSimplified
}

function GameListItem(props: GameListItemProps) {

    return (
        <ListGroup.Item className={"cell-list-item"}>
            <Container fluid>
                <Row>
                    <Col className={"content"}>
                        <Link to={"/game?id=" + props.game.id}>{props.game.title}</Link>
                    </Col>
                    <Col sm={1} className={"badge-col"}>
                        <Badge><Trash3 /></Badge>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    )
}

export default GameListItem;
