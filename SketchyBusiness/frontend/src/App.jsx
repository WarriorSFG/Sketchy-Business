import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Drawings from "./pages/Drawings";
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignUp from './pages/Signup';
import Register from './pages/Register';

function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/drawings" element={<Drawings />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App
