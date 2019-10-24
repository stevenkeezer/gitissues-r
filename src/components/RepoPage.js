import React from "react";
import RepoCard from "../components/RepoCard";

export default function RepoPage(props) {
  return (
    <div>
      {props.repo.map(repo => (
        <RepoCard repo={repo} />
      ))}
    </div>
  );
}
