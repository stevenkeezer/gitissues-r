import React, { useState } from "react";
import IssueCard from "./IssueCard";
import { useField, splitFormProps } from "react-form";

export default function IssuesPage({ issues }) {
  const [searchName, setSearchName] = useState("");

  function issuesFilter(list, name) {
    let filteredList = list.filter(issue => issue.title.includes(name));
    return filteredList;
  }

  function handleOnChange(event) {
    setSearchName(event.target.value);
  }

  if (!issues) return "Error while loading API";
  return (
    <div className="container">
      <div className="issues-searchbar">
        <input
          placeholder="Search issue by name..."
          onChange={event => handleOnChange(event)}
        />
      </div>
      <div className="issues-cards">
        {issuesFilter(issues, searchName).map(issue => (
          <IssueCard issue={issue} />
        ))}
      </div>
      <div className="issues-form">

      </div>
    </div>
  );
}
