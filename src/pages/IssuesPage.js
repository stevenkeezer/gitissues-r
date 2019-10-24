import React from "react";
import IssueCard from "../components/IssueCard";

export default function IssuesPage({ issues }) {
  return (
    <div>
      {issues.map(issue => (
        <IssueCard issue={issue} />
      ))}
    </div>
  );
}
