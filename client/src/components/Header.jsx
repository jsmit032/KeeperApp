import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';

function Header() {
  return (
    <header>
      <h1><HighlightIcon />Keeper</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
