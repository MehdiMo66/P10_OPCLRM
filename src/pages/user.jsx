import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/style/main.css";
import Edit from "../components/edit";
import Box from "../components/box";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../slice/userSlice";

export default function User() {

  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  localStorage.getItem('apiResponse')
 
  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);


  return (
    <div className="body">
      <Header />
      <main className="main bg-dark">
        {isOpen ? null : (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {currentUser.firstName} {currentUser.lastName}
            </h1>
            <button
              className="edit-button"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              Edit Name
            </button>
          </div>
        )}
        {isOpen && (
          <Edit
            firstname={currentUser.firstName || ""}
            lastname={currentUser.lastName || ""}
            cancelEdit={() => setIsOpen(false)}
          />
        )}
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


