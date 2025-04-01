import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [navActive, setNavActive] = useState(false);

  return (
    <header>
      <h1>Mama's Meatballs</h1>
      <div 
        className={`hamburger ${navActive ? 'active' : ''}`} 
        onClick={() => setNavActive(!navActive)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className={navActive ? 'active' : ''}>
        <Link to="/">Home</Link>
        <Link to="/submit">Submit a Recipe</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/recipe">Recipe of the Day</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
}

export default Header;
