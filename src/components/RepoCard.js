import React, { Component } from "react";
import { Badge, Card } from "react-bootstrap";

function RepoCard(props) {
  return (
    <Card className="mb-2">
      <Card.Header>
        #{props.repo.owner.id} {props.repo.full_name}
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          {/* <Markdown></Markdown> */}
          <p>{props.repo.created_at}</p>
          <img alt="loser" width="50px" src={props.repo.owner.avatar_url}></img>
          <a href={props.repo.html_url}>{props.repo.owner.login}</a>
          {/* <p>
            {repo.labels[0]
              ? repo.labels.map(label => {
                  return <Badge variant="success">{label.name}</Badge>;
                })
              : ""}
          </p> */}
          <Badge></Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;
