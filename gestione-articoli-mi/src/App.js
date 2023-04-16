import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      {/* <LoginForm></LoginForm> */}
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={<LoginForm />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
