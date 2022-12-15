import React  ,{useRef, useEffect} from "react";
function Popup(props) {

  const PopupRef = useRef(null);

  useEffect(() => {
      function handleClickOutside(event) {
        if (PopupRef.current && !PopupRef.current.contains(event.target)) {
          props.ClosePopup()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [PopupRef]);
  

  const Content=props.content;
  const visible = props.visible;
  

  return( (visible) ? (
  <div ref={PopupRef} >
     <button onClick={props.ClosePopup}>X</button>
     <Content ClosePopup={props.ClosePopup}/>
  </div> )
    
    : '');
}

export default Popup;
