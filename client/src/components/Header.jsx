import React, { Component } from "react";
const Header = ({ToggleSidebar,sidebarVisible}) => {
  return (
    <header className="bg-stone-800 h-24 px-6 py-2 flex items-center justify-around shadow-sm shadow-stone-800 z-20 ">
      <div className="w-2/3">
        <h1 className="text-secondary-yellow font-bold text-5xl">SMOL</h1>
        <h2 className="text-secondary-yellow text-xl" >Your urls, SMOLER</h2>
      </div>

      <div className="w-1/3 h-full flex flex-col justify-around items-end ">
      <button onClick={(ToggleSidebar)} className={sidebarVisible 
      ?"w-full sm:w-1/2 md:w-1/3 lg:1/4 h-3/4 rounded-md px-2  flex flex-col justify-around items-center [&>:first-child]:opacity-1 [&>:first-child]:translate-y-[460%] [&>:first-child]:rotate-45 [&>*]:hover:bg-primary-white [&>*]:bg-secondary-yellow [&>*]:transition-all [&>*]:duration-200 [&>:last-child]:rotate-45 [&>:last-child]:-translate-y-[200%] [&>:nth-child(2)]:-rotate-45 [&>:nth-child(2)]:translate-y-full"
      :"w-full sm:w-1/2 md:w-1/3 lg:1/4 h-3/4 rounded-md px-2  flex flex-col justify-around items-center transition-all ease-in-out duration-100 active:scale-95  [&>*]:hover:bg-secondary-yellow [&>*]:transition-all [&>*]:duration-200 "}>
        <div className="bg-primary-white rounded-md w-full h-[10%] inline-block"></div>
        <div className="bg-primary-white rounded-md w-full h-[10%] inline-block"></div>
        <div className="bg-primary-white rounded-md w-full h-[10%] inline-block"></div>
      </button>
      </div>
    </header>
  );
};

export default Header;
