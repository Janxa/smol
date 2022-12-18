import React, { Component,useRef} from "react";
import { axios } from "axios";
import UrlPairs from "./UrlPairs";
function Sidebar(props) {
  const {url_list,setUrl_list,cookies,visible} = props
  console.log(url_list)
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
    <aside  className={visible ? "fixed top-24 right-0 h-screen w-full bg-stone-200 opacity-100 transition-transform ":"opacity-0 fixed top-24 right-0 translate-x-full h-screen w-full bg-stone-200  transition-all"}>
      <h3>Your recent smol urls</h3>
      <ul>
        {url_list.length <0 ?

        (url_list.map((url_pair, id) => (
          <li key={id}>
            <UrlPairs data={url_pair} />
            <button onClick={() => delete_url_from_list(id)}>
              Delete url
            </button>
          </li>
        )))
        :<p>No urls saved</p>}
      </ul>
    </aside>
  );
}

export default Sidebar;
