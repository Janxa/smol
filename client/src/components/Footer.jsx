import React, { Component } from "react";
import Privacy from "./popups/Privacy";
import Contact from "./popups/Contact";
import Help from "./popups/Help";
import About from "./popups/About";
function Footer(props) {
  return (
    <footer >
      <ul>
        <li
          onClick={() => props.OpenPopup(About )}
        >
          About
        </li>
        <li onClick={() => props.OpenPopup(Help )}>
          Help
        </li>
        <h3>SMOL</h3>
        <li
          onClick={() => props.OpenPopup( Privacy )}
        >
          Privacy
        </li>
        <li
          onClick={() => props.OpenPopup(Contact )}
        >
          Contact
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
