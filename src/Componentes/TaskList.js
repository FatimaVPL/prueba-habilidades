import React, { useState } from 'react';

function TaskList({ tasks, deleteTask, toggleComplete, editTask }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    if (!task.completed) {
      setEditingTask(task);
    }
  };

  const handleSave = (task) => {
    editTask(task);
    setEditingTask(null);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  const confirmDelete = (task) => {
    const shouldDelete = window.confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.name}"?`);
    if (shouldDelete) {
      deleteTask(task.id);
    }
  };

  const isOverdue = (dueDate) => {
    const currentDate = new Date().toISOString().split('T')[0];
    return dueDate < currentDate;
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          {editingTask === task ? (
            <div>
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleSave({ ...task, name: e.target.value })}
              />
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleSave({ ...task, description: e.target.value })}
              />
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => handleSave({ ...task, dueDate: e.target.value })}
              />
              <button onClick={() => handleSave(task)}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          ) : (
            <div>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: isOverdue(task.dueDate) && !task.completed ? 'red' : 'black' }}>
                {task.name} - {task.description} - {task.dueDate}
              </span>
              {!task.completed && (
                <button onClick={() => handleEdit(task)}>Editar</button>
              )}
              <button onClick={() => confirmDelete(task)}>Borrar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
