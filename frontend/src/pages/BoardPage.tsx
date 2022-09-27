import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate, useSearchParams} from "react-router-dom";
import {IGame} from "../models/game/IGame";
import GameService from "../service/game-service";

function BoardPage() {

    const isSignedIn = AuthService.isSignedIn()
    const [gameFound, setGameFound] = useState(true)

    const [game, setGame] = useState<IGame>({"id": 0, "title": "Game", "cells": [], "players": [], "isStarted": false})
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        let gameId = searchParams.get("id")
        if (gameId) {
            GameService.getGame(parseInt(gameId)).then(result => {
                setGame(result)
            })
        } else {
            setGameFound(false)
        }
    }, [])

    if (!isSignedIn) {
        return <Navigate to="/login"/>
    }

    if (!gameFound) {
        return <Navigate to="/"/>
    }

    return (
        <>
            <div className="App">
                <header className="App-header board">
                    <Container className="basic-container board">
                        <Row className={"board"}>
                            <Col sm={3} className={"col-players board-col"}>Players</Col>
                            <Col sm={9} className={"col-board board-col"}>{game.title}</Col>
                        </Row>
                    </Container>
                </header>
            </div>
        </>
    )
}

export default BoardPage;
