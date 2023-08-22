import React from "react";
import axios from "axios";
import UrlPairs from "./UrlPairs";
import Button from "./Common/Button";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

function Sidebar(props) {
	const { url_list, setUrl_list, visible, setVisible, cookies, CreateCookie } =
		props;
	const arrowContainer = useRef(null);
	const delete_url_from_list = async (id) => {
		const new_url_list = [...url_list];
		let deleted = new_url_list.splice(id, 1)[0];

		try {
			const res = await toast.promise(
				axios.delete("/api/shortner/delete", { data: deleted }),
				{
					pending: "Loading",
					success: "🗑️ Url deleted !",
					error: "🤯 Could not delete url ",
				}
			);
			setUrl_list(new_url_list);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<aside
			className={
				(!visible
					? "opacity-0 lg:opacity-100 translate-x-full "
					: "opacity-100  translate-x-0  ") +
				" fixed z-10 right-0 h-screen w-full lg:w-1/3 bg-stone-100 shadow-md flex flex-col transition-[transform,opacity] ease-in duration-300  "
			}
		>
			<div
				ref={arrowContainer}
				onClick={() => setVisible(!visible)}
				className={
					(!visible
						? "bg-secondary-yellow hover:-translate-x-3/4 "
						: " bg-stone-100  hover:bg-secondary-yellow ") +
					"hidden animation-delay-[600ms] animate-bounce-arrow lg:block fbg-stone-100 hover:saturation-105  shadow-md  w-28 h-28  z-0 cursor-pointer  relative top-1/2 left-0 -translate-x-1/2  rounded-l-full transition-all duration-300 "
				}
			>
				<span
					className={
						(!visible ? "-rotate-[135deg]" : "rotate-45 -translate-x-1/2") +
						"  border-stone-800 p-2 absolute -translate-y-1/2 top-1/2 left-1/4 inline-block border-t-[5px] border-r-[5px] transition-all rounded-b-md rounded-l-md duration-300"
					}
				></span>
			</div>
			<div className="px-6 py-4 w-full h-full z-10 relative top-24 lg:static bg-stone-100 overflow-scroll">
				<h3 className="text-2xl lg:text-4xl   pt-4 font-medium text-primary-brown">
					Your recent smol urls:
				</h3>

				{Object.keys(cookies.cookies).length == 0 && (
					<p className="text-xs text-primary-red  ">
						Cookies are not accepted, your saved urls wont be there when you
						comme back unless you{" "}
						<button
							onClick={() => CreateCookie(url_list)}
							className="text-xs text-primary-red font-medium underline "
						>
							Accept cookies
						</button>
					</p>
				)}

				<ul className="flex flex-col h-full">
					{url_list.length > 0 ? (
						url_list.map((url_pair, id) => (
							<li key={id} className=" py-2 border-b-2 border-primary-brown-2">
								<UrlPairs data={url_pair} />
								<div className="pb-2 pt-3 xl:pt-4 flex justify-around w-full sm:w-2/3 md:w-1/2 lg:w-full 2xl:w-2/3">
									<Button
										color="green"
										onClick={() => {
											navigator.clipboard.writeText(url_pair.short);
											toast.success("📋 Copied to clipboard !");
										}}
										text="Copy to clipboard"
									/>

									<Button
										color="red"
										onClick={() => delete_url_from_list(id)}
										text="Delete url"
									/>
								</div>
							</li>
						))
					) : (
						<li className=" text-lg pt-8 place-self-center">
							No urls saved yet
						</li>
					)}
				</ul>
			</div>
		</aside>
	);
}

export default withCookies(Sidebar);
