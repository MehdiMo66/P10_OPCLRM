import "../assets/style/main.css";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "../slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Header({ hideSignIn }) {
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
      </Link>

      {isLoggedIn ? (
        <div className="space">
          <Link className="main-nav-item" to="/connect/user">
            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
            <span>{user.userName}</span>
          </Link>
          <Link className="main-nav-item" to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          {!hideSignIn && (
            <Link className="main-nav-item" to="/connect">
              <FontAwesomeIcon icon={faUserCircle} />
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}


