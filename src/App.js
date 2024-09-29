import Home from "./pages/home";
import Connect from "./pages/connect";
import User from "./pages/user";
import Error from "./pages/page404";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        
        {isLoggedIn ? (
          <>
            <Route path="connect/user" element={<User />} />
            <Route path="/connect" element={<Navigate to='/connect/user' replace />} />
          </>
        ) : (
          <>
            <Route path="/connect" element={<Connect />} />
            <Route path="connect/user" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
