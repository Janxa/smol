import React, { Component } from "react";
function UrlPairs(props) {
  return (
    <div className="w-4/5 flex flex-col">
      <p onClick={null}>{props.data.short}</p>
      <a className="truncate w-full" href={props.data.long} target="_blank" rel="noopener" > {props.data.long}</a>
    </div>
  );
}

export default UrlPairs;
