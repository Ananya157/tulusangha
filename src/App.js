import { BrowserRouter as Router} from 'react-router-dom'
import {Main} from './components/Main'
import 'antd/dist/antd.css'
import React from "react";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
