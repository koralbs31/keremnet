import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/ApplicationLayout/Pages/Homepage/Homepage';
import Navbar from './components/ApplicationLayout/Pages/Navbar/Navbar';
import Contact from './components/ApplicationLayout/Pages/Contact/Contact';
import AddPost from './components/ApplicationLayout/Pages/AddPost/AddPost';
import Login from './components/ApplicationLayout/Pages/Login/Login';
import Register from './components/ApplicationLayout/Pages/Register/Register';

export interface User {
  id: string;
  username: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={() => setUser(null)} />
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
