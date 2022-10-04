import React, { Component } from "react";
import UrlForm from "./UrlForm";
import Sidebar from "./Sidebar";
class Main extends Component {
  state = { url_list: [] };
  add_url_to_list = (url) => {
    const url_list = [...this.state.url_list];
    url_list.push(url);
    this.setState({ url_list });
    console.log("liist", url_list);
  };
  delete_url_from_list = (id) => {
    const url_list = [...this.state.url_list];
    let deleted = url_list.splice(id, 1);

    this.setState({ url_list });
    console.log("liist", url_list);
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

export default Main;
