import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestForm from './components/RequestForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RequestForm />} />
          <Route path="/pending" element={<h2>Request Pending...</h2>} />
          <Route path="/main" element={<h2>Welcome to Main Page!</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
