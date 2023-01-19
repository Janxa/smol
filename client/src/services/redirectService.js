import axios from "axios";

async function redirect(){
    console.log(Object.keys(process.env))
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const API_URL= process.env.REACT_APP_API_URL;
    console.log('redirectcalled')
    console.log('BASE_URL',BASE_URL)
    console.log('API_URL',API_URL)
    let url = window.location.href;
    console.log('url:',url)
    let start = url.indexOf(BASE_URL);
    console.log('start',start)
    let end = start + BASE_URL.length;
    console.log('end',end)
    const short_url= url.substring(0, start - 1) + url.substring(end);
    console.log('short_url',short_url)
    if (url != BASE_URL){
        try{
        const res= await axios.get(API_URL+'/api/redirect/'+short_url);
        window.location.replace(res.data)
        }catch (e) {
            window.location.replace(BASE_URL);
        };
     }
    else window.location.replace(BASE_URL);
}
export default redirect;





