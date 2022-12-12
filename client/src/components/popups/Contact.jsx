import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Contact() {
  const Joi = require("joi");
  const [mail_sender,setmail_sender]= useState("")
  const [mail_content,setmail_content]= useState("")
  const [errors,setErrors]=useState({})
  const schema = Joi.object({
    mail_sender: Joi.string().email( {tlds: { allow: false } }).required().messages({
      "string.email": "Invalid email",
      "string.empty": "Please insert an email",
    }),
    mail_content: Joi.string()
    .min(20)
      .max(10000).required()
      .messages({
        "string.max": "Your email cant exceed 10 000 characters",
        "string.empty":"Your message can't be empty"
      }),
  });
  const sendEmail= async (event)=>{
    let new_errors= {...errors}
    event.preventDefault();
    try {
    await schema.validateAsync({mail_sender:mail_sender,mail_content:mail_content},{abortEarly:false});
    const res = await axios.post("contact/send", {mail_content,mail_sender});
    console.log(res)
  }catch (err){
    console.log(err)
    err.details.forEach(
       (error) => (new_errors[error.context.label] = error.message)
      );
    setErrors(new_errors);
    


  }
}
  // might implement real time error handling
   useEffect(()=>{
    
      console.log("error", errors);
     
   }
  )
  return (
    <form onSubmit={sendEmail}  >
      <h3>Contact</h3>
      <p>Any question ? Send me an e-mail through this form and i'll answer you asap !</p>
      <label for="mail_sender" title="So I can answer your mail !">Your email adress :</label>
      <input type="text"  name="mail_sender" id="mail_sender" value={mail_sender} onChange={(e) =>setmail_sender(e.target.value)} />
      {errors !== false && <p>{errors["mail_sender"]}</p>}

      <label for="contact_message" title="Cant exceed 10 000 characters" >Your Message :</label>
      <textarea
        name="contact_message"
        id="contact_message"
        cols="30"
        rows="10"
        value={mail_content}
        onChange={(e) =>setmail_content(e.target.value)}
        
      ></textarea>
      {errors !== false && <p>{errors["message"]}</p>}

      <input type="submit" value="Submit" />


    </form>
  );
}

export default Contact;
