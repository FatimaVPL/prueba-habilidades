import React, { useState, useEffect } from 'react';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [visibleTasks, setVisibleTasks] = useState([]);

  useEffect(() => {
    if (filter === 'all') {
      setVisibleTasks(tasks);
    } else if (filter === 'pending') {
      setVisibleTasks(tasks.filter((task) => !task.completed));
    } else {
      setVisibleTasks(tasks.filter((task) => task.completed));
    }
  }, [filter, tasks]);

  
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

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };
  
  return (
    <div className="App">
      <h1>Lista de tareas</h1>
      <TaskForm addTask={addTask} />
      <p>Tareas: {visibleTasks.length}</p> 
      <TaskList
        tasks={visibleTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />
      <div>
        <button onClick={() => filterTasks('all')}>Todas</button>
        <button onClick={() => filterTasks('pending')}>Pendientes</button>
        <button onClick={() => filterTasks('completed')}>Completedas</button>
      </div>
    </div>
  );
  
}

export default App;