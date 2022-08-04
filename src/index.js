import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Variables.css';
import './frameworks/bootstrap/scss/bootstrap.scss';
import Header from './components/Header';
import DataGrid from './components/DataGrid';
import RouterAYF from './main';
import './StickyScroll';
import './styles/EstilosBase.css';
import $ from "jquery";
import * as bootstrap from 'bootstrap'
import '../src/Jquery.Serialize';

const root = ReactDOM.createRoot(document.getElementById('root'));

$(function() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});

root.render(
  <React.StrictMode>
     <RouterAYF />
  </React.StrictMode>
);

