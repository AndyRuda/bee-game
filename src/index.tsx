import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Game from './Game';

import {
  BrowserRouter,
  Routes ,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes >
        <Route path="/game" element={<Game/>} />
        <Route path="/" element={<App/>} />
    </Routes >
  </BrowserRouter>
  </React.StrictMode >
);