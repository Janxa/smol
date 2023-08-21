import React, { Component } from "react";

const LoadingWheel = () => {
	return (
		<div
			className=" inline-block w-20 h-20 relative
            top-10
        [&>div]:after:block
        [&>div]:after:absolute
        [&>div]:after:top-1
        [&>div]:after:left-3
        [&>div]:after:w-3
        [&>div]:after:h-1
        [&>div]:after:rounded-full
        [&>div]:after:bg-primary-brown
"
		>
			<div className=" animate-spin-loader "></div>
			<div className="rotate-[30deg]  animate-spin-loader animation-delay-[100ms]"></div>
			<div className="rotate-[60deg] animate-spin-loader animation-delay-[200ms]"></div>
			<div className="rotate-[90deg] animate-spin-loader animation-delay-[300ms]"></div>
			<div className="rotate-[120deg] animate-spin-loader animation-delay-[400ms]"></div>
			<div className="rotate-[150deg] animate-spin-loader animation-delay-[500ms]"></div>
			<div className="rotate-[180deg] animate-spin-loader animation-delay-[600ms]"></div>
			<div className="rotate-[210deg] animate-spin-loader animation-delay-[700ms]"></div>
			<div className="rotate-[240deg] animate-spin-loader animation-delay-[800ms]"></div>
			<div className="rotate-[270deg] animate-spin-loader animation-delay-[900ms]"></div>
			<div className="rotate-[300deg] animate-spin-loader animation-delay-[1000ms]"></div>
			<div className="rotate-[330deg] animate-spin-loader animation-delay-[1100ms]"></div>
		</div>
	);
};

export default LoadingWheel;
