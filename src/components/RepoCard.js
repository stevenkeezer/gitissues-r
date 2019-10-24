import React, { Component } from "react";
import {
  Badge,
  Form,
  Card,
  Button,
  Container,
  Row,
  Col
} from "react-bootstrap";
import Markdown from "markdown-to-jsx";

function RepoCard(props) {
  return (
    <Card>
      <Card.Header>{props.repo.full_name}</Card.Header>
      {/* <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <Markdown>{repo.body.slice(250, 390)}</Markdown>
          <img alt="loser" width="50px" src={repo.user.avatar_url}></img>
          <a href={repo.user.html_url}>{repo.user.login}</a>
          <p>
            {repo.labels[0]
              ? repo.labels.map(label => {
                  return <Badge variant="success">{label.name}</Badge>;
                })
              : ""}
          </p>
          <Badge variant={repo.state === "open" ? "primary" : "danger"}>
            {repo.state}
          </Badge>
        </Card.Text>
      </Card.Body> */}
    </Card>
  );
}

export default RepoCard;
