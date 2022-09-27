import React, { Component } from "react";
import url_regex from "../variables";
import axios from "axios";
import UrlPairs from "./UrlPairs";
const Joi = require("joi");
class UrlForm extends Component {
  state = {
    data: { url: "", alias: "", allowMod: false },
    errors: {},
    url_list: [],
  };
  schema = Joi.object({
    url: Joi.string().pattern(url_regex).max(1000).required().messages({
      "string.pattern.base":
        "This is not a valid url, url should look like 'http://thisIsAnURL.com'",
      "string.max": "Url too long",
      "string.empty": "Please insert an url",
    }),
    alias: Joi.string().min(3).max(1000).allow("").messages({
      "string.min": "Alias too short",
      "string.max": "Alias too long",
    }),
  });
  handleChange = ({ currentTarget: input }) => {
    const name = input.name;
    const data = { ...this.state.data };
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
    let url_list = [...this.state.url_list];
    try {
      await this.schema.validateAsync(
        {
          url: data["url"],
          alias: data["alias"],
        },
        { abortEarly: false }
      );
      const res = await axios.post("shortner/generate", data);
      url_list.push(res.data);
      this.setState({ url_list });
      console.log(this.state);
    } catch (err) {
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
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="url">Enter the url you want to shorten</label>
          <input
            value={data.url}
            onChange={this.handleChange}
            name="url"
            type="text"
          />
          {this.state.errors !== false && <p>{this.state.errors["url"]}</p>}
          <label htmlFor="alias">Customize your url</label>
          <input
            value={data.alias}
            onChange={this.handleChange}
            name="alias"
            type="text"
          />
          <input
            type="checkbox"
            name="allowMod"
            checked={data.allowMod}
            onChange={this.handleCheck}
          />
          {this.state.errors !== false && <p>{this.state.errors["alias"]}</p>}

          <button type="submit">Make it SMOL !</button>
        </form>
        {this.state.url_list.length !== 0 && (
          <UrlPairs data={this.state.url_list.at(-1)} />
        )}
      </>
    );
  }
}

export default UrlForm;
