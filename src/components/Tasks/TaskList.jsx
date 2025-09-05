// src/components/Tasks/TaskList.jsx
import React, { useContext, useState, useMemo } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all'); // all / completed / pending
  const [sortBy, setSortBy] = useState('created'); // created / due / priority

  const filtered = useMemo(() => {
    let out = tasks;
    if (filter === 'completed') out = out.filter(t => t.completed);
    if (filter === 'pending') out = out.filter(t => !t.completed);

    if (sortBy === 'due') {
      out = [...out].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'priority') {
      const score = p => (p === 'High' ? 1 : p === 'Medium' ? 2 : 3);
      out = [...out].sort((a, b) => score(a.priority) - score(b.priority));
    } else {
      out = [...out].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return out;
  }, [tasks, filter, sortBy]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all' ? 'bg-blue-600 text-white' : 'border'}`}>All</button>
          <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter==='completed' ? 'bg-blue-600 text-white' : 'border'}`}>Completed</button>
          <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded ${filter==='pending' ? 'bg-blue-600 text-white' : 'border'}`}>Pending</button>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm">Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-1 border rounded">
            <option value="created">Newest</option>
            <option value="due">Due date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-6">No tasks to show.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(task => <TaskItem key={task.id} task={task} />)}
        </div>
      )}
    </div>
  );
}
