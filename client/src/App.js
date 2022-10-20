import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "./components/Main.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "./components/popups/Popup";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies(["url_list"]);
  const [popup, setPopup] = useState({ visible: false, value: "" });

  function CreateCookie(url_list) {
    setCookie("url_list", url_list, {
      path: "/",
    });
  }
  function OpenPopup(popup) {
    setPopup(popup);
    console.log("clicked", { popup });
  }
  return (
    <div className="App">
      <Header />
      <Main CreateCookie={CreateCookie} />
      <Footer OpenPopup={OpenPopup} />
      <Popup popup={popup} />
    </div>
  );
}

export default App;
