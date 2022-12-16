import React, { Component } from "react";
import { url_regex, reserved_keywords } from "../variables";
import axios from "axios";
import UrlPairs from "./UrlPairs";
const Joi = require("joi");
class UrlForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: { url: "", alias: "", allowMod: false },
    last_url: {},
    errors: {},
  };
  schema = Joi.object({
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
        "string.regex": "Alias can't contain space",
      }),
  });
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const name = input.name;
    data[name] = input.value;
    this.setState({ data });
  };
  handleCheck = ({ currentTarget: checkBox }) => {
    const name = checkBox.name;
    const data = { ...this.state.data };
    data[name] = !data[name];
    this.setState({ data });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state.data };
    let errors = { ...this.state.errors };
    let last_url = { ...this.state.last_url };
    try {
      await this.schema.validateAsync(
        {
          url: data["url"],
          alias: data["alias"],
        },
        { abortEarly: false }
      );
      const res = await axios.post("shortner/generate", data);
      this.props.add_url_to_list(res.data);
      last_url = res.data;
      this.setState({ last_url });
    } catch (err) {
      console.log(err);
      err.details.forEach(
        (error) => (errors[error.context.label] = error.message)
      );
      this.setState({ errors }, () => {
        console.log("error", this.state.errors);
      });
    }
  };
  render() {
    const data = { ...this.state.data };
    return (
      <section>
        <form onSubmit={this.handleSubmit} className="flex flex-col">
          <label htmlFor="url">Enter the url you want to shorten</label>
          <input
            className="rounded-md shadow-sm "
            value={data.url}
            onChange={this.handleChange}
            name="url"
            type="text"
          />
          {this.state.errors !== false && <p>{this.state.errors["url"]}</p>}
          <label htmlFor="alias">Customize your url</label>
          <input
            className="rounded-md shadow-sm "
            value={data.alias}
            onChange={this.handleChange}
            name="alias"
            type="text"
          /><div className="py-2"> 
            <label htmlFor="allowmod">Allow non-strict mode for custom-named urls </label>
          <input
            type="checkbox"
            name="allowMod"
            checked={data.allowMod}
            onChange={this.handleCheck}
          />
          </div>
         
          {this.state.errors !== false && <p>{this.state.errors["alias"]}</p>}

          <button className="rounded-md bg-greenpear p-4 "type="submit">Make it SMOL !</button>
        </form>
        {Object.keys(this.state.last_url).length !== 0 && (
          <UrlPairs data={this.state.last_url} />
        )}
      </section>
    );
  }
}

export default UrlForm;
