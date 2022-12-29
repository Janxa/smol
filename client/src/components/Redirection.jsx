import React from "react";
import redirect from "../services/redirectService";
import { useEffect } from "react";
export default function Redirection() {
  useEffect(()=>{
    redirect()
  })
  return (<div className="grid justify-center items-center h-screen w-screen ">
    <svg className="animate-spin h-30 w-30 mr-3 border-[15px] border-primary-brown border-t-secondary-yellow rounded-[50%]" viewBox="0 0 24 24">
   </svg>
   </div>
  );
}