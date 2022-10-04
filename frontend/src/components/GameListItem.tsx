import React, {useEffect, useState} from 'react';
import {Badge, Col, Container, ListGroup, Row} from "react-bootstrap";
import {Link45deg, Trash3} from "react-bootstrap-icons";
import {IGameSimplified} from "../models/game/IGameSimplified";
import {Navigate} from "react-router-dom";

interface GameListItemProps {
    game: IGameSimplified,
    showToast: () => void,
    onDelete: (fame: IGameSimplified) => void
}

function GameListItem(props: GameListItemProps) {

    const [baseUrl, setBaseUrl] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setBaseUrl(window.location.protocol + "//" + window.location.host)
    }, [])

    function copyToClipboard(textToCopy: string) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy);
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed"
            textArea.style.left = "-999999px"
            textArea.style.top = "-999999px"
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            document.execCommand('copy');
            textArea.remove()
        }
    }

    function copyLink() {
        copyToClipboard(baseUrl + "/game?id=" + props.game.id)
        props.showToast()
    }

    if (redirect) {
        return <Navigate to={"/game?id=" + props.game.id} />
    }

    return (
        <ListGroup.Item className={"list-item main-list-item"}>
            <Container fluid>
                <Row>
                    <Col className={"content"} onClick={() => setRedirect(true)}>
                        <p>{props.game.title}</p>
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
