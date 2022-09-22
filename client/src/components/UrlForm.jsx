import React, { Component } from "react";
import url_regex from "../variables";
const Joi = require("joi");
class UrlForm extends Component {
  state = { data: { long: "", alias: "" } };
  schema = Joi.object({
    long: Joi.string().pattern(url_regex).required(),
    alias: Joi.string().required(),
  });
  handleChange = ({ currentTarget: input }) => {
    const name = input.name;
    const data = { ...this.state.data };
    data[name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      this.schema.validate({
        long: this.state.data["long"],
        alias: this.state.data["alias"],
      })
    );
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="long">Enter the url you want to shorten</label>
        <input
          value={this.state.data.long}
          onChange={this.handleChange}
          name="long"
          type="text"
        />
        <label htmlFor="alias">Customize your url</label>
        <input
          value={this.state.data.alias}
          onChange={this.handleChange}
          name="alias"
          type="text"
        />
        <button type="submit">Make it SMOL !</button>
      </form>
    );
  }
}

export default UrlForm;
