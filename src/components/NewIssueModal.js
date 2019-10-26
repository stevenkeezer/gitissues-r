import React, { useState } from "react";
import {Modal, Button} from "react-bootstrap";

function NewIssueModal(props) {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")


  const postIssue = async () => {
    const url =
      `https://api.github.com/repos/${props.repoToCreateIssue}/issues`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${props.accessToken}`,
        Accept: "application/vnd.github.golden-comet-preview+json"
      },
      body: JSON.stringify({ title: `${title}`, body: `${content}`, labels: ["bug"] })
    });
  };

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }


  const handleClose = () => {
    props.setShowCreateIssues(false)
  }

  const handlePosting = () => {
    postIssue()
    props.setShowCreateIssues(false)
  }


  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body className="createIssueModal">
          <input placeholder="Title" onChange={event => handleTitle(event)}></input>
          <label>Write</label>
          <input placeholder="Write down your issues" onChange={event => handleContent(event)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePosting}>
            Summit new Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewIssueModal;
