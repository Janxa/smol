import React, { Component } from "react";
import UrlForm from "./UrlForm";
import { useState } from "react";
import UrlPairs from "./UrlPairs";
import { withCookies } from "react-cookie";
import axios from "axios";

const Main = (props) => {
  const [lastUrl,setLastUrl] =useState(null)
  const {url_list,setUrl_list,cookies} = props
  const add_url_to_list = (url) => {
    const new_url_list = [...url_list];
    new_url_list.push(url);
    setUrl_list(new_url_list)
  };

  return ( 
    <main className="flex flex-col items-center justify-between">
        {lastUrl && (
          <div className=" flex flex-col bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm">
            <div className="flex justify-between h-full ">
              <h3 className="text-lg text-primary-brown ">Here's your Shortened url !</h3>
              <span onClick={()=>setLastUrl(null)}className="after:content-['\00d7'] after:cursor-pointer after:text-xl after:text-black after:relative after:-top-4 after:-right-2"></span>
            </div>
            <div>
            <p className="  text-primary-green font-medium">{lastUrl.short}</p>
            <p className=" line-through truncate text-xs text-stone-700 ">{lastUrl.long}</p>
            </div>
          </div>
        )}
      <UrlForm
        setLastUrl={setLastUrl}
        add_url_to_list={add_url_to_list}
        url_list={url_list}
      />
    </main> );
}
 
export default withCookies(Main);
