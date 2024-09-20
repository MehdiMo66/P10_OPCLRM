import Home from "./pages/home";
import Connect from "./pages/connect";
import User from "./pages/user";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { login } from "./slice/userSlice";
import { UseSelector, useSelector } from "react-redux";
import Ntm from "./pages/error";
import { redirect } from "react-router-dom";
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
