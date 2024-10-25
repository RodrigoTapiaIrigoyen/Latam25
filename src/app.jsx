import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import OneVsOne from './components/1vs1';
import Depositos from './components/Depositos';
import Login from './components/Login';
import Registro from './components/Registro';
import Torneos from './components/Torneos';
import SobreNosotros from './components/SobreNosotros';
import Dashboard from './components/Dashboard';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/1vs1"
            element={token ? <OneVsOne /> : <Navigate to="/login" />}
          />
          <Route
            path="/depositos"
            element={token ? <Depositos /> : <Navigate to="/login" />}
          />
          <Route
            path="/torneos"
            element={token ? <Torneos /> : <Navigate to="/login" />}
          />
          <Route
            path="/sobreNosotros"
            element={token ? <SobreNosotros /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;