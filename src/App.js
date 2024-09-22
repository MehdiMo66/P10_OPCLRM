import Home from "./pages/home";
import Connect from "./pages/connect";
import User from "./pages/user";
import Ntm from "./pages/error";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        {isLoggedIn ? (
          <Route path="connect/user" element={<User />} />
        ) : (
          <Route
            path="connect/user"
            element={<Navigate to="/error" replace />}
          />
        )}
        <Route path="/error" element={<Ntm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
