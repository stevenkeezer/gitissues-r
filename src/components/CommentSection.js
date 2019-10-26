import React, { useState, useEffect, Component } from "react";
import { Card } from "react-bootstrap";

import "./CommentSection.css";

function CommentsSection(props) {
  // console.log(props);
  const getComments = async () => {
    const url = `${props.propsRepoUrl}/issues/${props.commentId}/comments`;
    const result = await fetch(url);
    const data = await result.json();
    setTasks(data);
  };

  const postComment = async comment => {
    const url = `${props.propsRepoUrl}/issues/${props.commentId}/comments`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${props.accessToken}`,
        Accept: "application/vnd.github.golden-comet-preview+json"
      },
      body: JSON.stringify({ body: `${comment}` })
    });
    getComments();
  };

  const AddTaskForm = ({ addTask }) => {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
      value && addTask(value);
      setValue("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          placeholder="Enter a comment…"
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    );
  };

  const [tasks, setTasks] = useState([]);

  const addTask = text => {
    postComment(text);
  };

  const removeComment = async id => {
    const url = `${props.propsRepoUrl}/issues/comments/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${props.accessToken}`,
        Accept: "application/vnd.github.golden-comet-preview+json"
      }
    });
    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="todo-list mx-auto">
      Comments
      {tasks.length < 1 && <div>Be the first one to add a comment</div>}
      {tasks.map((task, index) => (
        <div className="todo">
          <Card>
            <Card.Header>
              <img alt="blah" width="50px" src={task.user.avatar_url}></img>{" "}
              {task.user.login}
            </Card.Header>
            <Card.Body>
              <Card.Text>{task.body}</Card.Text>
            </Card.Body>
          </Card>
          <button onClick={() => removeComment(task.id)}>Remove</button>
        </div>
      ))}
      <AddTaskForm addTask={addTask} />
    </div>
  );
}

export default CommentsSection;

// <span
//   onClick={() => toggleTask(index)}
//   className={task.isCompleted ? "todo-text todo-completed" : "todo-text"}
// >
//   {task.text}
// </span>;
