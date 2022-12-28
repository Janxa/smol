import React, { Component } from "react";
import Privacy from "./popups/Privacy";
import Contact from "./popups/Contact";
import Help from "./popups/Help";
import About from "./popups/About";
function Footer(props) {
  const {OpenPopup} = props;
  return (
    <footer className="bg-primary-brown fixed bottom-0  w-full" >
      <ul className="flex justify-around items-center [&>*]:text-primary-white [&>*:hover]:scale-105 [&>*:hover]:text-secondary-yellow [&>*]:cursor-pointer ">
        <li
          onClick={() => OpenPopup(About)}
        >
          About
        </li>
        <li onClick={() => OpenPopup(Help)}>
          Help
        </li><li>
        <h3 className="text-xl font-medium text-secondary-yellow cursor-default ">SMOL</h3>
        </li>
        <li
          onClick={() => OpenPopup( Privacy )}
        >
          Privacy
        </li>
        <li
          onClick={() => OpenPopup(Contact )}
        >
          Contact
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
