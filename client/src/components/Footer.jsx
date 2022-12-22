import React, { Component } from "react";
import Privacy from "./popups/Privacy";
import Contact from "./popups/Contact";
import Help from "./popups/Help";
import About from "./popups/About";
function Footer(props) {
  return (
    <footer className="bg-primary-brown fixed bottom-0  w-full" >
      <ul className="flex justify-around items-center">
        <li
          onClick={() => props.OpenPopup(About )}
        >
          About
        </li>
        <li onClick={() => props.OpenPopup(Help )}>
          Help
        </li><li>
        <h3 className="text-xl font-medium text-secondary-yellow ">SMOL</h3>
        </li>
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
