import React, { useState, useEffect } from "react";
import data from "./data.json";

const ToDo = () => {
  const [todoList, setTodoList] = useState(data);
  const [newTask, setNewTask] = useState("");

  const taskInput = React.createRef();
  useEffect(() => {
    taskInput.current.focus();
  }, [taskInput]);
  const handleToggle = (id) => {
    const updatedList = todoList.map((list) => {
      list.complete = list.id === id ? !list.complete : list.complete;
      return list;
    });
    setTodoList(updatedList);
  };

  const remainingTasks = () => {
    let remainingTaskCount = todoList.length;
    for (const list of todoList) {
      remainingTaskCount = list.complete
        ? remainingTaskCount - 1
        : remainingTaskCount;
    }
    return remainingTaskCount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit");

    if (!newTask) return;

    const newTaskObject = {
      id: todoList.length + 1,
      task: newTask,
      complete: false,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTaskObject);
    setTodoList(newTodoList);
    setNewTask("");
  };

  const handleChange = (e) => {
    setNewTask(e.currentTarget.value);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            ref={taskInput}
            type="text"
            id="newTask"
            placeholder="Add Task..."
            onChange={handleChange}
            value={newTask}
          ></input>
          <input type="submit"></input>
        </form>
      </div>
      <div>
        {remainingTasks()} of {todoList.length} tasks remaining
      </div>

      <ul>
        {todoList.map((list) => (
          <li
            className={list.complete ? "strike" : ""}
            onClick={() => handleToggle(list.id)}
            key={list.id}
          >
            {list.task}
          </li>
        ))}
      </ul>
      <pre>
        <a
          href="https://github.com/manishkatyan/react-toolkit/blob/master/src/components/todo/todo.jsx"
          rel="noreferrer"
          target="_blank"
        >
          Source Code
        </a>
      </pre>
    </>
  );
};

export default ToDo;
