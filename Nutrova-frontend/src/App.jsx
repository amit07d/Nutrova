import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
