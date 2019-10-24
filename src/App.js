import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Markdown from "markdown-to-jsx";

import MainSideBar from "./components/MainSideBar";
import IssuesPage from "./pages/IssuesPage";

import "./App.css";

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [allIssues, setAllIssues] = useState([]);
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("ll");
  // const [searchInput, setSearchInput] = useState("");

  const getIssues = async () => {
    const url = "https://api.github.com/repos/facebook/react/issues";
    const result = await fetch(url);
    const data = await result.json();
    setIssues(data);
    setAllIssues(data);

    // console.log(searchInput);
  };

  const search = async searchTerm => {
    // const url =
    //   "https://api.github.com/search/repositories?sort=stars&order=desc&q=${searchTerm}&language=assembly";
    // const result = await fetch(url);
    // const data = await result.json();
    console.log(searchTerm);
  };

  const findOnPage = term => {
    // console.log(term);
    if (term === "") {
      setIssues(allIssues);
    } else {
      const filteredIssues = issues.filter(issue => {
        if (issue.title.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
        return false;
      });
      setIssues(filteredIssues);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      // console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      // this.state = {
      //   token: accessToken
      // };
    }

    if (existingToken) {
      // this.state = {
      //   token: existingToken
      // };
    }
  });
  return (
    <div className="App">
      <MainSideBar />
      <Container>
        <Row>
          <Col>
            <Row>
              <input
                name="search"
                type="text"
                onAfterChange={event => search(event.target.value)}
                className="form-control input-lg"
                placeholder="Search Issue..."
              />
              <Button onClick={() => search()}>Search</Button>

              {/* <input
                name="search"
                width="30px"
                type="text"
                id="findOnPage"
                onChange={event => findOnPage(event.target.value)}
                className="form-control input-lg"
                placeholder="Find on page..."
              /> */}
              <IssuesPage issues={issues} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
