import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLogin, isAdmin }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/eats">Eats</Link>
        </li>
        
          <>
            <li>
              <Link to="/mydibs">My Dibs</Link>
            </li>
            <li>
              <Link to="/users">User</Link>
            </li>
          </>
          
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
      
        
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        
      </ul>
    </nav>
  );
}

export default NavBar;