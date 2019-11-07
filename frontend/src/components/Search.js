import React from "react";
import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search: "",
      isShow: false
    };
  }
  handleChange = event => {
    this.setState({ search: event.target.value });
  };
  starRepo(user, repo) {
    fetch(`http://localhost:3000/api/star?user=${user}&repo=${repo}`)
      .then(response => {
        this.receiveData();
      })
      .catch(error => {
        console.log(error);
      });
  }
  unstarRepo(user, repo) {
    fetch(`http://localhost:3000/api/unstar?user=${user}&repo=${repo}`)
      .then(response => {
        this.receiveData();
      })
      .catch(error => {
        console.log(error);
      });
  }
  receiveData() {
    const url = `http://localhost:3000/api/repo?q=${this.state.search}`;
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        this.setState({ items: json[0].items });
      } catch (error) {
        console.log(error);
      }
    };
    getData(url);
  }
  render() {
    const headerProducts = [
      "Star",
      "Unstar",
      "Name",
      "Owner",
      "Number Of Stars",
      "Number Of Forks"
    ].map((key, index) => <th key={index}> {key.toUpperCase()}</th>);
    const listProducts = this.state.items.map((repo, index) => (
      <tr key={index} className="repo-index">
        <td>
          <button
            onClick={e => {
              this.starRepo(repo.owner.login, repo.name);
            }}
          >
            Star
          </button>
        </td>
        <td>
          <button
            onClick={e => {
              this.unstarRepo(repo.owner.login, repo.name);
            }}
          >
            Unstar
          </button>
        </td>
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
            <button className="nav-button">
              <a className="nav-link" href="http://localhost:3000/api-docs">
                Use API with Swagger
              </a>
            </button>
          </p>
        </div>
        <div className="nav-search-container">
          <input
            type="text"
            placeholder="Search Repository"
            onChange={this.handleChange}
            className="nav-search"
          />
          <button
            className="nav-search-button"
            onClick={e => {
              this.receiveData();
              this.setState({ isShow: true });
            }}
          >
            <img
              className="img-button"
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzM0OThkYiI+PHBhdGggZD0iTTk1LjA0MjMyLDEwNi41NDgxOGwxNy43NzY2OSwxNy43NzY2OWMtMi43MTU1LDUuMTc5MDQgLTIuOTk1NDQsMTAuMzMwMDggLTAuMTM5OTgsMTMuMTg1NTVsMzIuNDQ1OTcsMzIuNDQ1OTdjNC4wODcyNCw0LjA4NzI0IDEyLjk4OTU4LDEuODQ3NjUgMTkuODIwMzEsLTUuMDExMDdjNi44NTg3MiwtNi44NTg3MiA5LjA5ODMxLC0xNS43MzMwNyA1LjAxMTA3LC0xOS44MjAzMWwtMzIuNDE3OTcsLTMyLjQ0NTk3Yy0yLjg4MzQ2LC0yLjg1NTQ3IC04LjAzNDUsLTIuNTc1NTIgLTEzLjIxMzU0LDAuMTExOThsLTE3Ljc3NjY5LC0xNy43NDg2OXpNNjAuOTE2NjcsMGMtMzMuNjQ5NzQsMCAtNjAuOTE2NjcsMjcuMjY2OTMgLTYwLjkxNjY3LDYwLjkxNjY3YzAsMzMuNjQ5NzQgMjcuMjY2OTMsNjAuOTE2NjcgNjAuOTE2NjcsNjAuOTE2NjdjMzMuNjQ5NzQsMCA2MC45MTY2NywtMjcuMjY2OTIgNjAuOTE2NjcsLTYwLjkxNjY3YzAsLTMzLjY0OTc0IC0yNy4yNjY5MiwtNjAuOTE2NjcgLTYwLjkxNjY3LC02MC45MTY2N3pNNjAuOTE2NjcsMTA3LjVjLTI1LjcyNzIyLDAgLTQ2LjU4MzMzLC0yMC44NTYxMiAtNDYuNTgzMzMsLTQ2LjU4MzMzYzAsLTI1LjcyNzIyIDIwLjg1NjEyLC00Ni41ODMzMyA0Ni41ODMzMywtNDYuNTgzMzNjMjUuNzI3MjIsMCA0Ni41ODMzMywyMC44NTYxMiA0Ni41ODMzMyw0Ni41ODMzM2MwLDI1LjcyNzIyIC0yMC44NTYxMiw0Ni41ODMzMyAtNDYuNTgzMzMsNDYuNTgzMzN6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
            ></img>
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
