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
    <Card className="mb-2">
      <Card.Header className="header-card">
        #{issue.number} {issue.title}
        <Badge
          className="status-badge"
          variant={issue.state === "open" ? "primary" : "danger"}
        >
          {issue.state}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <Markdown>{issue.body.slice(250, 350)}</Markdown>
          <br></br>
          <hr></hr>
          <div class="second-body-card">
            <div>
              <img
                className="profile-img"
                alt="loser"
                src={issue.user.avatar_url}
              ></img>
              <a className="name-profile" href={issue.user.html_url}>
                {issue.user.login}
              </a>
            </div>
            <div>
              <p>
                {issue.labels[0]
                  ? issue.labels.map(label => {
                      return (
                        <Badge
                          className="condition-badge"
                          style={{ backgroundColor: `#${label.color}` }}
                        >
                          {label.name}
                        </Badge>
                      );
                    })
                  : ""}
              </p>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IssueCard;
