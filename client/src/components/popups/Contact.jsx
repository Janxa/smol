import React, { Component } from "react";
function Contact() {
  return (
    <form action="">
      <input type="email" name="contact_email" id="contact_email" />
      <textarea
        name="contact_message"
        id="contact_message"
        cols="30"
        rows="10"
      ></textarea>
    </form>
  );
}

export default Contact;
