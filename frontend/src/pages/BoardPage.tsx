import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Stack} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate, useSearchParams} from "react-router-dom";
import {IGame} from "../models/game/IGame";
import GameService from "../service/game-service";
import GameCell from "../components/board/GameCell";
import {IPlayer} from "../models/game/IPlayer";
import {ICellType} from "../models/ICellType";
import {ITypeValue} from "../models/ITypeValue";
import PlayerRow from "../components/board/PlayerRow";

function BoardPage() {

    const isSignedIn = AuthService.isSignedIn()
    const [gameFound, setGameFound] = useState(true)

    const [columns, setColumns] = useState(3)
    const containerStyle = {
        gridTemplateColumns: "repeat(" + columns + ", 1fr)"
    }

    const [game, setGame] = useState<IGame>({"id": 0, "title": "Game", "cells": [],
        "players": [], "isStarted": false, "playersMax": 1})
    const [searchParams, setSearchParams] = useSearchParams()

    const [players, setPlayers] = useState<IPlayer[]>([])

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

    useEffect(() => {
        let columnNumber = 4;
        if (game.cells.length === 1 || game.cells.length === 3) {
            columnNumber = 3;
        }
        if (game.cells.length > 4) {
            columnNumber += Math.floor((game.cells.length - 4) / 7)
        }
        setColumns(columnNumber)

        initPlayers(game.players, game.playersMax)
    }, [game])

    function initPlayers(playerArray: IPlayer[], max: number) {
        setPlayers([])
        playerArray.forEach(player => {
            pushToPlayers(player)
        })

        if (playerArray.length < max) {
            for (let i = playerArray.length; i < max; i++) {
                pushToPlayers({"username": i.toString(), "position": 0})
            }
        }
    }

    function pushToPlayers(newElement: IPlayer) {
        setPlayers(prevPlayers => [...prevPlayers, newElement]);
    }

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
                            <Col sm={3} className={"col-players board-col"}>
                                <Row className={"players-row"}>
                                    <h2>Players</h2>
                                    {players.map(player => <PlayerRow player={player}
                                                                               max={game.cells.length + 1}
                                                                               key={player.username}/>)}
                                </Row>
                            </Col>
                            <Col sm={9} className={"col-board board-col"}>
                                <Row className={"board-row"}>
                                    <h2>{game.title}</h2>
                                </Row>
                                <Row className={"board-row board-grid"}>
                                    <div style={containerStyle} className={"board-container"}>
                                        <div className={"game-cell-div"}>
                                            <div className={"cell-gap"}></div>
                                            <div className={"game-cell start-cell"}></div>
                                        </div>
                                        {game.cells.map(cell => <GameCell cell={cell} key={cell.position}/>)}
                                        <div className={"game-cell-div"}>
                                            <div className={"cell-gap"}></div>
                                            <div className={"game-cell finish-cell"}></div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className={"board-row"}>
                                    <h2>{game.title}</h2>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </header>
            </div>
        </>
    )
}

export default BoardPage;
