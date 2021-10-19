import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskGrid from './pages/TaskGrid';
import TaskForm from './pages/TaskForm';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={Home} />
        <Route path={'/tasks'} exact component={TaskGrid} />
        <Route path={'/tasks/new'} component={TaskForm} />
        <Route path={'/tasks/:id/edit'} component={TaskForm} />
      </BrowserRouter>
    </div>
  );
};

export default App;
