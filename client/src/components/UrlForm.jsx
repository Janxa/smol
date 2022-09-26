import React, { Component } from "react";
import url_regex from "../variables";
import axios from "axios";
const Joi = require("joi");
class UrlForm extends Component {
  state = { data: { long: "", alias: "", allowMod: false }, errors: {} };
  schema = Joi.object({
    long: Joi.string().pattern(url_regex).required(),
    alias: Joi.string().min(3).required(),
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
    try {
      await this.schema.validateAsync({
        long: data["long"],
        alias: data["alias"],
      });
      await axios.post("shortner/generate", data);
    } catch (err) {
      errors = err;
      this.setState({ errors }, () => {
        console.log("error", this.state.errors);
      });
    }
  };
  render() {
    const data = { ...this.state.data };
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="long">Enter the url you want to shorten</label>
        <input
          value={data.long}
          onChange={this.handleChange}
          name="long"
          type="text"
        />
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
        <button type="submit">Make it SMOL !</button>
      </form>
    );
  }
}

export default UrlForm;
