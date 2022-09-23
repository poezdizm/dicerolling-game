import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {RollsPage} from "./pages/RollsPage";
import {Navigation} from "./components/Navigation";

function App() {

  return (
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<RollsPage/>}/>
        </Routes>
      </>
  );
}

export default App;
