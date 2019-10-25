import React, { useState, useEffect, Component } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ellipsisH from "@iconify/icons-fa-solid/ellipsis-h";

import "./CommentSection.css";

function CommentsSection() {
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

  const [tasks, setTasks] = useState([
    {
      name: "unifcornsprise",
      text:
        "This is a great repo there is nothing i would change, you are greatest developer",
      isCompleted: false
    },
    {
      name: "stevenWasHere",
      text:
        "This repo is trash, you should be embarrased, this repo belongs in hell!",
      isCompleted: false
    },
    {
      name: "BigguyRoy",
      text:
        "Not enough cats, please add more cat elements to the repo. I have made a push request and you will accept it",
      isCompleted: false
    }
  ]);

  const addTask = text => setTasks([...tasks, { text }]);

  const toggleTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="todo-list mx-auto">
      {tasks.map((task, index) => (
        <div className="todo">
          <Card>
            <Card.Header>{task.name}</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text
                onClick={() => toggleTask(index)}
                className={
                  task.isCompleted ? "todo-text todo-completed" : "todo-text"
                }
              >
                {task.text}
              </Card.Text>
            </Card.Body>
          </Card>
          <button onClick={() => removeTask(index)}>Remove</button>
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
