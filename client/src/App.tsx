import Breadcrumb from 'flowbite-react/lib/esm/components/Breadcrumb';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Movie from './components/Movie';
import Movies from './components/Movies';

const App = () => {
  return (
    <BrowserRouter>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      </Breadcrumb>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
