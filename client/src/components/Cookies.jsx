import React from "react";

function CookiesBanner(props) {
  return (
    <div>
      <p>Accept cookie for better experience</p>
      <button onClick={props.CreateCookie}>Accept</button>
    </div>
  );
}

export default CookiesBanner;
