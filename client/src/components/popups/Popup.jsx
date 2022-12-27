import React  ,{useRef, useEffect} from "react";
function Popup(props) {
  const {ClosePopup,Content,visible} = props;
  const PopupRef = useRef(null);

  useEffect(() => {
      function handleClickOutside(event) {
        console.log(PopupRef)
        if (PopupRef.current && !PopupRef.current.contains(event.target)  ){
          animatedClosePopup()
        }
      }
      document.addEventListener("click", handleClickOutside,{capture:true});
      return () => {
        console.log("unmounting")
        document.removeEventListener("click", handleClickOutside,{capture:true});
      };
    }, [PopupRef]);

    useEffect(()=>{
    if (visible){
    setTimeout(()=>PopupRef.current.className="scale-100 rounded-lg p-4 top-1/2 left-1/2 h-5/6 w-5/6 fixed z-50  -translate-x-1/2 -translate-y-1/2 absolute bg-stone-200 transition-transform ease-in duration-300",10)
    }},[visible],
 
    )
    
    const animatedClosePopup= () =>{ 
      PopupRef.current.className="scale-0 top-1/2 left-1/2 h-5/6 w-5/6 fixed z-50 -translate-x-1/2   -translate-y-1/2 bg-stone-200 transition-transform ease-in-out duration-300"
      setTimeout(ClosePopup,300);
};
    console.log("ref",PopupRef)

  return( 
  <div ref={PopupRef} className= "scale-0 top-1/2 left-1/2 h-5/6 w-5/6  z-50 absolute -translate-x-1/2 -translate-y-1/2  bg-stone-200 transition-transform ease-in duration-300">
      <span onClick={animatedClosePopup}className="after:content-['\00d7'] after:cursor-pointer after:text-2xl after:text-primary-brown after:hover:text-black after:absolute after:hover:scale-105 after:top-0 after:right-3"></span>


      <Content /> 
     </div> 
    
  )
    
   
}

export default Popup;
