import Header from "../components/header";
import "../assets/style/main.css";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="body">
      <Header hideSignIn={true} />
      <main className="main bg-dark main-error">
        <h1 className="error-title">404</h1>
        <p>Page not found !</p>
        <Link to="/" className="redirect-home">
          Go to the home page
        </Link>
      </main>

      <Footer />
    </div>
  );
}
