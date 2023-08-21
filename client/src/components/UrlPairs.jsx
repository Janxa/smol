import React from "react";
function UrlPairs(props) {
	return (
		<div className="w-4/5 pt-2 pl-4 flex flex-col">
			<p
				className="truncate w-full font-medium text-primary-green lg:text-xl md:text-lg"
				onClick={null}
			>
				{props.data.short}
			</p>
			<a
				className="truncate w-full text-xs md:text-sm text-stone-700 lg:text-lg"
				href={props.data.long}
				target="_blank"
				rel="noreferrer"
			>
				{" "}
				{props.data.long}
			</a>
		</div>
	);
}

export default UrlPairs;
