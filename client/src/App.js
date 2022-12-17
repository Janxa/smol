import "./App.css";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import Main from "./components/Main.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "./components/popups/Popup";
import CookiesBanner from "./components/Cookies";
import { useCookies,Cookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies(["url_list",]);
  const [cookieVisible,setCookieVisible]= useState(cookies.url_list?false:true)
  const [popup, setPopup] = useState({  content: "",visible: false});
  const [ url_list, setUrl_list]= useState(((cookies.url_list) || [] ));
  console.log(cookies.url_list)
  function CreateCookie(url_list) {
    setCookie("url_list", url_list, {
      path: "/",
    });
    setCookieVisible(false);
  }
  function RefuseCookie(){
    setCookieVisible(false);
  }
  function OpenPopup(content) {
    setPopup({content:content,visible:true});
  }
  function ClosePopup(){
   setPopup({content:"",visible:false});
  }
  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <Header className="fixed" />
      <Main RefuseCookie={RefuseCookie} CreateCookie={CreateCookie} />
      <Footer OpenPopup={OpenPopup} />
      { cookieVisible && (
          <CookiesBanner
            RefuseCookie={RefuseCookie}
            CreateCookie={CreateCookie}
            url_list={url_list}
          />
        )}
      <Popup content={popup.content} visible={popup.visible} ClosePopup={ClosePopup} />
    </div>
  );
}

export default App;
