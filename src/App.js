import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import RepoPage from "./components/RepoPage"; 
import MainSideBar from "./components/MainSideBar";
import IssuesPage from "./components/IssuesPage";
import CommentSection from "./components/CommentSection";
import "./App.css";

const clientId = "57091af873a54cbc4d71";
const secretKey = "95ac48be7ce1ae15a7a616b0bda3150003e7176f";

function App() {
  const [allIssues, setAllIssues] = useState([]);
  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showIssues, setShowIssues] = useState(true);
  const [repo, setRepo] = useState([]);
  const [totalSearchResult, setTotalSearchResult] = useState(0);
  const [issueName, setIssueName] = useState("react-native-community/react-native-navbar")
  const getComments = async () => {
    const url =
      "https://api.github.com/repos/stevenkeezer/weatherAppReact/issues/comments";
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
  };

  const postComments = async () => {
    // let data = new URLSearchParams();
    const url =
      "https://api.github.com/repos/stevenkeezer/weatherAppReact/issues/2/comments";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token c240e4198a36c78f514c344cc5955641d7348b17`
      },
      body: { body: "this is a new comment" },
      json: true
    });
    console.log(response);
  };

  const getIssues = async () => {
    const url = `https://api.github.com/repos/${issueName}/issues`;
    const result = await fetch(url);
    const data = await result.json();
    console.log(data)
    setIssues(data);
    setAllIssues(data);
  };

  const search = async page => {
    const url = `https://api.github.com/search/repositories?q=${searchInput}&page=${page}`;
    const result = await fetch(url);
    const data = await result.json();
    setTotalSearchResult(Math.round(data.total_count/30));
    setRepo(data.items);
    setShowIssues(false); 
  };

  const handleChange = input => {
    setSearchInput(input);
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
    postComments();
    getComments();
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
      {// <CommentSection />}
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
