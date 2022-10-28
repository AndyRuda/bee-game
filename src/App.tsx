import React from 'react';
import { Link } from "react-router-dom";
import logo from './logo.svg';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to='/game'>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
    </div>
  );
}

export default App;
