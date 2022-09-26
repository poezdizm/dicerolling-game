import React from 'react';
import './App.css';
import './styles.scss';
import {Route, Routes} from "react-router-dom";
import {RollsPage} from "./pages/RollsPage";
import {Navigation} from "./components/Navigation";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {AddCellsPage} from "./pages/AddCellsPage";
import NewGamePage from "./pages/NewGamePage";

function App() {

    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<RollsPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/reg" element={<RegisterPage/>}/>
                <Route path="/add" element={<AddCellsPage/>}/>
                <Route path="/new" element={<NewGamePage/>}/>
            </Routes>
        </>
    );
}

export default App;
