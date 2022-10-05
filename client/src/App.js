import "./App.css";
import Main from "./components/Main.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookiesBanner from "./components/Cookies";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie] = useCookies(["url_list"]);
  function CreateCookie() {
    console.log(cookies);

    setCookie("url_list", "[]", {
      path: "/",
    });
    console.log(cookies);
  }
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      {/* {Object.keys(cookies).length === 0 && ( */}
      <CookiesBanner CreateCookie={CreateCookie} />
      {/* )} */}
    </div>
  );
}

export default App;
