import React, { useState } from "react";
import IssueCard from "./IssueCard";

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
    <div className="container">
      <div className="issues-searchbar">
        <input
          placeholder="Search issue by name..."
          onChange={event => handleOnChange(event)}
        />
      </div>
      <div className="issues-cards">
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
