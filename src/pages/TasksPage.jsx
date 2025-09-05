import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export default function TasksPage() {
  const { user, logout } = useContext(AuthContext);
  const { tasks, addTask, toggleTask, deleteTask, updateTask, clearCompleted } = useContext(TaskContext);
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  if (!user) return null;

  function submit(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask.trim());
    setNewTask("");
  }

  const filtered = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-start p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Welcome, Aishwarya</h1>
          <div className="flex gap-2">
            <button onClick={clearCompleted} className="px-3 py-1 bg-red-500 text-white rounded">Clear Completed</button>
            <button onClick={() => { logout(); navigate("/login"); }} className="px-3 py-1 border rounded">Logout</button>
          </div>
        </div>

        <form onSubmit={submit} className="flex gap-2 mb-4">
          <input value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="New task..." className="flex-1 p-2 border rounded-l"/>
          <button className="px-4 bg-indigo-600 text-white rounded-r">Add</button>
        </form>

        <div className="flex gap-2 mb-4">
          <button onClick={()=>setFilter("all")} className={`px-3 py-1 rounded ${filter==="all"?"bg-indigo-600 text-white":"bg-gray-200"}`}>All</button>
          <button onClick={()=>setFilter("active")} className={`px-3 py-1 rounded ${filter==="active"?"bg-indigo-600 text-white":"bg-gray-200"}`}>Active</button>
          <button onClick={()=>setFilter("completed")} className={`px-3 py-1 rounded ${filter==="completed"?"bg-indigo-600 text-white":"bg-gray-200"}`}>Completed</button>
        </div>

        <ul className="space-y-2">
          {filtered.map(t => (
            <li key={t.id} className="flex items-center justify-between p-2 border rounded">
              {editId === t.id ? (
                <div className="flex-1 flex gap-2">
                  <input className="flex-1 p-1 border rounded" value={editText} onChange={e=>setEditText(e.target.value)} />
                  <button onClick={()=>{ updateTask(t.id, { title: editText }); setEditId(null); }} className="px-2 bg-green-500 text-white rounded">Save</button>
                  <button onClick={()=>setEditId(null)} className="px-2 border rounded">Cancel</button>
                </div>
              ) : (
                <>
                  <span onClick={()=>toggleTask(t.id)} className={`flex-1 cursor-pointer ${t.completed?"line-through text-gray-500":""}`}>{t.title}</span>
                  <div className="flex gap-2">
                    <button onClick={()=>{ setEditId(t.id); setEditText(t.title); }} className="px-2 bg-yellow-500 text-white rounded">Edit</button>
                    <button onClick={()=>deleteTask(t.id)} className="px-2 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}





