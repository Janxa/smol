import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <div className="App">
      <Header />
      <UrlForm />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;
