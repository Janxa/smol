import React from "react";
import UrlForm from "./UrlForm";
import { useState, useEffect } from "react";
import { withCookies } from "react-cookie";

const Main = (props) => {
	const [shortenedUrl, setShortenedUrl] = useState(null);
	const [shortenedUrlError, setShortenedUrlError] = useState(null);
	const { url_list, setUrl_list } = props;

	const add_url_to_list = (url) => {
		const new_url_list = [...url_list];
		new_url_list.push(url);
		setUrl_list(new_url_list);
	};
	useEffect(() => {
		if (shortenedUrl) {
			const new_url_list = [...url_list];
			new_url_list.push(shortenedUrl);
			setUrl_list(new_url_list);
		}
	}, [shortenedUrl]);

	return (
		<main className="flex flex-col-reverse items-center justify-between ">
			<UrlForm
				setShortenedUrl={setShortenedUrl}
				setShortenedUrlError={setShortenedUrlError}
				add_url_to_list={add_url_to_list}
			/>
			{(shortenedUrl || shortenedUrlError) &&
				(shortenedUrlError ? (
					<div className=" flex flex-col  w-10/12 bg-red-300 p-2 m-4 rounded-md shadow-sm md:w-9/12 lg:w-2/3">
						<div className="flex justify-between h-full ">
							<h3 className="text-lg lg:text-2xl p-2 text-red-700  ">
								{shortenedUrlError}
							</h3>
							<span
								onClick={() => setShortenedUrlError(null)}
								className="after:content-['\00d7'] after:cursor-pointer after:text-xl after:lg:text-2xl after:text-red-800 after:relative after:-top-2 "
							></span>
						</div>
					</div>
				) : (
					<div className=" flex flex-col bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm md:w-9/12 lg:w-2/3">
						<div className="flex justify-between h-full ">
							<h3 className="text-lg lg:text-2xl p-2 text-primary-brown ">
								Here's your Shortened url !
							</h3>
							<span
								onClick={() => setShortenedUrl(null)}
								className="after:content-['\00d7'] after:cursor-pointer after:text-xl after:lg:text-2xl after:text-black after:relative after:-top-4 after:-right-2"
							></span>
						</div>
						<div>
							<p className="  text-primary-green p-2 lg:text-lg font-medium">
								{shortenedUrl.short}
							</p>
							<p className=" line-through px-2 truncate text-sm text-stone-700 ">
								{shortenedUrl.long}
							</p>
						</div>
					</div>
				))}
		</main>
	);
};

export default withCookies(Main);
