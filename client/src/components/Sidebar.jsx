import React, { Component } from "react";
import UrlPairs from "./UrlPairs";
function Sidebar(props) {
  return (
    <aside className="hidden">
      <h3>Your recent smol urls</h3>
      <ul>
        {props.url_list.map((url_pair, id) => (
          <li key={id}>
            <UrlPairs data={url_pair} />
            <button onClick={() => props.delete_url_from_list(id)}>
              Delete url
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
