import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgList, CgMenuBoxed } from "react-icons/cg";
// import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import "./Header.css";

// const locations = ["Chennai", "Trichy", "Thanjavur"];

export default function Nav({ selectedLocation, setSelectedLocation }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="home-bg">
      <header className="navbar bg-light shadow-sm fixed-top">
        <div className="nav-links">
          <img className="mx-5" src="/logoHeader.png" alt="" width="140px" height="70px" />
          {/* <Link className="mx-5" to="/">Ebrain Technology</Link> */}
          <div className="dropdown ms-auto">
            {/* <select
              className="location-dropdown"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select> */}
          </div>
          {/* <Link to="/foodregistration" className="register">
            Register
          </Link> */}
          <button className="toggle-button" onClick={toggleSideNav}>
            <CgMenuBoxed className="fs-3" />
          </button>
        </div>
      </header>
      <nav className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
        <ul className="mt-5">
          <li>
            <Link to="/signuppage" onClick={toggleSideNav}>
              <CgList className="icons-2 fs-4 ms-1 me-2 mb-1" />
              Sign Up
            </Link>
            <Link to="/loginpage" onClick={toggleSideNav}>
                <CgList className="icons-2 fs-4 ms-1 me-1 mb-1" />
                Login
            </Link>
            <Link to="/admintable" onClick={toggleSideNav}>
                <CgList className="icons-2 fs-4 ms-1 me-1 mb-1" />
                Admin Table
            </Link>
            <Link to="/usertable" onClick={toggleSideNav}>
                <CgList className="icons-2 fs-4 ms-1 me-1 mb-1" />
                User Table
            </Link>
          </li>
        </ul>
      </nav>
      
      <div>
      
      <div className="home-page bg-dark text-light w-50 p-5 mb-5 pb-5 text-center d-flex justify-content-center rounded-5">
    <div className="center mx-auto text-center">
        <h2 className="mt-5 fw-bold text-success">
            Welcome to Our Community
        </h2>
        <p className="mt-3">
            😊 Join us today and start your journey with seamless experiences!
        </p>
        <p className="mt-3">
            💻 Sign up now to access exclusive content, personalized recommendations, and more!
        </p>
        <p className="mt-3">
            🧠 Already have an account? Log in to continue where you left off!
        </p>
        <div className="mt-4">
            <p className="fw-bold mx-2">Happy Sign Up ☺!</p>
            <p className="fw-bold mx-2">happy Login ☺!</p>
        </div>
    </div>
</div>

    <footer className="footer text-dark mt-5 py-3 ">
      <div className="margin container d-flex justify-content-between mt- align-items-center">
        <div>
          <img src="/logoHeader.png" alt="Logo" width="140px" height="70px" />
        </div>
        <div className="d-flex flex-column align-items-center">
          {/* <div>
            <Link className="mx-2" to="/">About Us</Link>
            <Link className="mx-2" to="/">Contact</Link>
            <Link className="mx-2" to="/">Privacy Policy</Link>
            <Link className="mx-2" to="/">Terms of Service</Link>
          </div> */}
          <div className="mt-">
            <FaFacebook className="mx-2 text-primary" size={24} />
            <FaTwitter className="mx-2 text-primary" size={24} />
            <FaInstagram className="mx-2 text-primary" size={24} />
            <FaLinkedin className="mx-2 text-primary" size={24} />
          </div>
        </div>
        <div>
          <p className="mb-0">&copy; {new Date().getFullYear()} Ebrain Technology. All Rights Reserved.</p>
        </div>
      </div>
    </footer>


      </div>
    
    </div>
  )
}
