import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import UrlForm from "./components/UrlForm";
function App() {
  return (
    <div className="App">
      <UrlForm />
    </div>
  );
}

export default App;
