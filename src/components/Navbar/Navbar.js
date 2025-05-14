import { Link } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={require('./Clgfest.jpeg')} alt="Logo" className="logo" />
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/Schedule" className="Linkbtn">Schedule</Link>
        <Link to="/profile" className="Linkbtn">Profile</Link>
        <Link to="/Login" className="Linkbtn">Login</Link>
        <Link to="/team" className="Linkbtn">Our Team</Link>
      </div>
    </div>
  );
}

export default Navbar;