import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/style/main.css";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/userSlice";
import { useState } from "react";

function Connect() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCLick = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((reponse) => {
      if (reponse.payload) {
        navigate(`/connect/user`);
      } else {
        alert("incorrect");
      }
    });
  };

  const token = useSelector((state) => state.token);
  console.log(token);
  return (
    <div className="body">
      <Header />
      <main className="main bg-dark">
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
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button onClick={handleCLick} className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Connect;
