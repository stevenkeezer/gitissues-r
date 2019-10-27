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
      <Card.Header className="header-card">
        <Col>
          #{props.issue.number} {props.issue.title}
          <br></br>
          Opened by
          <a className="name-profile" href={props.issue.user.html_url}>
            {props.issue.user.login}
          </a>
        </Col>
        <div
          style={{ marginRight: "50px", marginTop: "2px", cursor: "pointer" }}
          onClick={handleClick}
        >
          <span aria-label="img" role="img">
            💬
          </span>
        </div>
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
