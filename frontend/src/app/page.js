"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiStatus, setApiStatus] = useState("loading"); // 'loading', 'healthy', 'error'
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // Fetch all tasks and check api health
  const fetchData = async () => {
    try {
      // 1. Check API Health
      const healthRes = await fetch(`${API_URL}/health`);
      if (healthRes.ok) {
        setApiStatus("healthy");
      } else {
        setApiStatus("error");
      }

      // 2. Fetch Tasks
      const tasksRes = await fetch(`${API_URL}/tasks`);
      if (tasksRes.ok) {
        const data = await tasksRes.json();
        setTasks(data);
      } else {
        throw new Error("Failed to load tasks");
      }
    } catch (err) {
      console.error("Error communicating with backend:", err);
      setApiStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle task creation
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [newTask, ...prev]);
        // Reset form
        setTitle("");
        setDescription("");
        setStatus("pending");
      } else {
        alert("Failed to create task");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to the server");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle status update
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updated : t))
        );
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Task Stats
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const progressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <h1>
            <span>✦</span> Task Manager
          </h1>
          <p>Production Workspace Dashboard</p>
        </div>
        
        <div className="api-status">
          <span 
            className={`status-dot ${apiStatus}`} 
            title={`Backend Status: ${apiStatus}`}
          />
          <span>
            {apiStatus === "healthy" && "API Online"}
            {apiStatus === "loading" && "Connecting..."}
            {apiStatus === "error" && "API Offline"}
          </span>
        </div>
      </header>

      {/* Stats Row */}
      <section className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Pipeline</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value" style={{ color: "var(--color-pending)" }}>
            {pendingTasks}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <span className="stat-value" style={{ color: "var(--color-progress)" }}>
            {progressTasks}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <span className="stat-value" style={{ color: "var(--color-completed)" }}>
            {completedTasks}
          </span>
        </div>
      </section>

      {/* Main Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column: Form */}
        <aside className="glass-panel">
          <h2 className="panel-title">Create Task</h2>
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <label htmlFor="task-title">Title</label>
              <input
                id="task-title"
                type="text"
                className="input-field"
                placeholder="e.g. Code auth system"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="task-desc">Description</label>
              <textarea
                id="task-desc"
                className="input-field"
                placeholder="Detail the task checklist..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={submitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="task-status">Initial Status</label>
              <select
                id="task-status"
                className="input-field"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={submitting}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn" 
              disabled={submitting || !title.trim()}
            >
              {submitting ? "Creating..." : "Add to Dashboard"}
            </button>
          </form>
        </aside>

        {/* Right Column: Task List */}
        <main className="glass-panel">
          <h2 className="panel-title">Pipeline Tasks</h2>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <div className="loading-spinner"></div>
              <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
                Fetching backend services...
              </p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks found</h3>
              <p>Create a task on the left panel to begin mapping your workspace.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div>
                      <h3 className="task-title">{task.title}</h3>
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                    </div>
                    <span className={`badge ${task.status}`}>
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                  
                  <div className="task-footer">
                    <span className="task-date">
                      Added: {new Date(task.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                    
                    <div className="task-actions">
                      <select
                        aria-label="Change status"
                        className="select-status"
                        value={task.status}
                        onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteTask(task.id)}
                        title="Delete Task"
                        aria-label="Delete Task"
                      >
                        {/* Trash Icon SVG */}
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
