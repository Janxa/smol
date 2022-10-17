import React, { Component } from "react";
import UrlForm from "./UrlForm";
import Sidebar from "./Sidebar";
import { withCookies, Cookies } from "react-cookie";
import CookiesBanner from "./Cookies";
class Main extends Component {
  state = { url_list: this.props.cookies.get("url_list") || [] };
  componentDidMount = () => {
    console.log(this.props.cookies);
  };
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
  delete_url_from_list = (id) => {
    const url_list = [...this.state.url_list];
    let deleted = url_list.splice(id, 1);

    this.setState({ url_list });
    console.log("list", url_list);
  };
  render() {
    return (
      <main>
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
    );
  }
}

export default withCookies(Main);
