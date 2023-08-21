import React from "react";
import UrlForm from "./UrlForm";
import { useState, useEffect } from "react";
import { withCookies } from "react-cookie";

const Main = ({ url_list, setUrl_list }) => {
	const [shortenedUrl, setShortenedUrl] = useState(null);
	const [shortenedUrlError, setShortenedUrlError] = useState(null);

	useEffect(() => {
		if (shortenedUrl) {
			setUrl_list((prevList) => [...prevList, shortenedUrl]);
		}
	}, [shortenedUrl]);

	return (
		<main className="flex flex-col-reverse items-center justify-between ">
			<UrlForm
				setShortenedUrl={setShortenedUrl}
				setShortenedUrlError={setShortenedUrlError}
			/>
			{(shortenedUrl || shortenedUrlError) &&
				(shortenedUrlError ? (
					<div className=" flex flex-col  w-10/12 bg-primary-red p-2 mt-4 rounded-md shadow-sm md:w-9/12 lg:w-3/5">
						<div className="flex justify-between h-full ">
							<h3 className="text-lg lg:text-lg py-2 px-4 text-primary-white ">
								{shortenedUrlError}
							</h3>
							<span
								onClick={() => setShortenedUrlError(null)}
								className="after:content-['\00d7'] after:cursor-pointer after:text-xl after:lg:text-2xl after:text-primary-white after:relative after:-top-2  "
							></span>
						</div>
					</div>
				) : (
					<div className=" flex flex-col bg-primary-green w-10/12 mt-4 rounded-md shadow-sm md:w-9/12 lg:w-3/5">
						<div className="flex justify-between h-full p-4  ">
							<h3 className="text-lg lg:text-2xl pl-2 text-primary-white font-medium">
								Here's your Shortened url !
							</h3>
							<span
								onClick={() => setShortenedUrl(null)}
								className="after:content-['\00d7'] after:cursor-pointer after:text-xl after:lg:text-2xl after:text-primary-white after:relative after:-top-4 after:-right-2"
							></span>
						</div>
						<div className="bg-stone-200 rounded-b-md ">
							<p className=" text-primary-green px-2 pt-2 lg:text-md underline font-medium">
								{shortenedUrl.short}
							</p>
							<p className=" line-through py-2 pl-2 truncate text-sm text-stone-500 ">
								{shortenedUrl.long}
							</p>
						</div>
					</div>
				))}
		</main>
	);
};

export default withCookies(Main);
