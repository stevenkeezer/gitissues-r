import React, { useState, useEffect, Component } from "react";
import { Card } from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";

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
      <form id="addComment" onSubmit={handleSubmit}>
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

  const removeComment = async (id, index) => {
    const url = `https://api.github.com/repos/stevenkeezer/gitissues-r/issues/comments/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${props.accessToken}`,
        Accept: "application/vnd.github.golden-comet-preview+json"
      }
    });
    console.log(response);
    // getComments();
    console.log(tasks, "tasks");
    let currenTasks = tasks.filter((el, idx) => idx !== index);
    console.log(currenTasks, "currenTasks");
    setTasks(currenTasks);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div className="todo-list mx-auto">
        <div className="commentHeader">
          <h2>Comments</h2>
        </div>
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
              <button
                id="removeBtn"
                onClick={() => removeComment(task.id, index)}
              >
                Remove
              </button>
            </Card>
          </div>
        ))}
        <AddTaskForm addTask={addTask} />
      </div>
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
