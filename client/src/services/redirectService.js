import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL= process.env.REACT_APP_API_URL;

async function redirect(){

    let url = window.location.href;
    let start = url.indexOf(BASE_URL);
    let end = start + BASE_URL.length;
    const short_url= url.substring(0, start - 1) + url.substring(end);

    if (url != BASE_URL){
        try{
        const res= await axios.get(API_URL+'/redirect/'+short_url);
        window.location.replace(res.data)
        }catch (e) {
            window.location.replace(BASE_URL);
        };
     }
    else window.location.replace(BASE_URL);
}
export default redirect;





