import React, { Component } from "react";
import {  toast } from 'react-toastify';
import { useEffect,useState} from "react";
import { contact_schema } from "../../joi_schemas/contact_schema"
import axios from "axios";

function Contact(props) {
  const Joi = require("joi");
  const [mail_sender,setmail_sender]= useState("")
  const [mail_content,setmail_content]= useState("")
  const [errors,setErrors]=useState({})
  const schema = contact_schema;

  const sendEmail= async (event)=>{
    let new_errors= {}
    event.preventDefault();
    try {
    await schema.validateAsync({mail_sender:mail_sender,mail_content:mail_content},{abortEarly:false});
    const res = await toast.promise( axios.post("contact/send", {mail_content,mail_sender}),
    {
      pending: 'Loading',
      success: '📧 Your email has been sent !',
      error: '🤯 Error, could not send email '
    }
);
    console.log(res);
    setmail_sender("");
    setmail_content("");
      props.ClosePopup();
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
   <form onSubmit={sendEmail} className="[&>*]:p-1 flex flex-col w-full h-full overflow-hidden p-2" >
      <h3 className="text-2xl font-medium text-primary-brown-2">Contact</h3>
      <p>Any question ? Send me an e-mail through this form and i'll answer you asap !</p>
      <label for="mail_sender" title="So I can answer your mail !">Your email adress :</label>
      <input className={errors["mail_sender"] ? "input-invalid":"input"} type="text"  name="mail_sender" id="mail_sender" value={mail_sender} onChange={(e) =>setmail_sender(e.target.value)} />
      {errors["mail_sender"] && <p className="error-label">{errors["mail_sender"]}</p>}

      <label for="contact_message" title="Cant exceed 10 000 characters" >Your Message :</label>
      <textarea className={errors["mail_sender"] ? "input-invalid":"input"}
        name="contact_message"
        id="contact_message"
        cols="30"
        rows="10"
        value={mail_content}
        onChange={(e) =>setmail_content(e.target.value)}
        
      ></textarea>
      {errors["mail_content"] && <p className="error-label">{errors["mail_content"]}</p>}

      <input type="submit" value="Send Email !" className="btn-validation mt-2"/>

    </form>
      
  );
}

export default Contact;
