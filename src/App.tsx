import React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post/Post';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Homepage></Homepage>
      </header>
    </div>
  );
}

export default App;
