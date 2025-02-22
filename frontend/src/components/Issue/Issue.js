import React from "react";
import Nav from "../Nav/Nav";
import "./Issue.css";

class Issue extends React.Component {
  state = {
    header: <thead></thead>,
    books: [],
  };

  fetchData = () => {
    var sem = document.getElementById("select").value;
    this.setState({
      header: (
        <thead id="header">
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Semester No</th>
            <th scope="col"></th>
          </tr>
        </thead>
      ),
      books: [],
    });

    fetch(`http://localhost:3002/api/getBooks/${sem}`)
      .then((res) => res.json())
      .then((books) =>
        books.forEach((el) =>
          this.setState({
            books: [
              ...this.state.books,
              <tr key={el.idB}>
                <td>{el.name.toUpperCase()}</td>
                <td>{el.author}</td>
                <td>{el.semester}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => this.issueIt(el)}
                  >
                    Issue
                  </button>
                </td>
              </tr>,
            ],
          })
        )
      );
  };

  componentDidMount() {
    if (document.getElementById("id").value === "")
      document.getElementById("select").disabled = true;
    else document.getElementById("select").disabled = false;
  }

  issueIt = (el) => {
    fetch("http://localhost:3002/api/borrow", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...el,
        sid: parseInt(document.getElementById("id").value),
      }),
    });
  };

  render() {
    return (
      <div id="issue" className="text-center">
        <Nav
          title="You can Issue a Book Here!"
          description="Enter your student Id below"
        />
        <div className="issue-form">
          <input
            className="form-control sel"
            type="number"
            placeholder="Enter Student ID"
            id="id"
            min="1"
            onChange={this.componentDidMount}
          ></input>
          <select className="form-control sel" id="select">
            <option disabled>Select Semester</option>
            <option value="1">1st Sem</option>
            <option value="2">2nd Sem</option>
            <option value="3">3rd Sem</option>
            <option value="4">4th Sem</option>
            <option value="5">5th Sem</option>
            <option value="6">6th Sem</option>
            <option value="7">7th Sem</option>
            <option value="8">8th Sem</option>
          </select>
          <button className="btn" onClick={this.fetchData}>
            Submit
          </button>
        </div>
        <table id="results" className="table table-hover">
          {this.state.header}
          <tbody>{this.state.books}</tbody>
        </table>
      </div>
    );
  }
}

export default Issue;
