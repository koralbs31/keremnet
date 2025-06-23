import React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post/Post';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Post
          title="test Title"
          author="test Name"
          date="2024-06-10"
          content="This is the content of the post."
        />
      </header>
    </div>
  );
}

export default App;
