import React from "react";
import IssueCard from "./IssueCard";

export default function IssuesPage({ issues }) {
  if(!issues) return "Error while loading API";
  return (
    <div>
      {issues.map(issue => (
        <IssueCard issue={issue} />
      ))}
    </div>
  );
} 