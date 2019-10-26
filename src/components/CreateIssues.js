import React from "react";
import logo from "./img/logo.png";
import background from "./img/background.png";
import { Form, Button } from "react-bootstrap";

export default function HomePage(props) {
  return (
    <Form className="create-issues-form">
            <Form.Row>
            <Form.Control placeholder="Title" />
        </Form.Row>
        <Form.Row className="comment-control">
            <Form.Label>Write</Form.Label>
            <Form.Control placeholder="Leave a comment" />
            <Button>Phuc du</Button>
        </Form.Row>
    </Form>
  )
}