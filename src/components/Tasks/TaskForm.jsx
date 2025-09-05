// src/components/Tasks/TaskForm.jsx
import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';
import { generateId } from '../../utils/helpers';

export default function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    const newTask = {
      id: generateId(),
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || null,
      priority: form.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    addTask(newTask);
    // clear
    setForm({ title: '', description: '', dueDate: '', priority: 'Medium' });
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Add a Task</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="w-full p-2 border rounded"></textarea>
        <div className="flex gap-2">
          <input name="dueDate" value={form.dueDate} onChange={handleChange} type="date" className="p-2 border rounded" />
          <select name="priority" value={form.priority} onChange={handleChange} className="p-2 border rounded">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
