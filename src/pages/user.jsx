import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getUser, logout } from "../slice/userSlice";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/style/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import Box from "../components/box";

function User() {
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  console.log(currentUser)

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  
  return (
    <div className="body">
      <Header/>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {currentUser.name}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Box
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Box
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Box
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
}

export default User;