import React from "react";

function CookiesBanner(props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-stone-200 p-2 flex flex-col items-center">
      <p className="text-stone-900  font-medium p-4">We use cookies to personalize and improve your experience on this site. Visit our privacy policy for more information on our data collection practices. </p>
      <button  className="font-medium rounded-lg bg-greenpear
      text-black
       w-1/3 px-4 py-2  shadow-md shadow-greenpear-6
        hover:shadow-greenpear-8 hover:shadow 
         transition-all ease-in-out 
          hover:bg-greenpear-5 duration-200"onClick={() => props.CreateCookie(props.url_list)}>Accept</button>
    </div>
  );
}

export default CookiesBanner;
