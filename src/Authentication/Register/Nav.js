import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgList, CgMenuBoxed } from "react-icons/cg";

export default function Nav() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  // const handleLocationChange = (event) => {
  //   setSelectedLocation(event.target.value);
  // };

  return (
    <div className="home-bg">
      <header className="navbar shadow- fixed-top">
        <div className="nav-links">
          <div className="mx-5">
          <img className="mx-" src="/companyLogo.png" alt="" margin-left='100px' width="100px" height="60px" />
          <Link className="mx-1 fst-italic fw-bold display-" to="/">ABC Technology</Link>
          </div>
          <div className="dropdown ms-auto">
           
          </div>
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
      
      <div className="home-page bg-dark mt- text-light w-50 p-5 mb-5 pb-5 text-center d-flex justify-content-center rounded-5">
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
                <Link to={'/signuppage'} className="text-decoration-none text-light d-block fw-bold mx-2">Happy Sign Up ☺!</Link>
                <Link to={'/loginpage'} className="text-decoration-none text-light mt-5 fw-bold mx-2">happy Login ☺!</Link>
            </div>
        
        </div>
    </div>


      </div>
    
    </div>
  )
}
