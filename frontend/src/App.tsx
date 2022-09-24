import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {RollsPage} from "./pages/RollsPage";
import {Navigation} from "./components/Navigation";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {AddCellsPage} from "./pages/AddCellsPage";

function App() {

    const user = JSON.parse(localStorage.getItem("user") || '{}')

    return (
        <>
            <Navigation user={user}/>
            <Routes>
                <Route path="/" element={<RollsPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/reg" element={<RegisterPage/>}/>
                <Route path="/add" element={<AddCellsPage/>}/>
            </Routes>
        </>
    );
}

export default App;
