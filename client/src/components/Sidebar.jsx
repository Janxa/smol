import React from "react";
import axios from "axios";
import UrlPairs from "./UrlPairs";
import Button from "./Common/Button";
import { withCookies } from "react-cookie";
function Sidebar(props) {
	const { url_list, setUrl_list, visible, setVisible } = props;

	const delete_url_from_list = async (id) => {
		const new_url_list = [...url_list];
		let deleted = new_url_list.splice(id, 1)[0];

		const res = await axios.delete("/api/shortner/delete", { data: deleted });
		setUrl_list(new_url_list);
	};

	return (
		<aside
			className={
				(!visible
					? "opacity-0 lg:opacity-100 translate-x-full "
					: "opacity-100  translate-x-0  ") +
				" fixed z-10 right-0 h-screen w-full lg:w-1/3 bg-stone-100 flex flex-col transition-[transform,opacity] ease-in duration-300  "
			}
		>
			<div
				onClick={() => setVisible(!visible)}
				className={
					"hidden lg:block bg-stone-100 hover:bg-secondary-yellow w-24 h-32  z-0 cursor-pointer shadow-sm  relative top-1/2 left-0 -translate-x-1/2 rounded-full transition-colors duration-300 "
				}
			>
				<span
					className={
						(!visible ? "-rotate-[135deg]" : "rotate-45 -translate-x-1/2") +
						"  border-stone-800 p-3 absolute -translate-y-1/2 top-1/2 left-1/4 inline-block border-t-8 border-r-8 transition-all  duration-300"
					}
				></span>
			</div>
			<div className="px-6 py-4 w-full h-full z-10 bg-stone-100 overflow-scroll">
				<h3 className="text-2xl lg:text-4xl xl:text-5xl  font-medium text-stone-900">
					Your recent smol urls:
				</h3>
				<ul className="flex flex-col h-full">
					{url_list.length > 0 ? (
						url_list.map((url_pair, id) => (
							<li key={id} className=" py-2 border-b-2 border-primary-brown-2">
								<UrlPairs data={url_pair} />
								<div className="pb-2 pt-3 xl:pt-4 flex justify-around w-2/3 lg:w-full 2xl:w-2/3">
									<Button
										color="green"
										onClick={null}
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
