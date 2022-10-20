import React, { Component } from "react";
import Privacy from "./popups/Privacy";
import Contact from "./popups/Contact";
import Help from "./popups/Help";
import About from "./popups/About";
function Footer(props) {
  return (
    <footer>
      <ul>
        <li
          onClick={() => props.OpenPopup({ visible: true, value: <About /> })}
        >
          About
        </li>
        <li onClick={() => props.OpenPopup({ visible: true, value: <Help /> })}>
          Help
        </li>
        <h3>SMOL</h3>
        <li
          onClick={() => props.OpenPopup({ visible: true, value: <Privacy /> })}
        >
          Privacy
        </li>
        <li
          onClick={() => props.OpenPopup({ visible: true, value: <Contact /> })}
        >
          Contact
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
