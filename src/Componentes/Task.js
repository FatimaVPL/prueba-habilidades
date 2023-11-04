import React, { useState } from "react";

const Tareas = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(task.id, editedText);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span>{task.text}</span>
      )}
      {task.completed ? null : (
        <button onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? "Guardar" : "Editar"}
        </button>
      )}
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Task;
