import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Badge,
  Form,
  Card,
  Button,
  Container,
  Row,
  Col
} from "react-bootstrap";
import Markdown from "markdown-to-jsx";

import MainSideBar from "./components/MainSideBar";
import IssuesPage from "./pages/IssuesPage";

import "./App.css";

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [issues, setIssues] = useState([]);
  // const checkLabel = issues[0].labels[0].name;
  // const [searchInput, setSearchInput] = useState("");

  const getIssues = async () => {
    const url = "https://api.github.com/repos/facebook/react/issues";
    const result = await fetch(url);
    const data = await result.json();
    setIssues(data);
    console.log(data);
    // console.log(searchInput);
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
              <Form.Control size="lg" type="text" placeholder="Search" />
              {/* <Button>Search</Button> */}
              {/* <br></br> */}
              {/* <Button>New Issues</Button> */}
              <IssuesPage issues={issues} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
