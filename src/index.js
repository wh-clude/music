import React from 'react';
import ReactDOM from 'react-dom';
// 引入全局css和js
import './assets/css/reset.css'
import './assets/js/remScale.js'
import './index.css';
import App from './App';
//引入路由模式的方法
//BrowserRouter属于浏览器路由模式 history
import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode></BrowserRouter>,
  document.getElementById('root')
);

