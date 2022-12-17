import React, { Component } from "react";
import UrlForm from "./UrlForm";
import Sidebar from "./Sidebar";
import { withCookies } from "react-cookie";
import axios from "axios";

const Main = (props) => {
  const {url_list,setUrl_list,cookies} = props
  const add_url_to_list = (url) => {
    const new_url_list = [...url_list];
    new_url_list.push(url);
    setUrl_list(new_url_list)
    if (Object.keys(cookies.cookies).length > 0) {
      cookies.set("url_list", url_list, {
        path: "/",
      });
    }
    console.log("list", url_list);
  };
  const delete_url_from_list = async (id) => {
    const new_url_list = [...url_list];
    let deleted = url_list.splice(id, 1)[0];
    setUrl_list(new_url_list)
    if (Object.keys(cookies.cookies).length > 0) {
      cookies.set("url_list", url_list, {
        path: "/",
      });
    }
    console.log(deleted);

    const res = await axios.delete("shortner/delete", { data: deleted });
    console.log("list", url_list);
    console.log(res);
  };
  return ( 
    <main className=" bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm">
      <UrlForm
        add_url_to_list={add_url_to_list}
        url_list={url_list}
      />
      <Sidebar
        url_list={url_list}
        delete_url_from_list={delete_url_from_list}
      />
   
    </main> );
}
 
export default withCookies(Main);
