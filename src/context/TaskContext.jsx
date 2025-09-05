import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id, updated) => {
    setTasks(prev => prev.map(t => (t.id === id ? {...t, ...updated} : t)));
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  return (
    <TaskContext.Provider value={{
      tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted
    }}>
      {children}
    </TaskContext.Provider>
  );
}

