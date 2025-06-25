import './App.css';
import Homepage from './components/ApplicationLayout/Pages/Homepage/Homepage';
import Navbar from './components/ApplicationLayout/Pages/Navbar/Navbar';
import Contact from './components/ApplicationLayout/Pages/Contact/Contact';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from './components/ApplicationLayout/Pages/AddPost/AddPost';
import Login from './components/ApplicationLayout/Pages/Login/Login';
import Register from './components/ApplicationLayout/Pages/Register/Register';


function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;