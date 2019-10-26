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
  const [showIssues, setShowIssues] = useState(false);
  const [showRepo, setShowRepo] = useState(false);
  const [repo, setRepo] = useState([]);
  const [totalSearchResult, setTotalSearchResult] = useState(0);
  const [issueName, setIssueName] = useState("react-native-community/react-native-navbar");
  const [token, setToken] = useState("");

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
    setShowRepo(true);
    setShowIssues(false);
  };

  const handleChange = input => {
    console.log("User Searching", input);
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
    console.log("accessToken",accessToken && accessToken.split("&")[0])
    console.log("existingToken", )
    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
        );
      }

      if (accessToken) {
        // console.log(`New accessToken: ${accessToken}`);
        setToken(accessToken.split("&")[0])
      }

      sessionStorage.setItem("token", token);
      // this.state = {
      //   token: accessToken
      // };

    if (existingToken) {
      setToken(accessToken.split("&")[0])
      // this.state = {
      //   token: existingToken
      // };
    }
  });
  return (
    <div className="App">

      {/* <CommentSection
        accessToken={token}
      />*/}

      {!showIssues && !showRepo && (
        <HomePage search={search} handleChange={handleChange} />
      )}
      {
        // <MainSideBar />
        // <CommentSection />

      }
      <Container>
        <Row>
          <Col>
            <Row>
              {showIssues && <IssuesPage issues={issues} />}
              {showRepo && (
                <RepoPage
                  search={search}
                  repo={repo}
                  totalSearchResult={totalSearchResult}
                  setTotalSearchResult={setTotalSearchResult}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setIssueName={setIssueName}
                  setShowIssues={setShowIssues}
                  setShowRepo={setShowRepo}
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
