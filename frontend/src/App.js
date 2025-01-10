import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RepoDetails from './components/RepoDetails';
import Followers from './components/Followers';
import { GlobalProvider } from './useGlobalContext';
function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repo/:name" element={<RepoDetails />} />
          <Route path="/followers/:username" element={<Followers />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
