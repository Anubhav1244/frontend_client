// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/login';
import SignupPage from './Pages/Signup';
import Charger from './Pages/Chargers';
import PrivateRoute from './Component/PrivateRoute';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path ="/" element={<Home />} />
        <Route
          path="/chargers"
          element={
            <PrivateRoute>
              <Charger />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
