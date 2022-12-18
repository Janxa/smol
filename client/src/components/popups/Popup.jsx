import React  ,{useRef, useEffect} from "react";
function Popup(props) {
  const {ClosePopup,Content,visible} = props;
  const PopupRef = useRef(null);

  useEffect(() => {
      function handleClickOutside(event) {
        console.log(PopupRef)

        if (PopupRef.current && !PopupRef.current.contains(event.target)) {
          ClosePopup()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [PopupRef]);
  

  
  

  return( (visible) ? (
  <div ref={PopupRef} >
     <button onClick={props.ClosePopup}>X</button>
     <Content ClosePopup={props.ClosePopup}/>
  </div> )
    
    : '');
}

export default Popup;
