import React, {useState} from "react";
import logo from "../logo.svg";
import AuthService from "../service/auth-service";
import {Col, Container, Row, Card, Toast} from "react-bootstrap";
import {useGames} from "../service/hooks/use-games";
import GameListItem from "../components/GameListItem";
import {IGameSimplified} from "../models/IGameSimplified";
import GameService from "../service/game-service";

export function MainPage() {

    const [show, setShow] = useState(false);

    const isSignedIn = AuthService.isSignedIn()
    const {games} = useGames()

    function showToast() {
        setShow(true)
    }

    function deleteGame(game: IGameSimplified) {
        GameService.deleteGame(game.id).then(() => window.location.reload())
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    {!isSignedIn ?
                        <img src={logo} className="App-logo" alt="logo"/> :
                        <>
                            <Container className="basic-container">
                                <Row>
                                    <Col sm={1} />
                                    <Col sm={7}>
                                        <Card>
                                            <Card.Body>
                                                {games.map(game => <GameListItem game={game} showToast={showToast}
                                                                                 onDelete={deleteGame} key={game.id} />)}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4} />
                                </Row>
                            </Container>
                            <Toast className={"basic-toast"} onClose={() => setShow(false)} show={show} delay={1500} autohide>
                                <Toast.Body>Link copied to clipboard</Toast.Body>
                            </Toast>
                        </>
                    }
                </header>
            </div>
        </>
    )
}