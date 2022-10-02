import React, {createRef, useEffect, useState} from "react";
import AuthService from "../service/auth-service";
import {Col, Container, Row, Card, Toast, ListGroup} from "react-bootstrap";
import {useGames} from "../service/hooks/use-games";
import GameListItem from "../components/GameListItem";
import {IGameSimplified} from "../models/game/IGameSimplified";
import GameService from "../service/game-service";
import {Link} from "react-router-dom";
import Utils from "../service/utils";
import {useStats} from "../service/hooks/use-stats";

export function MainPage() {

    const [show, setShow] = useState(false);

    const isSignedIn = AuthService.isSignedIn()
    const {games} = useGames()

    const {stats} = useStats()

    useEffect(() => {
        adjustListPadding()
    }, [])

    function showToast() {
        setShow(true)
    }

    function deleteGame(game: IGameSimplified) {
        GameService.deleteGame(game.id).then(() => window.location.reload())
    }

    const listElem = createRef<HTMLDivElement>();

    function adjustListPadding() {
        if (listElem.current) {
            try {
                if (Utils.isOverflownY(listElem.current)) {
                    listElem.current.style.paddingRight = 10 + 'px'
                } else {
                    listElem.current.style.paddingRight = 0 + 'px'
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <>
            <div className="App">
                <header className="App-header" style={!isSignedIn ? {justifyContent: "start"} : {}}>
                    {!isSignedIn ?
                        <div className={"logo-container"}>
                            <img className="game-logo animation"/>
                            <Card className="first-card animation">
                                <Card.Body>
                                    <Link to={"/login"} className={"main-link"}>Sign in </Link>
                                    or <Link to={"/reg"} className={"main-link"}>sign up</Link> to start playing
                                </Card.Body>
                            </Card>
                        </div> :
                        <>
                            <Container className="basic-container">
                                <Row>
                                    <Col sm={1} />
                                    <Col sm={6}>
                                        <Card className="main-card">
                                            <Card.Header>
                                                <h2 className={"ng-heading"}>My games</h2>
                                            </Card.Header>
                                            <Card.Body>
                                                <div className="cell-list" ref={listElem}>
                                                    <ListGroup>
                                                        {games.map(game => <GameListItem game={game} showToast={showToast}
                                                                                         onDelete={deleteGame}
                                                                                         key={game.id} />)}
                                                        {games.length == 0 &&
                                                            <div className={"main-heading-container"}>
                                                                <p className={"main-heading"}>No active games.<br/>
                                                                    Try <Link className={"main-link"}
                                                                             to={"/new"} >creating</Link> one now.</p>
                                                            </div>
                                                        }
                                                    </ListGroup>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={1} />
                                    <Col sm={3}>
                                        <Card className="main-card stats-card">
                                            <Card.Header>
                                                <h2 className={"ng-heading"}>Player stats</h2>
                                            </Card.Header>
                                            <Card.Body className={"stats-body"}>
                                                <h4 className={"stats-heading"}>{stats.username}</h4>
                                                <p className={"stats-label"}>
                                                    <span className={"stats-label-b"}>Games won: </span>{stats.gamesWon}
                                                </p>
                                                <p className={"stats-label"}>
                                                    <span className={"stats-label-b"}>Total number of rolls: </span>{stats.totalRolls}
                                                </p>
                                                <p className={"stats-label"}>
                                                    <span className={"stats-label-b"}>Gray cells visited: </span>{stats.grayCells}
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={1} />
                                </Row>
                            </Container>
                            <Toast className={"basic-toast"} onClose={() => setShow(false)}
                                   show={show} delay={1500} autohide>
                                <Toast.Body>Link copied to clipboard</Toast.Body>
                            </Toast>
                        </>
                    }
                </header>
            </div>
        </>
    )
}