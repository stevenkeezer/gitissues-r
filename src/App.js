import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
import MainNavbar from "./components/MainNavbar";
import Loader from "react-loader-spinner";

import "./App.css";

const clientId = "57091af873a54cbc4d71";

function App() {
  const [allIssues, setAllIssues] = useState([]);
  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showIssues, setShowIssues] = useState(false);
  const [showRepo, setShowRepo] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [propRepoUrl, setPropsRepoUrl] = useState(null);
  const [repo, setRepo] = useState([]);
  const [totalSearchResult, setTotalSearchResult] = useState(0);
  const [issueName, setIssueName] = useState(
    "react-native-community/react-native-navbar"
  );
  const [token, setToken] = useState("");
  const [showCreateIssues, setShowCreateIssues] = useState(false);
  const [repoToCreateIssue, setRepoToCreateIssue] = useState(
    "stevenkeezer/gitissues-r"
  );

  const getIssues = async () => {
    const url = `https://api.github.com/repos/${issueName}/issues`;
    const result = await fetch(url);
    const data = await result.json();
    setIssues(data);
    // console.log('data',data);
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
    // console.log("User Searching", input);
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
  }, [issueName]);

  useEffect(() => {
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;
    // console.log("accessToken", accessToken && accessToken.split("&")[0]);
    // console.log("existingToken");
    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      // console.log(`New accessToken: ${accessToken}`);
      setToken(accessToken.split("&")[0]);
      // sessionStorage.setItem("token", accessToken);
    }

    // this.state = {
    //   token: accessToken
    // };

    if (existingToken) {
      setToken(existingToken.split("&")[0]);
      // sessionStorage.setItem("token", existingToken);
      // this.state = {
      //   token: existingToken
      // };
    }
  }, []);
  if (issues.length === 0) {
    return (
      <div>
        <Loader
          className="spinner"
          type="TailSpin"
          color="#00BFFF"
          height={50}
          width={50}
          // timeout={3000} //3 secs
        />
      </div>
    );
  }
  return (
    <div className="App">
      {!showComments && !showIssues && !showRepo && (
        <HomePage search={search} handleChange={handleChange} />
      )}
      {showComments && (
        <MainNavbar
          setShowIssues={setShowIssues}
          setShowComments={setShowComments}
          setShowRepo={setShowRepo}
        />
      )}
      {showIssues && (
        <MainNavbar
          setShowIssues={setShowIssues}
          setShowComments={setShowComments}
          setShowRepo={setShowRepo}
        />
      )}
      {showRepo && (
        <MainNavbar
          setShowIssues={setShowIssues}
          setShowComments={setShowComments}
          setShowRepo={setShowRepo}
        />
      )}
      <Container>
        <Row>
          <Col>
            <Row>
              {showCreateIssues && (
                <NewIssueModal
                  accessToken={token}
                  setShowCreateIssues={setShowCreateIssues}
                  repoToCreateIssue={issueName}
                  getIssues={getIssues}
                />
              )}
              {showComments && (
                <CommentSection
                  issues={issues}
                  commentId={commentId}
                  accessToken={token}
                  propsRepoUrl={propRepoUrl}
                />
              )}
              {showIssues && (
                <IssuesPage
                  setShowIssues={setShowIssues}
                  setShowComments={setShowComments}
                  issues={issues}
                  setCommentId={setCommentId}
                  setPropsRepoUrl={setPropsRepoUrl}
                  setShowCreateIssues={setShowCreateIssues}
                />
              )}
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
