import React, { Component } from "react";
function UrlPairs(props) {
  return (
    <div>
      <p onClick={null}>{props.data.short}</p>
      <a href={props.data.long}>{props.data.long}</a>
    </div>
  );
}

export default UrlPairs;
