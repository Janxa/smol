import "./App.css";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import Main from "./components/Main.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Popup from "./components/popups/Popup";
import CookiesBanner from "./components/Cookies";
import { useCookies } from "react-cookie";
function App() {


  const [cookies, setCookie] = useCookies([]);
  const [cookieVisible,setCookieVisible]= useState(cookies.url_list?false:true)
  const [sidebarVisible,setSidebarVisible]=useState(false)
  const [popup, setPopup] = useState({  content: null,visible: false});
  const [ url_list, setUrl_list]= useState(((cookies.url_list) || [] ));

  useEffect(()=>{
    if (Object.keys(cookies).length > 0) {
      setCookie("url_list", url_list, {
        path: "/",
      });
    }
  },[url_list,cookies]
    )
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
    // setPopup({content:content,visible:true})
    if (popup.content===content){
      return
    }
     if (popup.visible){
       setTimeout(()=>setPopup({content:content,visible:true}),400);}
     else {setPopup({content:content,visible:true})};
  }

  function ClosePopup(){
   setPopup({content:null,visible:false});
  }
  function ToggleSidebar(){
    if (sidebarVisible) {
      setSidebarVisible(false)
    }
    else{
      setSidebarVisible(true)
    }
  }
  return (
    <div className="flex flex-col h-screen bg-stone-600 ">
      <ToastContainer />
      <Header ToggleSidebar={ToggleSidebar} sidebarVisible={sidebarVisible}/>

      <Sidebar
        url_list={url_list}
        setUrl_list={setUrl_list}
        visible={sidebarVisible}
        cookieVisible={cookieVisible}
      />

      <Main
      url_list={url_list}
      setUrl_list={setUrl_list}

      />

      <Footer OpenPopup={OpenPopup} />

      {popup.visible &&
      <Popup
      Content={popup.content}
      visible={popup.visible}
      ClosePopup={ClosePopup}
      />
}

      { cookieVisible && (
          <CookiesBanner
            RefuseCookie={RefuseCookie}
            CreateCookie={CreateCookie}
            url_list={url_list}
          />
        )}
    </div>
  );
}

export default App;
