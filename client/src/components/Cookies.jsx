import React from "react";

function CookiesBanner(props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-stone-200 p-2 flex flex-col items-center">
      <p className="text-stone-900  font-medium p-4">We use cookies to personalize and improve your experience on this site. Visit our privacy policy for more information on our data collection practices. </p>
      <div className="flex"   >
        <button  className="btn-validation mx-2"onClick={() => props.CreateCookie(props.url_list)}>Accept</button>
        <button className="btn-validation mx-2" onClick={()=>props.RefuseCookie()} >Refuse</button>
      </div>
    </div>
  );
}

export default CookiesBanner;
