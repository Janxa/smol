import React from "react";
import Button from "./Common/Button";
function CookiesBanner(props) {
	return (
		<div className="z-20 shadow-2xl fixed bottom-0 left-0 right-0 w-full bg-stone-200 p-2 flex flex-col items-center ">
			<div className="h-full  flex flex-col   justify-around items-center">
				<p className="text-stone-900  p-2  ">
					We use cookies to personalize and improve your experience on this
					site.{" "}
					<p>
						Visit our privacy policy for more information on our data collection
						practices.{" "}
					</p>
				</p>
				<div className="flex flex-row w-1/2 md:w-1/3 justify-around [&>*]:mt-1">
					<Button
						onClick={() => props.CreateCookie(props.url_list)}
						color="green"
						text="Accept"
						size="small"
					/>
					<Button
						onClick={() => props.RefuseCookie()}
						color="red"
						text="Refuse"
						size="small"
					/>
				</div>
			</div>
		</div>
	);
}

export default CookiesBanner;
