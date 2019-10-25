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
import Moment from 'react-moment';


function RepoCard(props) {
  return (
    <Card>
      <Card.Header>{props.repo.full_name}</Card.Header>
       <Card.Body>
        <Card.Title>{props.repo.description}</Card.Title>
        <Card.Text>
          <Badge variant="primary">{props.repo.language}</Badge>
          {props.repo.license && <Badge variant="primary">{props.repo.license.name}</Badge>}
          {"Updated at "}<Moment fromNow ago>{props.repo.updated_at}</Moment>
          {/* <Badge variant={repo.state === "open" ? "primary" : "danger"}>
            {repo.state}
          </Badge> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;
