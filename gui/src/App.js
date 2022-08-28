import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Home from './component/Home'
import Page404 from './component/Page404';
import './App.css';
import AuthContext from './component/AuthProvider';

function App() {
  const { auth } = useContext(AuthContext)
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
