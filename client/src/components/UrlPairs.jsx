import React from "react";
function UrlPairs(props) {
  return (
    <div className="w-4/5 pt-2 flex flex-col">
      <p className="truncate w-full font-medium  text-primary-green"onClick={null}>{props.data.short}</p>
      <a className="truncate w-full text-xs text-stone-700" href={props.data.long} target="_blank" rel="noreferrer" > {props.data.long}</a>
    </div>
  );
}

export default UrlPairs;
