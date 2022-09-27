import React, {useEffect, useState} from 'react';
import {Badge, Col, Container, ListGroup, Row, Toast} from "react-bootstrap";
import {Link45deg, Trash3} from "react-bootstrap-icons";
import {IGameSimplified} from "../models/IGameSimplified";
import {Link} from "react-router-dom";

interface GameListItemProps {
    game: IGameSimplified,
    showToast: () => void,
    onDelete: (fame: IGameSimplified) => void
}

function GameListItem(props: GameListItemProps) {

    const [baseUrl, setBaseUrl] = useState("")

    useEffect(() => {
        setBaseUrl(window.location.protocol + "//" + window.location.host)
    }, [])

    function copyLink() {
        navigator.clipboard.writeText(baseUrl + "/game?id=" + props.game.id)
        props.showToast()
    }

    return (
        <ListGroup.Item className={"cell-list-item"}>
            <Container fluid>
                <Row>
                    <Col className={"content"}>
                        <Link to={"/game?id=" + props.game.id}>{props.game.title}</Link>
                    </Col>
                    <Col sm={1} className={"badge-col"}>
                        <Badge onClick={() => copyLink()}>
                            <Link45deg />
                        </Badge>
                    </Col>
                    <Col sm={1} className={"badge-col"}>
                        <Badge onClick={() => props.onDelete(props.game)}>
                            <Trash3 />
                        </Badge>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    )
}

export default GameListItem;
