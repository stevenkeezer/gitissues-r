import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonToolbar
} from "react-bootstrap";
import NewIssueModal from "./components/NewIssueModal";
import Markdown from "markdown-to-jsx";
import RepoPage from "./components/RepoPage";
import MainSideBar from "./components/MainSideBar";
import IssuesPage from "./components/IssuesPage";
import CommentSection from "./components/CommentSection";
import HomePage from "./components/HomePage";
import "./App.css";

const clientId = "57091af873a54cbc4d71";

function App() {
  const [allIssues, setAllIssues] = useState([]);
  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showIssues, setShowIssues] = useState(true);
  const [repo, setRepo] = useState([]);
  const [totalSearchResult, setTotalSearchResult] = useState(0);
  const [issueName, setIssueName] = useState(
    "react-native-community/react-native-navbar"
  );
  const [modalShow, setModalShow] = React.useState(false);

  const getIssues = async () => {
    const url = `https://api.github.com/repos/${issueName}/issues`;
    const result = await fetch(url);
    const data = await result.json();
    setIssues(data);
    console.log(data);
    setAllIssues(data);
  };

  const search = async page => {
    const url = `https://api.github.com/search/repositories?q=${searchInput}&page=${page}`;
    const result = await fetch(url);
    const data = await result.json();
    setTotalSearchResult(Math.round(data.total_count / 30));
    setRepo(data.items);
    setShowIssues(false);
  };

  const handleChange = input => {
    setSearchInput(input);
  };

  const findOnPage = term => {
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
    // postComment();
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
      <HomePage />
      <CommentSection />
      {
        <ButtonToolbar>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            New Issue
          </Button>

          <NewIssueModal show={modalShow} onHide={() => setModalShow(false)} />
        </ButtonToolbar>
      }
      <Container>
        <Row>
          <div className="inputContainer m-3">
            <input
              name="search"
              type="text"
              onChange={event => handleChange(event.target.value)}
              className="form-control input-lg"
              placeholder="Search Issue..."
            />
            <Button onClick={() => search()}>Search</Button>
          </div>
          <Col>
            <Row>
              {showIssues ? (
                <IssuesPage issues={issues} />
              ) : (
                <RepoPage
                  search={search}
                  repo={repo}
                  totalSearchResult={totalSearchResult}
                  setTotalSearchResult={setTotalSearchResult}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setIssueName={setIssueName}
                  setShowIssues={setShowIssues}
                />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

{
  /* <input
                name="search"
                width="30px"
                type="text"
                id="findOnPage"
                onChange={event => findOnPage(event.target.value)}
                className="form-control input-lg"
                placeholder="Find on page..."
              /> */
}
