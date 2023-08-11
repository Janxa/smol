import React from "react";
import Privacy from "./popups/Privacy";
import Contact from "./popups/Contact";
import About from "./popups/About";
function Footer(props) {
  const {OpenPopup} = props;
  return (
    <footer className="bg-primary-brown absolute bottom-0 z-20  w-full" >
      <ul className="flex justify-around items-center   [&>*]:text-primary-white [&>*:hover]:scale-105 [&>*:hover]:text-secondary-yellow [&>*]:cursor-pointer ">
        <li
          onClick={() => OpenPopup(About)}
        >
          About
        </li>
        <li
          onClick={() => OpenPopup(Contact )}
        >
          Contact
        </li>
      <li>
        <h3 className="text-xl font-medium text-secondary-yellow cursor-default ">SMOL</h3>
        </li>
        <li className="text-end"
          onClick={() => OpenPopup( Privacy )}
        >
          Privacy
        </li>
        <li ></li>
      </ul>
    </footer>
  );
}

export default Footer;
