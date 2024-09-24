import Home from "./pages/home";
import Connect from "./pages/connect";
import User from "./pages/user";
import Error from "./pages/page404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/connect" element={<Connect />} />
        {isLoggedIn ? (
          <Route path="connect/user" element={<User />} />
        ) : (
          <Route path="connect/user" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
