import Home from "./pages/home";
import Connect from "./pages/connect";
import User from "./pages/user";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { login } from "./slice/userSlice";
import {useSelector } from "react-redux";

function App() {

const isLoggedIn = useSelector((state)=>state.isLoggedIn)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="connect/user" element={ <User />} /> 
        
    
      </Routes>
    </Router>
  );
}

export default App;
