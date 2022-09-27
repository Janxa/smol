import React, { Component } from "react";
function UrlPairs(props) {
  return (
    <div>
      <p>
        Long | <a href={props.data.long}>{props.data.long}</a>
      </p>
      <p>
        Short | <a href={props.data.long}>{props.data.short}</a>
      </p>
    </div>
  );
}

export default UrlPairs;
