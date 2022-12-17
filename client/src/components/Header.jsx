import React, { Component } from "react";
const Header = () => {
  return (
    <header className="bg-stone-800 h-24 px-6    py-2 flex items-center justify-around ">
      <div className="w-2/3">
        <h1 className="text-white font-bold text-5xl">SMOL</h1>
        <h2 className="text-white text-xl" >Your urls, SMOLER</h2>
      </div>
      <button  className="w-1/3 h-3/5 flex flex-col justify-around items-end hover:cursor-pointer">
        <div className="bg-white rounded-md w-2/5 h-[10%] inline-block"></div>
        <div className="bg-white rounded-md w-2/5 h-[10%] inline-block"></div>
        <div className="bg-white rounded-md w-2/5 h-[10%] inline-block"></div>
      </button>
    </header>
  );
};

export default Header;
