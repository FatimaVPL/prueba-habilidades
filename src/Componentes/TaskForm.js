import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState({ name: '', description: '', dueDate: '', completed: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name) {
      addTask({ ...task, id: Date.now() });
      setTask({ name: '', description: '', dueDate: '', completed: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={task.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleInputChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
