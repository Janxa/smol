import React from "react";
import UrlForm from "./UrlForm";
import { useState } from "react";
import { withCookies } from "react-cookie";

const Main = (props) => {
  const [lastUrl,setLastUrl] =useState(null)
  const {url_list,setUrl_list,cookies} = props
  const add_url_to_list = (url) => {
    const new_url_list = [...url_list];
    new_url_list.push(url);
    setUrl_list(new_url_list)
  };

  return ( 
    <main className="flex flex-col-reverse items-center justify-between ">
      <UrlForm
        setLastUrl={setLastUrl}
        add_url_to_list={add_url_to_list}
        url_list={url_list}
        />
        {lastUrl && (
          <div className=" flex flex-col bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm md:w-9/12 lg:w-2/3">
            <div className="flex justify-between h-full ">
              <h3 className="text-lg lg:text-2xl p-2 text-primary-brown ">Here's your Shortened url !</h3>
              <span onClick={()=>setLastUrl(null)}className="after:content-['\00d7'] after:cursor-pointer after:text-xl after:lg:text-2xl after:text-black after:relative after:-top-4 after:-right-2"></span>
            </div>
            <div>
            <p className="  text-primary-green p-2 lg:text-lg font-medium">{lastUrl.short}</p>
            <p className=" line-through px-2 truncate text-sm text-stone-700 ">{lastUrl.long}</p>
            </div>
          </div>
        )}
    </main> );
}
 
export default withCookies(Main);
