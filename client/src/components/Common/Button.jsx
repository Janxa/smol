import React, { Component } from "react";
const Button = ({ color, onClick, text }) => {
	const style =
		color == "green"
			? `text-md
    lg:text-xl
    rounded-lg
    px-4 py-2
    bg-primary-green
    text-primary-white
    hover:bg-primary-green-2
    shadow
    shadow-primary-brown
    active:shadow-primary-brown-2 active:shadow-inner
    transition-all ease-in-out duration-200
      `
			: `text-md
      lg:text-xl
      rounded-lg
      px-4 py-2
      bg-primary-red
      text-primary-white
      hover:bg-primary-red-2
      shadow
      shadow-primary-brown
      active:shadow-primary-brown-2 active:shadow-inner
      transition-all ease-in-out duration-200
    `;
	return (
		<button onClick={onClick} className={style}>
			{text}
		</button>
	);
};

export default Button;
