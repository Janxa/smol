import React, { Component } from "react";
const Button = ({ color, onClick, text, type, size }) => {
	const style =
		`
    rounded-lg
    w-max
    text-primary-white
    shadow
    shadow-primary-brown
    active:shadow-primary-brown-2 active:shadow-inner
    transition-all ease-in-out duration-200 ` +
		(color == "green"
			? ` bg-primary-green
            hover:bg-primary-green-2
      `
			: ` bg-primary-red hover:bg-primary-red-2 `) +
		(size == "small" ? " text-sm px-2 py-1" : ` text-md lg:text-lg  px-4 py-1`);

	return (
		<button onClick={onClick} type={type} className={style}>
			{text}
		</button>
	);
};

export default Button;
