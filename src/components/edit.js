import { postUserName } from "../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Edit({ username, firstname, lastname, cancelEdit }) {
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  const [user, setUser] = useState(currentUser.userName || "");
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
    if (user === currentUser.userName) {
      // Vérifie si le pseudo saisi est identique au pseudo actuel
      setError(
        "Le pseudo est identique à celui actuel. Veuillez saisir un nouveau pseudo."
      );
      return;
    }
    if (
      (!submitted &&
        user.length >= 4 &&
        user.length <= 10 &&
        /^[a-zA-Z]+$/.test(user)) ||
      (/\d/.test(user) && user.replace(/[^0-9]/g, "").length <= 3)
    ) {
      dispatch(postUserName({ token, userName: user }));
      setUser("");
      setSubmitted(true);
      cancelEdit();
    } else {
      if (user.length < 4) {
        setError("Le nom d'utilisateur doit contenir au moins 4 caractères.");
      } else if (user.length >= 10) {
        setError("Le nom d'utilisateur doit contenir au plus 10 caractères.");
      } else if (!/[a-zA-Z]{4,}/.test(user)) {
        setError("Le nom d'utilisateur doit contenir au moins 4 lettres.");
      } else if (!/^[a-zA-Z0-9]*$/.test(user)) {
        setError(
          "Le nom d'utilisateur doit contenir uniquement des caractères alphanumériques"
        );
      } else if (user.replace(/[^0-9]/g, "").length > 3) {
        setError("Le nom d'utilisateur ne peut contenir plus de 3 chiffres.");
      }
    }
  };

  return (
    <div>
      <form className="envoi" onSubmit={handleFormSubmit}>
        <fieldset>Edit user info</fieldset>
        <div>
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            onChange={handleUsernameChange}
            defaultValue={username}
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
          <input
            type="text"
            id="lastname"
            readOnly="readonly"
            value={lastname}
          />
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
    </div>
  );
}
