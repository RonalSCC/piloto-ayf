import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { PeriodoContable } from "./components/PeriodoContable";
import ConsecutivoDocumentos from './components/ConsecutivoDocumentos/ConsecutivoDocumentos';
import GeneralMaestros from './components/GeneralMaestros/GeneralMaestros';


// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function RouterAYF() {
  return (
    <Router>
        
        <Routes>
          <Route exact path="/PeriodoContable" element={<PeriodoContable/>} />

          <Route exact path="/ConsecutivoDocumentos" element={<ConsecutivoDocumentos/>} />
          <Route exact path="/GeneralMaestros" element={<GeneralMaestros/>} />

        </Routes>
    </Router>
  );
}