import React, { Component,useRef} from "react";
import { axios } from "axios";
import UrlPairs from "./UrlPairs";
function Sidebar(props) {
  const {url_list,setUrl_list,cookies,visible,cookieVisible} = props
  console.log("sidebar",url_list)
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
    <aside  className={visible 
      ? "fixed top-24 right-0 h-screen w-full bg-stone-200 opacity-100 transition-transform flex flex-col p-4"
      : "opacity-0 fixed top-24 right-0 translate-x-full h-screen w-full bg-stone-200 flex flex-col transition-all p-4"
      }>

      <h3 className="text-2xl font-medium">Your recent smol urls</h3>
      <ul className="flex flex-col h-full">
        {/* If there's a url in the list, render list, else render no urls */}
        {url_list.length >0 
          ?(url_list.map((url_pair, id) => (
            <li key={id} className="">
              <UrlPairs data={url_pair} />
              <button onClick={null}>
                Copy Smol url
              </button>
              <button onClick={() => delete_url_from_list(id)}>
                Delete url
              </button>
            </li>
             )))
         :<li className=" text-l pt-8 place-self-center">No urls saved yet</li>}

      </ul>
    </aside>
  );
}

export default Sidebar;
