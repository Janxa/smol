import React, { Component } from "react";
import UrlForm from "./UrlForm";
import { withCookies } from "react-cookie";
import axios from "axios";

const Main = (props) => {
  const {url_list,setUrl_list,cookies} = props
  const add_url_to_list = (url) => {
    const new_url_list = [...url_list];
    new_url_list.push(url);
    setUrl_list(new_url_list)
    if (Object.keys(cookies.cookies).length > 0) {
      console.log("cookie called")
      cookies.set("url_list", url_list, {
        path: "/",
      });
    }
    console.log("list", url_list);
  };

  return ( 
    <main className=" bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm">
      <UrlForm
        add_url_to_list={add_url_to_list}
        url_list={url_list}
      />
    </main> );
}
 
export default withCookies(Main);
