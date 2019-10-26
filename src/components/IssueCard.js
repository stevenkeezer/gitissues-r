import React, { useState, Component } from "react";
import { Badge, Card, Col } from "react-bootstrap";
import Markdown from "markdown-to-jsx";

function IssueCard(props) {
  const handleClick = () => {
    props.setShowIssues(false);
    props.setShowComments(true);
    props.setCommentId(props.issue.number);
    props.setPropsRepoUrl(props.issue.repository_url);
  };

  return (
    <Card className="mb-2 issue-card">
      <Card.Header onClick={handleClick} className="header-card">
        <Col>
          #{props.issue.number} {props.issue.title}
          <br></br>
          <a className="name-profile" href={props.issue.user.html_url}>
            Opened by {props.issue.user.login}
          </a>
        </Col>

        <Badge
          className="status-badge"
          variant={props.issue.state === "open" ? "primary" : "danger"}
        >
          {props.issue.state}
        </Badge>
      </Card.Header>
      <Card.Body id="issueCardBody">
        <Card.Title></Card.Title>
        <Card.Text>
          <br></br>
          <hr></hr>
          <div class="second-body-card">
            <div></div>
            <div></div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IssueCard;
