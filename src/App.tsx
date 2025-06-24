import './App.css';
import Homepage from './components/ApplicationLayout/Pages/Homepage/Homepage';
import Navbar from './components/ApplicationLayout/Pages/Navbar/Navbar';
import Contact from './components/ApplicationLayout/Pages/Contact/Contact';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from './components/ApplicationLayout/Pages/AddPost/AddPost';


function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;