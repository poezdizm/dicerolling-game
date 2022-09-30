import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate, useSearchParams} from "react-router-dom";
import {IGame} from "../models/game/IGame";
import GameService from "../service/game-service";
import GameCell from "../components/board/GameCell";
import {IPlayer} from "../models/game/IPlayer";
import PlayerRow from "../components/board/PlayerRow";
import PlayerIcon from "../components/board/PlayerIcon";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import GameCellDummy from "../components/board/GameCellDummy";
import {useSubscription} from "react-stomp-hooks";
import {authHeaderStomp} from "../service/hooks/auth-header-stomp";
import Dice from "react-dice-roll";

function BoardPage() {

    const isSignedIn = AuthService.isSignedIn()
    const loggedInUser = AuthService.getUser()
    const [gameFound, setGameFound] = useState(true)

    const [columns, setColumns] = useState(3)
    const containerStyle = {
        gridTemplateColumns: "repeat(" + columns + ", 1fr)"
    }

    const [game, setGame] = useState<IGame>({
        "id": 0, "title": "Game", "cells": [],
        "players": [], "isStarted": false, "playersMax": 0
    })
    const [searchParams, setSearchParams] = useSearchParams()

    const [players, setPlayers] = useState<IPlayer[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(
        {"username": loggedInUser.username.toString(), "position": 0})

    useSubscription("/topic/game-message-" + loggedInUser.username + "-game-" + game.id,
        (message) => setGameFromMessage(message.body),
        authHeaderStomp());

    function isGame(o: any): o is IGame {
        return "id" in o && "title" in o && "cells" in o && "players" in o && "isStarted" in o && "playersMax" in o
    }

    function setGameFromMessage(message: string) {
        const parsed = JSON.parse(message);
        if (isGame(parsed)) {
            setGame(parsed)
        }
    }


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
        console.log(game)
        let columnNumber = 4
        if (game.cells.length === 1 || game.cells.length === 3) {
            columnNumber = 3
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
            if (player.username === currentPlayer.username) {
                setCurrentPlayer({"username": player.username, "position": player.position,
                    "lastRollValue": player.lastRollValue})
            }
            pushToPlayers(player)
        })

        if (playerArray.length < max) {
            for (let i = playerArray.length; i < max; i++) {
                pushToPlayers({"username": i.toString(), "position": 0})
            }
        }
    }

    function pushToPlayers(newElement: IPlayer) {
        setPlayers(prevPlayers => ([...prevPlayers, newElement]));
    }

    function movePlayer(newPosition: number) {
        setCurrentPlayer({"username": currentPlayer.username, "position": newPosition})
        setPlayers(players.map(player => currentPlayer.username === player.username ?
            {...player, position: newPosition} :
            {...player}
        ))
    }

    function setRoll(value: number) {
        GameService.sendRoll(game.id, value)
            .then(() => {
                setCurrentPlayer({...currentPlayer, "lastRollValue": value})
                setPlayers(players.map(player => currentPlayer.username === player.username ?
                    {...player, lastRollValue: value} :
                    {...player}
                ))
            })
    }

    function canMovePlayer(newPosition: number): boolean {
        console.log(currentPlayer.lastRollValue)
        return !!(newPosition === 0 || (
            currentPlayer.lastRollValue && (currentPlayer.lastRollValue + currentPlayer.position) === newPosition));
    }

    if (!isSignedIn) {
        return <Navigate to="/login"/>
    }

    if (!gameFound) {
        return <Navigate to="/"/>
    }

    return (
        <DndProvider backend={HTML5Backend}>
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
                                    <div className={"dice-container"}>
                                        <Dice size={150} disabled={!game.isStarted} onRoll={value => setRoll(value)}/>
                                    </div>
                                </Row>
                            </Col>
                            <Col sm={9} className={"col-board board-col"}>
                                <Row className={"board-row"}>
                                    <h2>{game.title}</h2>
                                </Row>
                                <Row className={"board-row board-grid"}>
                                    <div style={containerStyle} className={"board-container"}>
                                        <GameCellDummy position={0} className={"start-cell"}
                                                       game={game} players={players} moveIcon={movePlayer}
                                                       canMove={canMovePlayer} currentPlayer={currentPlayer}
                                                       children={
                                                           players.map(player => player.position === 0 ?
                                                               <PlayerIcon player={player} currentPlayer={currentPlayer}
                                                                           key={player.username}/> : null)
                                                       }
                                        />
                                        {game.cells.map(cell =>
                                                <GameCell cell={cell} players={players} game={game}
                                                          currentPlayer={currentPlayer}
                                                          moveIcon={movePlayer} canMove={canMovePlayer}
                                                          children={
                                                              players.map(player => cell.position === player.position ?
                                                                  <PlayerIcon player={player}
                                                                              currentPlayer={currentPlayer}
                                                                              key={player.username}/> : null)
                                                          }
                                                          key={cell.position}/>)}
                                        <GameCellDummy position={game.cells.length + 1} className={"finish-cell"}
                                                       game={game} players={players} moveIcon={movePlayer}
                                                       canMove={canMovePlayer} currentPlayer={currentPlayer}
                                                       children={
                                                           players.map(player => player.position === (game.cells.length + 1) ?
                                                               <PlayerIcon player={player} currentPlayer={currentPlayer}
                                                                           key={player.username}/> : null)
                                                       }
                                        />
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
        </DndProvider>
    )
}

export default BoardPage;
