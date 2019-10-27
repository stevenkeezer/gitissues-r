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
    // console.log(url, "url", data, "data");
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
    // console.log(response);
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
          className="input-comment-content"
          type="text"
          value={value}
          placeholder="Enter a comment…"
          onChange={e => setValue(e.target.value)}
        />
        <button className="btn-enter-comment" type="submit">
          Enter
        </button>
      </form>
    );
  };

  const [tasks, setTasks] = useState([]);

  const addTask = text => {
    postComment(text);
  };

  const removeComment = async (id, login) => {
    if (props.propsRepoUrl.includes(login)) {
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
    } else {
      alert("You cant modify that comment");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="todo-list mx-auto">
      <h2>Comments</h2>
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
          <button onClick={() => removeComment(task.id, task.user.login)}>
            🗑️ Remove
          </button>
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
