import React, { Component,useEffect,useRef} from "react";
import axios  from "axios";
import UrlPairs from "./UrlPairs";
import { withCookies } from "react-cookie";
function Sidebar(props) {
  const {url_list,setUrl_list,cookies,visible} = props
  console.log("sidebar",url_list)
  
  const delete_url_from_list = async (id) => {
    const new_url_list = [...url_list];
    let deleted = new_url_list.splice(id, 1)[0];
    console.log('deleted',deleted);
    // trycatch here to check server before updating cookie
    const res = await axios.delete("shortner/delete", { data: deleted });
    setUrl_list(new_url_list)
    console.log("list", url_list);
    console.log(res);
  };


  return (
    <aside  className={visible 
      ? "opacity-100 fixed top-24 right-0 h-screen w-full translate-x-0 bg-stone-200 flex flex-col transition-[transform,opacity]  ease-in duration-300  p-4"
      : "opacity-0 fixed top-24 right-0  h-screen w-full  translate-x-full bg-stone-200 flex flex-col transition-[transform,opacity] ease-in duration-300 p-4"
      }>

      <h3 className="text-2xl font-medium">Your recent smol urls</h3>
      <ul className="flex flex-col h-full">
        {/* If there's a url in the list, render list, else render no urls */}
        {url_list.length >0 
          ?(url_list.map((url_pair, id) => (
            <li key={id} className="">
              <UrlPairs data={url_pair} />
              <div className="py-2 flex justify-around w-2/3">
              <button className="btn-validation" onClick={null}>
                Copy Smol url
              </button>
              <button className="btn-danger" onClick={() => delete_url_from_list(id)}>
                Delete url
              </button>
              </div>
            </li>
             )))
         :<li className=" text-l pt-8 place-self-center">No urls saved yet</li>}

      </ul>
    </aside>
  );
}

export default withCookies(Sidebar);
