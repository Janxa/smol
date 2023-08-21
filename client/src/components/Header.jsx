import React from "react";
const Header = ({ ToggleSidebar, sidebarVisible }) => {
	return (
		<header className="bg-stone-800 w-full h-24 2xl:h-28 px-6 lg:px-12 py-2 flex items-center justify-around shadow-sm shadow-stone-800 z-20 ">
			<div className="w-2/3">
				<h1 className="text-secondary-yellow font-bold text-4xl 2xl:text-6xl">
					SMOL
				</h1>
				<h2 className="text-secondary-yellow text-xl 2xltext-2xl">
					Your urls, SMOLER
				</h2>
			</div>

			<div className="w-1/3 h-full flex flex-col justify-around items-end ">
				<button
					onClick={ToggleSidebar}
					className={
						sidebarVisible
							? "w-1/2 sm:w-1/3 md:w-3/12 lg:w-3/12 xl:w-1/6 h-3/5 md:h-[65%] lg:h-3/5 rounded-md px-2  flex flex-col justify-around items-center [&>:first-child]: [&>:first-child]:translate-y-[345%] [&>:first-child]:rotate-45 [&>*]:hover:bg-primary-white [&>*]:bg-secondary-yellow [&>*]:transition-all [&>*]:duration-200 [&>:last-child]:rotate-[135deg] [&>:last-child]:-translate-y-[330%]  [&>:nth-child(2)]:translate-x-[120%] overflow-hidden"
							: "w-1/2 sm:w-1/3 md:w-3/12 lg:w-3/12 xl:w-1/6 h-3/5 md:h-[65%] lg:h-3/5 rounded-md px-2  flex flex-col justify-around items-center transition-all ease-in-out duration-100 active:scale-95  [&>*]:hover:bg-secondary-yellow [&>*]:transition-all [&>*]:duration-200 overflow-hidden "
					}
				>
					<div className="bg-primary-white rounded-md w-full h-[10%] inline-block"></div>
					<div className="bg-primary-white rounded-md w-full h-[10%] inline-block"></div>
					<div className="bg-primary-white rounded-md w-full h-[10%] inline-block"></div>
				</button>
			</div>
		</header>
	);
};

export default Header;
