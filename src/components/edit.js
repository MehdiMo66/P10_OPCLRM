import { postUserName } from "../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Edit({ username, firstname, lastname, cancelEdit }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [user, setUser] = useState(username || "");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUser(username || "");
  }, [username]);

  const handleUsernameChange = (e) => {
    setUser(e.target.value);
    setError("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!submitted && user.length >= 4 && user.length <= 10) {
      dispatch(postUserName({ token, userName: user }));
      console.log(user);
      setUser("");
      setSubmitted(true);
    } else {
      if (user.length <= 4) {
        setError("Le nom d'utilisateur doit contenir au moins 4 caractères.");
      } else if (user.length >= 10) {
        setError("Le nom d'utilisateur doit contenir au plus 8 caractères.");
      }
    }
  };

  return (
    <form className="envoi" onSubmit={handleFormSubmit}>
      <fieldset>Edit user info</fieldset>
      <div>
        <label htmlFor="username">User name:</label>
        <input
          type="text"
          id="username"
          value={user}
          onChange={handleUsernameChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="firstname">First name:</label>
        <input
          type="text"
          id="firstname"
          readOnly="readonly"
          value={firstname}
        />
      </div>
      <div>
        <label htmlFor="lastname">Last name:</label>
        <input type="text" id="lastname" readOnly="readonly" value={lastname} />
      </div>
      <div>
        <button className="edit-button" type="submit">
          Save
        </button>

        <button className="edit-button" type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    </form>
  );
}
