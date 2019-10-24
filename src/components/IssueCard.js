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

function IssueCard({ issue }) {
  return (
    <Card>
      <Card.Header>
        {issue.number} {issue.title}
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <Markdown>{issue.body.slice(250, 390)}</Markdown>
          <img alt="loser" width="50px" src={issue.user.avatar_url}></img>
          <a href={issue.user.html_url}>{issue.user.login}</a>
          <p>
            {issue.labels[0]
              ? issue.labels.map(label => {
                  return <Badge variant="success">{label.name}</Badge>;
                })
              : ""}
          </p>
          <Badge variant={issue.state === "open" ? "primary" : "danger"}>
            {issue.state}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IssueCard;
