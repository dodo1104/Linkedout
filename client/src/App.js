import React, { Fragment, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import setReqAuthToken from './utils/setReqAuthToken';
import setBaseURL from './utils/setBaseURL';

import './App.css';
import TESTING from './pages/TESTING';
import PrivateRoute from './components/route/PrivateRoute';
import Modal from './components/UIelements/Modal';
import Navbar from './components/UIelements/navbar/Navbar';
import RegisterPage from './pages/RegisterPage';
import RegPage from './pages/RegPage';
import LogPage from './pages/LogPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import './transitions.css'; /*needs to be imported last because of the cascading stage*/

if (localStorage.token) {
  setReqAuthToken(localStorage.token);
}

setBaseURL();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <BrowserRouter>
      <Navbar toggleModal={toggleModal} />
      {/* <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <div className="modal info-box">
          <h1>byeeee</h1>
        </div>
      </Modal> */}
      <Routes>
        {/* <Route exact path="/register" element={<RegisterPage />} /> */}
        {/* <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <RegisterPage />
            </PrivateRoute>
          }
        /> */}
        {/* <Alert /> */}
        <Route exact path="/testing" element={<TESTING />} />
        <Route
          exact
          path="/"
          element={<Navigate to="/login" replace={true} />}
        />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/log" element={<LogPage />} />
        <Route exact path="/test" element={<RegPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/profile/:profileId" element={<TESTING />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
