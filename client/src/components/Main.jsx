import React, { Component } from "react";
import UrlForm from "./UrlForm";
import Sidebar from "./Sidebar";
import { withCookies, Cookies } from "react-cookie";
class Main extends Component {
  state = { url_list: this.props.cookies.get("url_list") || [] };
  // componentWillMount() {
  //   const { cookies } = this.props;
  //   this.setState({ url_list: cookies.get("url_list") || [] });
  // }
  add_url_to_list = (url) => {
    const url_list = [...this.state.url_list];
    url_list.push(url);
    this.setState({ url_list });
    this.props.cookies.set("url_list", url_list, {
      path: "/",
    });
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
      </main>
    );
  }
}

export default withCookies(Main);
