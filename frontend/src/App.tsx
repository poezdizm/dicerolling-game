import React from 'react';
import './App.css';
import './styles.scss';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {Navigation} from "./components/Navigation";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {AddCellsPage} from "./pages/AddCellsPage";
import NewGamePage from "./pages/NewGamePage";
import BoardPage from "./pages/BoardPage";
import {StompSessionProvider} from "react-stomp-hooks";
import {authHeaderStomp} from "./service/hooks/auth-header-stomp";

function App() {

    return (
        <StompSessionProvider
            url={"http://192.168.0.104:8080/messages"} connectHeaders={authHeaderStomp()}>
            <Navigation/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/reg" element={<RegisterPage/>}/>
                <Route path="/add" element={<AddCellsPage/>}/>
                <Route path="/new" element={<NewGamePage/>}/>
                <Route path="/game" element={<BoardPage/>}/>
            </Routes>
        </StompSessionProvider>
    );
}

export default App;
