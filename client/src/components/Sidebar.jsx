import React from "react";
import axios from "axios";
import UrlPairs from "./UrlPairs";
import Button from "./Common/Button";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useRef } from "react";

function Sidebar({
	urlList,
	setUrlList,
	isVisible,
	setIsVisible,
	cookies,
	createCookie,
}) {
	const arrowContainerRef = useRef(null);
	const handleDeleteUrl = async (index) => {
		const newUrlList = [...urlList];
		const deletedUrl = newUrlList.splice(index, 1)[0];

		try {
			await toast.promise(
				axios.delete("/api/shortner/delete", { data: deletedUrl }),
				{
					pending: "Loading",
					success: "🗑️ Url deleted !",
					error: "🤯 Could not delete url ",
				}
			);
			setUrlList(newUrlList);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<aside
			className={`fixed z-10 right-0 h-screen w-full lg:w-1/3 bg-stone-100 shadow-md flex flex-col transition-transform ease-in duration-300 ${
				isVisible
					? "opacity-100 translate-x-0"
					: "opacity-0 lg:opacity-100 translate-x-full"
			}`}
		>
			<div
				ref={arrowContainerRef}
				onClick={() => setIsVisible(!isVisible)}
				className={`hidden lg:block animation-delay-[600ms] animate-bounce-arrow bg-stone-100 hover:saturation-105 shadow-md w-28 h-28 z-0 cursor-pointer relative top-1/2 left-0 -translate-x-1/2 rounded-l-full transition-all duration-300 ${
					isVisible ? "rotate-45" : "-rotate-[135deg]"
				}`}
			>
				<span
					className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/4 inline-block border-t-[5px] border-r-[5px] transition-all rounded-b-md rounded-l-md duration-300`}
				></span>
			</div>
			<div className="px-6 py-4 w-full h-full z-10 relative top-24 lg:static bg-stone-100 overflow-scroll">
				<h3 className="text-2xl lg:text-4xl   pt-4 font-medium text-primary-brown">
					Your recent smol urls:
				</h3>

				{Object.keys(cookies).length === 0 && (
					<p className="text-xs text-primary-red">
						Cookies are not accepted, your saved urls wont be there when you
						come back unless you{" "}
						<button
							onClick={() => createCookie(urlList)}
							className="text-xs text-primary-red font-medium underline "
						>
							Accept cookies
						</button>
					</p>
				)}

				<ul className="flex flex-col h-full">
					{urlList.length > 0 ? (
						urlList.map((urlPair, index) => (
							<li
								key={index}
								className=" py-2 border-b-2 border-primary-brown-2"
							>
								<UrlPairs data={urlPair} />
								<div className="pb-2 pt-3 xl:pt-4 flex justify-around w-full sm:w-2/3 md:w-1/2 lg:w-full 2xl:w-2/3">
									<Button
										color="green"
										onClick={() => {
											navigator.clipboard.writeText(urlPair.short);
											toast.success(" Copied to clipboard !");
										}}
										text="Copy to clipboard"
									/>

									<Button
										color="red"
										onClick={() => handleDeleteUrl(index)}
										text="Delete url"
									/>
								</div>
							</li>
						))
					) : (
						<li className="text-lg pt-8 place-self-center">
							No urls saved yet
						</li>
					)}
				</ul>
			</div>
		</aside>
	);
}

export default withCookies(Sidebar);
