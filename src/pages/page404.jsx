
import "../assets/style/main.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
      <main className="main bg-dark main-error body">
        <h1 className="error-title">404</h1>
        <p>Page not found !</p>
        <Link to="/" className="redirect-home">
          Go to the home page
        </Link>
      </main>
    
  );
}
