import React, { Component, useState } from "react";
import { url_schema } from "../joi_schemas/url_schema";
import axios from "axios";
import UrlPairs from "./UrlPairs";
const Joi = require("joi");

function UrlForm(props) {
  const [data,setData] = useState( { url: "", alias: "", allowMod: false });
  const [lastUrl,setLastUrl] =useState({})
  const [errors,setErrors]=useState({})
  const schema = url_schema;
  console.log(errors)
  const handleChange = ({ currentTarget: input }) => {
    setData( (data)=>{
      return{
        ...data,
        [input.name]:input.value
      }
    } );
  };
  const handleCheck = ({ currentTarget: checkBox }) => {
    setData( (data)=>{
      return{
        ...data,
        [checkBox.name]:!data.allowMod
      }
    } );

  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = {};
    let lastUrl = {};
    try {
      await schema.validateAsync(
        {
          url: data["url"],
          alias: data["alias"],
        },
        { abortEarly: false }
      );
      const res = await axios.post("shortner/generate", data);
      props.add_url_to_list(res.data);
      lastUrl = res.data;
      setLastUrl(lastUrl );
    } catch (err) {
      console.log(err);
      err.details.forEach(
        (error) => (errors[error.context.label] = error.message)
      );
      setErrors(errors );
    }
  };
  return ( 
    
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="url" className="pt-2 text-lg text-stone-900">Enter the url you want to shorten :</label>
          <input
            className={errors['url'] ?"input-invalid" : "rounded-md shadow-sm p-4  bg-stone-50 focus:bg-white focus:outline-none focus:shadow-sm focus:shadow-stone-400"}
            value={data.url}
            onChange={handleChange}
            name="url"
            type="text"
          />
          {errors['url']  && <p className="text-primary-red font-medium">{errors["url"]}</p>}
          <label htmlFor="alias" className="pt-2 text-lg text-stone-900">Customize your url :</label>
          <input
            className={errors['alias'] ? "input-invalid" :"rounded-md shadow-sm p-4  bg-stone-50 focus:bg-white focus:outline-none focus:shadow-sm focus:shadow-stone-400 "}
            value={data.alias}
            onChange={handleChange}
            name="alias"
            type="text"
          /><div className="py-2"> 
            {errors['alias']&& <p  className="text-primary-red  font-medium">{errors["alias"]}</p>}
            <label htmlFor="allowmod" className="pt-2 text-stone-900">Allow non-strict mode for custom-named urls </label>
          <input
            className="accent-primary-green"
            type="checkbox"
            name="allowMod"
            checked={data.allowMod}
            onChange={handleCheck}
          />
          </div>
         

          <button className="btn-validation self-center"type="submit">Make it SMOL !</button>
        </form>
        {Object.keys(lastUrl).length !== 0 && (
          <UrlPairs data={lastUrl} />
        )}
      </section>
    
  );
}

export default UrlForm;