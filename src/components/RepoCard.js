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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function RepoCard(props) {
  return (
    <Card>
      <Card.Header>{props.repo.full_name}</Card.Header>
       <Card.Body>
        <Card.Title>{props.repo.description}</Card.Title>
        <Card.Text>
          <p> <FontAwesomeIcon icon={faStar} /> {props.repo.stargazers_count > 1000 ? Math.round(props.repo.stargazers_count/1000)+"k" : props.repo.stargazers_count} </p>
          <Badge variant="primary">{props.repo.language}</Badge>
          {props.repo.license && <Badge variant="primary">{props.repo.license.name}</Badge>}
          {"Updated at "}<Moment fromNow>{props.repo.updated_at}</Moment>
          {/* <Badge variant={repo.state === "open" ? "primary" : "danger"}>
            {repo.state}
          </Badge> */}
          <br></br>
          <button>Click me</button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;
