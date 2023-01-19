import React  ,{useRef, useEffect} from "react";
function Popup(props) {
  const {ClosePopup,Content,visible} = props;
  const PopupRef = useRef(null);
  const OpacityRef = useRef(null)

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
    }, [PopupRef,animatedClosePopup]);

    useEffect(()=>{
    if (visible){
    setTimeout(()=>(
      PopupRef.current.className="scale-100  rounded-lg p-4 top-1/2 left-1/2 w-5/6 xl:w-4/6 2xl:w-7/12 absolute z-50  -translate-x-1/2 -translate-y-1/2 absolute bg-stone-200 transition-transform ease-in duration-300"
      ,OpacityRef.current.className= "h-screen w-screen bg-gray-800/[0.3] absolute  z-10 transition-all ease-in duration-300"),10)
    }},[visible],

    )

    const animatedClosePopup= () =>{
      OpacityRef.current.className="h-screen w-screen bg-gray-800/[0.0] absolute  z-10 transition-all ease-in duration-300"
      PopupRef.current.className="scale-0 top-1/2 left-1/2 w-5/6 xl:w-4/6 2xl:w-7/12 absolute z-50 -translate-x-1/2   -translate-y-1/2 bg-stone-200 transition-transform ease-in-out duration-300"
      setTimeout(ClosePopup,300);
};
    console.log("ref",PopupRef)

  return( <><div ref={OpacityRef}className=''></div>
  <div ref={PopupRef} className= "scale-0 top-1/2 left-1/2 w-5/6 xl:w-4/6 2xl:w-7/12  z-50 absolute -translate-x-1/2 -translate-y-1/2  bg-stone-200 transition-transform ease-in duration-300">
      <span onClick={animatedClosePopup}className="after:content-['\ud7'] after:cursor-pointer after:text-2xl after:text-primary-brown after:hover:text-black after:absolute after:hover:scale-105 after:top-0 after:right-3 md:after:top-2 md:after:right-5 md:after:scale-110 md:after:hover:scale-[1.3]"></span>
      <div className="md:p-2 ">

      <Content />
      </div>
     </div>

    </>
  )


}

export default Popup;
