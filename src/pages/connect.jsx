import "../assets/style/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/userSlice";
import { useState } from "react";

export default function Connect() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleCLick = (e) => {
    e.preventDefault();

    dispatch(login({ email, password })).then((response) => {
      if (response.payload) {
        sessionStorage.setItem("token", response.payload.token);
        navigate(`/connect/user`);
      } else {
        setError("Erreur sur le mot de passe ou l'identifiant.");
      }
    });
  };

  return (
    <main className="main bg-dark body">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button onClick={handleCLick} className="sign-in-button">
            Sign In
          </button>
          {!isLoggedIn ? <span className="connect-error">{error}</span> : ""}
        </form>
      </section>
    </main>
  );
}
