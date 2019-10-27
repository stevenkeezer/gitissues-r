import React, { useState } from "react";
import IssueCard from "./IssueCard";
import Button from "react-bootstrap/Button";

export default function IssuesPage(props) {
  const [searchName, setSearchName] = useState("");

  function issuesFilter(list, name) {
    let filteredList = list.filter(issue => issue.title.includes(name));
    return filteredList;
  }

  function handleOnChange(event) {
    setSearchName(event.target.value);
  }

  if (!props.issues) return "Error while loading API";
  return (
    <div className="issue-container">
      <h1 id="issueBanner">All Issues</h1>
      <div className="input-group pt-4 mx-auto">
        <div className="issues-searchbar mx-auto">
          <input
            className="search-issue-input"
            placeholder="Search issue by name..."
            onChange={event => handleOnChange(event)}
          />
        </div>
        <Button
          className="btn-new-issue"
          onClick={() => props.setShowCreateIssues(true)}
        >
          + Create New Issue
        </Button>
      </div>
      <div className="issue-cards mx-auto">
        {issuesFilter(props.issues, searchName).map(issue => (
          <IssueCard
            setShowComments={props.setShowComments}
            setShowIssues={props.setShowIssues}
            setCommentId={props.setCommentId}
            setPropsRepoUrl={props.setPropsRepoUrl}
            issue={issue}
          />
        ))}
      </div>
    </div>
  );
}
