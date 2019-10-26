import React, { Component } from "react";

import { Badge, Card } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function RepoCard(props) {
  return (
    <Card className="mb-2 repo-card">
      <Card.Header>👽 <a href={props.repo.owner.html_url}>{props.repo.owner.login}</a> / <a href={props.repo.html_url}>{props.repo.name}</a>
      {props.repo.license && (
            <Badge variant="primary">{props.repo.license.name}</Badge>
          )}
      </Card.Header>
      <Card.Body>
        <Card.Title>📃 {props.repo.description}</Card.Title>
        <Card.Text>
          <p className="stargazers-counts">
            {" "}
            <FontAwesomeIcon icon={faStar} />{" "}
            {props.repo.stargazers_count > 1000
              ? Math.round(props.repo.stargazers_count / 1000) + "k"
              : props.repo.stargazers_count}{" "}
          </p>
          <hr></hr>
          {"⏱️ Updated at "}
          <Moment fromNow>{props.repo.updated_at}</Moment>
          {/* <Badge variant={repo.state === "open" ? "primary" : "danger"}>
            {repo.state}
          </Badge> */}
          <br></br>
          <button className="click-me" onClick={() => {
            props.setIssueName(props.repo.full_name)
            props.setShowIssues(true)
            props.setShowRepo(false)
            }} >Click me</button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;
