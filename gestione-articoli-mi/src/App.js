import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import PrivateRoute from './util/PrivateRoute';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      {/* <LoginForm></LoginForm> */}
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/GestioneArticoli-MilleIdee/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route path="/GestioneArticoli-MilleIdee" element={<LoginForm />}></Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
