import React from "react";

function CookiesBanner(props) {
  return (
    <div className="z-20 shadow-2xl fixed bottom-0 left-0 right-0 w-full bg-stone-200 p-4 flex flex-col items-center ">
      <div className="h-full  flex flex-col justify-around items-center">
      <p className="text-stone-900 font p-4 text-lg ">We use cookies to personalize and improve your experience on this site. Visit our privacy policy for more information on our data collection practices. </p>
      <div className="flex w-2/4 justify-around"   >
        <button  className="btn-validation mx-2"onClick={() => props.CreateCookie(props.url_list)}>Accept</button>
        <button className="btn-danger   mx-2" onClick={()=>props.RefuseCookie()} >Refuse</button>
      </div>
      </div>
    </div>
  );
}

export default CookiesBanner;
