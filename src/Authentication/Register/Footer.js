import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-dark mt-5 py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <img src="/logoHeader.png" alt="Logo" width="140px" height="70px" />
        </div>
        <div className="d-flex flex-column align-items-center">
          <div>
            <Link className="mx-2" to="/">About Us</Link>
            <Link className="mx-2" to="/">Contact</Link>
            <Link className="mx-2" to="/">Privacy Policy</Link>
            <Link className="mx-2" to="/">Terms of Service</Link>
          </div>
          <div className="mt-3">
            <FaFacebook className="mx-2" size={24} />
            <FaTwitter className="mx-2" size={24} />
            <FaInstagram className="mx-2" size={24} />
            <FaLinkedin className="mx-2" size={24} />
          </div>
        </div>
        <div>
          <p className="mb-0">&copy; {new Date().getFullYear()} Ebrain Technology. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
