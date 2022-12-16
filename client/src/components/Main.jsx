import React, { Component } from "react";
import UrlForm from "./UrlForm";
import Sidebar from "./Sidebar";
import { withCookies } from "react-cookie";
import CookiesBanner from "./Cookies";
import axios from "axios";
class Main extends Component {
  state = { url_list: this.props.cookies.get("url_list") || [] };

  add_url_to_list = (url) => {
    const url_list = [...this.state.url_list];
    url_list.push(url);
    this.setState({ url_list });
    if (Object.keys(this.props.cookies.cookies).length > 0) {
      this.props.cookies.set("url_list", url_list, {
        path: "/",
      });
    }
    console.log("list", url_list);
  };
  delete_url_from_list = async (id) => {
    const url_list = [...this.state.url_list];
    let deleted = url_list.splice(id, 1)[0];
    this.setState({ url_list });
    if (Object.keys(this.props.cookies.cookies).length > 0) {
      this.props.cookies.set("url_list", url_list, {
        path: "/",
      });
    }
    console.log(deleted);

    const res = await axios.delete("shortner/delete", { data: deleted });
    console.log("list", url_list);
    console.log(res);
  };
  render() {
    return (
    <div className=" bg-stone-600  w-full flex justify-center ">
      <main className=" bg-stone-200 w-10/12 p-4 m-4 rounded-md shadow-sm">
        <UrlForm
          add_url_to_list={this.add_url_to_list}
          url_list={this.state.url_list}
        />
        <Sidebar
          url_list={this.state.url_list}
          delete_url_from_list={this.delete_url_from_list}
        />
        {Object.keys(this.props.cookies.cookies).length === 0 && (
          <CookiesBanner
            CreateCookie={this.props.CreateCookie}
            url_list={this.state.url_list}
          />
        )}
      </main>
    </div>);
  }
}

export default withCookies(Main);
