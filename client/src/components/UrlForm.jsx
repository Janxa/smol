import React, { Component, useState } from "react";
import { url_schema } from "../joi_schemas/url_schema";
import axios from "axios";
import UrlPairs from "./UrlPairs";
const Joi = require("joi");

function UrlForm(props) {
  const [data,setData] = useState( { url: "", alias: "", allowMod: false });
  const [errors,setErrors]=useState({})
  const schema = url_schema;
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
      props.setLastUrl(lastUrl );
      setData({ url: "", alias: "", allowMod: false })
    } catch (err) {
      console.log(err);
      err.details.forEach(
        (error) => (errors[error.context.label] = error.message)
      );
    }
    setErrors(errors )
  };
  return ( 
    
    <section className=" bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm">
   
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="url" className="pt-2 text-lg text-stone-900">Enter the url you want to shorten :</label>
          <input
            className={errors['url'] ?"input-invalid" : "input"}
            value={data.url}
            onChange={handleChange}
            name="url"
            type="text"
          />
          {errors['url']  && <p className="error-label">{errors["url"]}</p>}
          <label htmlFor="alias" className="pt-2 text-lg text-stone-900">Customize your url :</label>
          <input
            className={errors['alias'] ? "input-invalid" :"input"}
            value={data.alias}
            onChange={handleChange}
            name="alias"
            type="text"
            />
            {errors['alias']&& <p  className="error-label">{errors["alias"]}</p>}
          
          <div className="py-2 z-0 relative"> 
            <label htmlFor="allowmod" className="pt-2 text-stone-900 hover:cursor-help peer ">Allow non-strict mode for custom-named urls </label>
            <span className=" invisible peer-hover:visible opacity-0 peer-hover:opacity-100 duration-300 hover:visible hover:opacity-100 botom-full bg-stone-900 w-3/4  py-1 px-2 text-center rounded-2xl text-white text-sm  transition-all ease-in absolute">Add characters at the end of your url if your custom url has already been taken.</span>
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
      </section>
    
  );
}

export default UrlForm;