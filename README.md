# Dicerolling Board Game
> Dmitriy Lysenkov, 2022

Spring Boot + React.JS app  
Demo: [DiceRolling](http://194.58.103.139)

### Requirements
- Java 17 + Maven
- NodeJS v16.17.0 + NPM 8.19.2
- PostgreSQL DB

## Installing / Getting started

Clone this repository:
```shell
git clone https://github.com/poezdizm/dicerolling-game.git
cd dicerolling-game
```
Compile and run spring boot app (or setup as service):
```shell
mvn clean package
java -jar target/dicerolling-game-0.0.1-SNAPSHOT.jar
```
Run React app (or build and start through NGINX):
```shell
cd frontend
npm run start
```

## Features

This project contains website with following features:
* Registration and logging in with JWT token exchange
* Game cells and game creation pages
* Front page containing player statistics and active games list
* A board game page with board generation, drag-n-drop, dynamic data changes through web-sockets

## Links

- [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
- [React STOMP](https://github.com/lahsivjar/react-stomp)
- [React DnD](https://github.com/react-dnd/react-dnd)
- [react-dice-roll](https://github.com/avaneeshtripathi/react-dice-roll)