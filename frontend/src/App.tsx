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

function App() {

    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/reg" element={<RegisterPage/>}/>
                <Route path="/add" element={<AddCellsPage/>}/>
                <Route path="/new" element={<NewGamePage/>}/>
                <Route path="/game" element={<BoardPage/>}/>
            </Routes>
        </>
    );
}

export default App;
