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

      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div >
  );
}

export default App;
