import { Link, NavLink } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <p className="m">SpeedRun.</p>
      <div className="d-flex" style={{ "margin-left": "30vw" }}>
        <Link
          to={'/registration'}          
          className="butn"
          style={{
            animation: "textgreen 2s 1",
            "font-size": "3vw",
            "text-shadow": "5px 2px rgba(0,00,0,0.5)",
            color: "#18C460",
            "text-decoration": "none",
          }}
        >
          Register
        </Link>
        <Link
          to={'/login'}
          className="butn"
          style={{
            animation: "textgreen 2s 1",
            "font-size": "3vw",
            "text-shadow": "5px 2px rgba(0,00,0,0.5)",
            color: "#18C460",
            "text-decoration": "none",
            "margin-left": "3vw",
          }}
        >
          Sign in
        </Link>
      </div>
      
    </div>
  );
}
