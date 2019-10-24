import React, { useEffect, useState } from "react";
import MainSideBar from "./components/MainSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import "./App.css";

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    const url = "https://api.github.com/repos/facebook/react/issues";
    const result = await fetch(url);
    const data = await result.json();
    setIssues(data);
    console.log(data);
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
            {issues.map(issue => {
              return (
                <Card>
                  <Card.Header>
                    {issue.number} {issue.title}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                      {issue.body}
                      <a href="/">{issue.user.login}</a>
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
