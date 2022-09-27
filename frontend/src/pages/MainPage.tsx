import React from "react";
import logo from "../logo.svg";
import AuthService from "../service/auth-service";
import {Col, Container, Row, Card} from "react-bootstrap";
import {useGames} from "../service/hooks/use-games";
import GameListItem from "../components/GameListItem";

export function MainPage() {

    const isSignedIn = AuthService.isSignedIn()
    const {games} = useGames()

    return (
        <>
            <div className="App">
                <header className="App-header">
                    {!isSignedIn ?
                        <img src={logo} className="App-logo" alt="logo"/> :
                        <Container className="basic-container">
                            <Row>
                                <Col sm={1} />
                                <Col sm={7}>
                                    <Card>
                                        <Card.Body>
                                            {games.map(game => <GameListItem game={game} />)}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={4} />
                            </Row>
                        </Container>
                    }
                </header>
            </div>
        </>
    )
}