import React, { useState } from "react";
import { url_schema } from "../joi_schemas/url_schema";
import axios from "axios";
import LoadingWheel from "./Common/LoadingWheel";
import Button from "./Common/Button";
function UrlForm({ setShortenedUrl, setShortenedUrlError }) {
	const [data, setData] = useState({ url: "", alias: "", allowMod: false });
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const schema = url_schema;

	const handleChange = ({ currentTarget: input }) => {
		if (errors[input.name]) {
			setErrors((errors) => {
				const updatedErrors = { ...errors };
				delete updatedErrors[input.name];
				return updatedErrors;
			});
		}
		setData((data) => {
			return {
				...data,
				[input.name]: input.value,
			};
		});
	};
	const handleCheck = ({ currentTarget: checkBox }) => {
		setData((data) => {
			return {
				...data,
				[checkBox.name]: !data.allowMod,
			};
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let errors = {};
		let lastUrl = {};
		setLoading(true);
		setShortenedUrlError(null);
		setShortenedUrl(null);
		const validationResult = schema.validate(
			{
				url: data["url"],
				alias: data["alias"],
			},
			{ abortEarly: false }
		);
		if (validationResult.error) {
			validationResult.error.details.forEach(
				(error) => (errors[error.context.label] = error.message)
			);
			setErrors(errors);
			setLoading(false);
			return;
		}

		try {
			const res = await axios.post("/api/shortner/generate", data);
			lastUrl = res.data.urls;
			setShortenedUrl(lastUrl);
			setData({ url: "", alias: "", allowMod: false });
		} catch (error) {
			setShortenedUrlError(error.response.data.error);
			setLoading(false);
			return;
		}
		setLoading(false);
		return;
	};

	return (
		<section className=" bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm md:w-9/12 lg:w-3/5  ">
			<form onSubmit={handleSubmit} className="flex flex-col">
				<label
					htmlFor="url"
					className="pt-2 text-lg lg:text-xl lg:pt-4 text-stone-900"
				>
					Enter the url you want to shorten :
				</label>
				<input
					className={errors["url"] ? "input-invalid" : "input"}
					value={data.url}
					onChange={handleChange}
					name="url"
					type="text"
				/>
				{errors["url"] && <p className="error-label">{errors["url"]}</p>}
				<label
					htmlFor="alias"
					className="pt-2 lg:text-xl lg:pt-4 text-stone-900"
				>
					Customize your url :
				</label>
				<input
					className={errors["alias"] ? "input-invalid" : "input"}
					value={data.alias}
					onChange={handleChange}
					name="alias"
					type="text"
				/>
				{errors["alias"] && <p className="error-label">{errors["alias"]}</p>}
				<div className="py-2 z-0 relative">
					<label
						htmlFor="allowmod"
						className="pt-2 text-stone-900 hover:cursor-help peer text-sm sm:text-base lg:text-lg "
					>
						Allow non-strict mode for custom-named urls{" "}
					</label>
					<span className=" invisible peer-hover:visible opacity-0 peer-hover:opacity-100 duration-300   bg-stone-900 w-3/4 lg:w-1/2  py-1 px-2 text-center rounded-2xl text-white text-sm  transition-all ease-in absolute left-0 -top-full">
						Add characters at the end of your url if your custom url has already
						been taken.
					</span>
					<input
						className="accent-primary-green"
						type="checkbox"
						name="allowMod"
						checked={data.allowMod}
						onChange={handleCheck}
					/>
				</div>
				<div className="flex justify-center ">
					{loading ? (
						<LoadingWheel />
					) : (
						<Button text="Make it SMOL !" type="submit" color="green" />
					)}
				</div>
			</form>
		</section>
	);
}

export default UrlForm;
