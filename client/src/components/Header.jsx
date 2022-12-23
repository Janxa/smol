import React, { Component } from "react";
const Header = ({ToggleSidebar}) => {

  return (
    <header className="bg-stone-800 h-24 px-6 py-2 flex items-center justify-around shadow-sm shadow-stone-800 z-20 ">
      <div className="w-2/3">
        <h1 className="text-secondary-yellow font-bold text-5xl">SMOL</h1>
        <h2 className="text-secondary-yellow text-xl" >Your urls, SMOLER</h2>
      </div>
      <div className="w-1/3 h-3/5 flex flex-col justify-around items-end ">
      <button onClick={ToggleSidebar} className="w-1/2 rounded-md px-2 h-full flex flex-col justify-around items-center hover:brightness-75 transition-all ease-in-out duration-100 active:scale-95">
        <div className="bg-secondary-yellow rounded-md w-full h-[10%] inline-block"></div>
        <div className="bg-secondary-yellow rounded-md w-full h-[10%] inline-block"></div>
        <div className="bg-secondary-yellow rounded-md w-full h-[10%] inline-block"></div>
      </button>
      </div>
    </header>
  );
};

export default Header;
