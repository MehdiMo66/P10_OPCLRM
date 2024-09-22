import "../assets/style/main.css";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "../slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

function Header({ currentUser }) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="../pages/home.jsx">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>

      {isLoggedIn ? (
        <div className="space">
          <Link className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
            {currentUser}
          </Link>
          <Link className="main-nav-item" to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/connect">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
