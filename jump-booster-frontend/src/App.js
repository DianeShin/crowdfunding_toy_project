import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import SelectAccount from "./Auth/SelectAccount";
import AccountLogin from "./Auth/AccountLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SelectAccount/>}/>
          <Route path="/individual-login" element={<AccountLogin role="individual"/>}/>
          <Route path="/business-login" element={<AccountLogin role="business"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;