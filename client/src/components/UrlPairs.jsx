import React from "react";
function UrlPairs({ data }) {
	return (
		<div className="w-4/5 pt-2 pl-4 flex flex-col">
			<p
				className="truncate w-full font-medium text-primary-green  md:text-lg"
				onClick={null}
			>
				{data.short}
			</p>
			<a
				className="truncate w-full text-xs md:text-sm text-stone-700"
				href={data.long}
				target="_blank"
				rel="noreferrer"
			>
				{data.long}
			</a>
		</div>
	);
}

export default UrlPairs;
