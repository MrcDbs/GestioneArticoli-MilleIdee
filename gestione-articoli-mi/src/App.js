import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      {/* <LoginForm></LoginForm> */}
      <HashRouter>
        <Routes>
          <Route path="/GestioneArticoli-MilleIdee" element={<LoginForm />}></Route>
          <Route path="/GestioneArticoli-MilleIdee/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </HashRouter>
    </div >
  );
}

export default App;
