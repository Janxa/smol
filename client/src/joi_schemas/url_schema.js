import { url_regex, reserved_keywords } from "../variables";

const Joi = require("joi");

const url_schema = Joi.object({
	url: Joi.string().pattern(url_regex).max(1000).required().messages({
		"string.pattern.base":
			"This is not a valid url, url should look like 'http://thisIsAnURL.com'",
		"string.max": "Url too long",
		"string.empty": "Please insert an url",
	}),
	alias: Joi.string()
		.min(3)
		.trim()
		.max(1000)
		.regex(/^\S+$/)
		.allow("")
		.invalid(...reserved_keywords)
		.messages({
			"string.min": "Alias too short",
			"string.max": "Alias too long",
			"string.invalid": "Alias invalid",
			"string.pattern.base": "Alias can't contain space",
		}),
});

export { url_schema };
