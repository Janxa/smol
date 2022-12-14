import React, { Component } from "react";

function Popup(props) {
  const Content=props.content;
  console.log(Content)
  const visible = props.visible;
  
  return( (visible) ? (
  <div> 
     <Content ClosePopup={props.ClosePopup}/>
  </div> )
    
    : '');
}

export default Popup;
