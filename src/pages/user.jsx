import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/style/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Box from "../components/box";
import { useEffect } from "react";
import { UseSelector , useDispatch, useSelector} from "react-redux";
import { getProfile } from "../slice/userSlice";





function User() {
  
  
    const token = useSelector((state) => state.token);
   const dispatch = useDispatch();
  
    useEffect ( () => {
      dispatch (getProfile(token));
    },[dispatch,token])

  return (
    <div className="body">
      <Header>
        <Link className="main-nav-item" to="/">
          <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
          Sign Out
        </Link>
      </Header>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Box
          title="Argent Bank Checking (x8349) "
          ammount="$2,082.79"
          description="Available Balance"
        />
        <Box
          title="Argent Bank Savings (x6712) "
          ammount="$10,928.42"
          description="Available Balance"
        />
        <Box
          title="Argent Bank Credit Card (x8349) "
          ammount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
}

export default User;
