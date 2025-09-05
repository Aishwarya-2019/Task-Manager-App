// src/components/Tasks/TaskItem.jsx
import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { formatDateForDisplay } from '../../utils/helpers';

export default function TaskItem({ task }) {
  const { updateTask, deleteTask, toggleComplete } = useContext(TaskContext);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: task.title, description: task.description || '', dueDate: task.dueDate || '', priority: task.priority });

  function handleToggle() {
    toggleComplete(task.id);
  }

  function handleDelete() {
    if (confirm('Delete this task?')) deleteTask(task.id);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    updateTask({ ...task, title: form.title.trim(), description: form.description.trim(), dueDate: form.dueDate || null, priority: form.priority });
    setEditing(false);
  }

  return (
    <div className={`p-3 border rounded ${task.completed ? 'opacity-70 bg-green-50' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={task.completed} onChange={handleToggle} />
        <div className="flex-1">
          {!editing ? (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`text-lg font-medium ${task.completed ? 'line-through' : ''}`}>{task.title}</h4>
                  <div className="text-sm text-gray-600">{task.description}</div>
                  <div className="text-xs text-gray-500 mt-1">Due: {formatDateForDisplay(task.dueDate)} • Priority: {task.priority}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setEditing(true)} className="px-2 py-1 border rounded text-sm">Edit</button>
                  <button onClick={handleDelete} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-2">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded"></textarea>
              <div className="flex gap-2">
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="p-2 border rounded" />
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="p-2 border rounded">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <button className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
