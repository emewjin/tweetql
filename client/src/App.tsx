import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Movie from './components/Movie';
import Movies from './components/Movies';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
