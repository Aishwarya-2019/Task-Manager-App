import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    const ok = register(email, password);
    if (ok) nav("/tasks");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded"/>
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded"/>
          <input required type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm password" className="w-full p-2 border rounded"/>
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Register</button>
        </form>
        <p className="mt-3 text-sm">Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  );
}
