import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div id="hero" className="hero">
        <h1>Overwhelmed with Issues?</h1>
        <h3>We provide a safe, easy way for your users and IT team to work on a resolution</h3>
        <Link to="/get-started"> {/* Replace the <button> element with <Link> */}
          <button>Get Started Now!</button>
        </Link>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </>
  );
}
