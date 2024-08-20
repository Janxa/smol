import React from "react";

const Button = ({ color, onClick, text, type, size: textSize = "md" }) => {
	const sizeMapping = {
		sm: "text-sm px-2 py-1",
		md: "text-md lg:text-lg px-4 py-1",
	};

	const colorMapping = {
		green: "bg-primary-green hover:bg-primary-green-2",
		red: "bg-primary-red hover:bg-primary-red-2",
	};

	const style = `
    rounded-lg
    w-max
    text-primary-white
    shadow
    shadow-primary-brown
    active:shadow-primary-brown-2 active:shadow-inner
    transition-all ease-in-out duration-200
    ${colorMapping[color]}
    ${sizeMapping[textSize]}
  `;

	return (
		<button onClick={onClick} type={type} className={style}>
			{text}
		</button>
	);
};

export default Button;

