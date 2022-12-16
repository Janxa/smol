import "./App.css";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from "react";
import Main from "./components/Main.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "./components/popups/Popup";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies(["url_list"]);
  const [popup, setPopup] = useState({  content: "",visible: false});

  function CreateCookie(url_list) {
    setCookie("url_list", url_list, {
      path: "/",
    });
  }
  function OpenPopup(content) {
    console.log(content)
    setPopup({content:content,visible:true});
    console.log("pp",popup)


  }
  function ClosePopup(){
   setPopup({content:"",visible:false});

  }
  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <Header className="fixed" />
      <Main CreateCookie={CreateCookie} />
      <Footer OpenPopup={OpenPopup} />
      <Popup content={popup.content} visible={popup.visible} ClosePopup={ClosePopup} />
    </div>
  );
}

export default App;
