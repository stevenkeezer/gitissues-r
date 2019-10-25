import React, { Component } from "react";

import { Badge, Card } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function RepoCard(props) {
  console.log(props.repo);
  return (
    <Card className="mb-2">
      <Card.Header><a href={props.repo.owner.html_url}>{props.repo.owner.login}</a>/<a href={props.repo.html_url}>{props.repo.name}</a></Card.Header>
      <Card.Body>
        <Card.Title>{props.repo.description}</Card.Title>
        <Card.Text>
          <p>
            {" "}
            <FontAwesomeIcon icon={faStar} />{" "}
            {props.repo.stargazers_count > 1000
              ? Math.round(props.repo.stargazers_count / 1000) + "k"
              : props.repo.stargazers_count}{" "}
          </p>
          {props.repo.license && (
            <Badge variant="primary">{props.repo.license.name}</Badge>
          )}
          {"Updated at "}
          <Moment fromNow>{props.repo.updated_at}</Moment>
          {/* <Badge variant={repo.state === "open" ? "primary" : "danger"}>
            {repo.state}
          </Badge> */}
          <br></br>
          <button onClick={() => {
            props.setIssueName(props.repo.full_name)
            props.setShowIssues(true)
            }} >Click me</button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;
