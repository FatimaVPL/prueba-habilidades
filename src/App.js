import React, { useState } from 'react';
import TaskList from './Componentes/TaskList';
import TaskForm from './Componentes/TaskForm'

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'pending') {
      return !task.completed;
    } else {
      return task.completed;
    }
  });

  return (
    <div className="App">
      <h1>Tareas</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
      <div>
        <button onClick={() => filterTasks('all')}>Todas</button>
        <button onClick={() => filterTasks('pending')}>Pendientes</button>
        <button onClick={() => filterTasks('completed')}>Completadas</button>
      </div>
    </div>
  );
}

export default App;