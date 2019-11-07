import React from "react";
import "./Bookmarks.css";

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: ""
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    const url = `http://localhost:3000/api/user`;
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        this.setState({ user: json.login });
      } catch (error) {
        console.log(error);
      }
    };
    getData(url);
  }
  listBookmarks() {
    const url = `http://localhost:3000/api/bookmarks?user=${this.state.user}`;
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        this.setState({ items: json });
      } catch (error) {
        console.log(error);
      }
    };
    getData(url);
  }
  render() {
    const headerProducts = [
      "Name",
      "Owner",
      "Number Of Stars",
      "Number Of Forks"
    ].map((key, index) => <th key={index}> {key.toUpperCase()}</th>);
    const listProducts = this.state.items.map((repo, index) => (
      <tr key={index} className="repo-index">
        <td>{repo.name}</td>
        <td>{repo.owner.login}</td>
        <td>{repo.stargazers_count}</td>
        <td>{repo.forks_count}</td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="nav-container">
          <p className="nav-container-left">User Authorized</p>
          <p className="nav-container-right">
            <a className="nav-link" href="http://localhost:3000/api-docs">
              Use API with Swagger
            </a>
          </p>
        </div>
        <div className="nav-search-container">
          <button
            className="nav-search-button"
            onClick={e => {
              this.listBookmarks();
            }}
          >
            Get All Bookmarks from {this.state.user}
          </button>
        </div>
        <div className="nav-list-products">
          <table id="products">
            <thead
              className={
                this.state.items.length === 0
                  ? "products-header-none"
                  : "products-header-show"
              }
            >
              <tr>{headerProducts}</tr>
            </thead>
            <tbody>{listProducts}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
