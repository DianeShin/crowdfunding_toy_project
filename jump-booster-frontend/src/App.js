import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import './App.css';

import SelectAccount from "./SelectAccount";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SelectAccount/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;