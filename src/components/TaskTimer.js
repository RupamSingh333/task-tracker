import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiPlay, FiPause, FiRotateCcw, FiCheck, FiTrash2, FiClock, FiCalendar, FiAlignLeft, FiCheckSquare } from "react-icons/fi";

export default function TaskTimer({ mode }) {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [timeSpent, setTimeSpent] = useState({});
  const [timers, setTimers] = useState({});
  const isDark = mode === "dark";

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
      const savedTimeSpent = savedTasks.reduce((acc, task) => {
        acc[task.taskId] = task.timeSpent || 0;
        return acc;
      }, {});
      setTimeSpent(savedTimeSpent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const startTimer = (task) => {
    if (task.status === "completed") return;

    if (timers[task.taskId]) clearInterval(timers[task.taskId]);
    const newTimer = setInterval(() => {
      setTimeSpent((prev) => ({
        ...prev,
        [task.taskId]: (prev[task.taskId] || 0) + 1,
      }));
    }, 1000);

    setTimers((prev) => ({ ...prev, [task.taskId]: newTimer }));
  };

  const pauseTimer = (task) => {
    if (timers[task.taskId]) {
      clearInterval(timers[task.taskId]);
      setTimers((prev) => {
        const updatedTimers = { ...prev };
        delete updatedTimers[task.taskId];
        return updatedTimers;
      });
    }
  };

  const resetTimer = (task) => {
    const confirmReset = window.confirm("Are you sure you want to reset the timer?");
    if (!confirmReset) return;

    setTimeSpent((prev) => ({ ...prev, [task.taskId]: 0 }));
    toast.success("Timer has been reset!");
  };

  const handleAddTask = () => {
    if (!currentTask.trim()) {
      toast.error("Enter a valid task name.");
      return;
    }

    const newTask = {
      taskId: Date.now(),
      name: currentTask,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      timeSpent: 0,
      status: "pending",
      description: "",
    };

    setTasks([newTask, ...tasks]);
    setCurrentTask("");
    toast.success("Task added successfully!");
  };

  const handleCompleteTask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
    if (taskIndex === -1) return;

    pauseTimer(tasks[taskIndex]);

    const description = prompt("Please enter a short description for the completed task:");
    if (description !== null && description.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: "completed",
        description: description.trim(),
        timeSpent: timeSpent[taskId],
      };
      setTasks(updatedTasks);
      toast.success("Task completed successfully!");
    } else {
      toast.error("Task description is required.");
    }
  };

  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const updatedTasks = tasks.filter((task) => task.taskId !== taskId);
    setTasks(updatedTasks);

    if (timers[taskId]) {
      clearInterval(timers[taskId]);
      setTimers((prev) => {
        const updatedTimers = { ...prev };
        delete updatedTimers[taskId];
        return updatedTimers;
      });
    }
    toast.success("Task deleted successfully!");
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalTasks = tasks.length;
  const totalPending = tasks.filter((t) => t.status === "pending").length;
  const totalCompleted = tasks.filter((t) => t.status === "completed").length;
  const productivity = totalTasks ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="premium-card">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="mb-0" style={{
          color: isDark ? "#fff" : "#111",
          fontWeight: "700"
        }}>
          Task Timer
        </h2>
        
        <div className="d-flex gap-3 text-center" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
          <div><div style={{ color: "var(--accent-light)", fontSize: "1.25rem" }}>{totalTasks}</div>Total</div>
          <div><div style={{ color: "#f59e0b", fontSize: "1.25rem" }}>{totalPending}</div>Pending</div>
          <div><div style={{ color: "#10b981", fontSize: "1.25rem" }}>{totalCompleted}</div>Done</div>
          <div><div style={{ color: "#8b5cf6", fontSize: "1.25rem" }}>{productivity}%</div>Prod</div>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="modern-input flex-grow-1"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="What are you working on?"
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button className="modern-btn modern-btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="row g-4 mt-2">
        {tasks.map((task) => {
          const isCompleted = task.status === "completed";
          const isRunning = timers[task.taskId];
          
          return (
            <div key={task.taskId} className="col-12 col-md-6 col-lg-4">
              <div 
                className="premium-card h-100 d-flex flex-column p-3" 
                style={{ 
                  background: isCompleted ? (mode === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)") : undefined,
                  border: isCompleted ? "1px solid rgba(16, 185, 129, 0.3)" : undefined
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold mb-0 text-break" style={{ flex: 1, paddingRight: '10px' }}>{task.name}</h5>
                  {isCompleted && <span className="badge bg-success">Done</span>}
                </div>
                
                <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: "0.85rem", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                  <div className="d-flex align-items-center gap-2">
                    <FiCalendar /> {task.createdAt}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FiClock /> 
                    <span style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "700", 
                      color: isRunning ? "var(--accent-light)" : (mode === "dark" ? "#f8fafc" : "#0f172a"),
                      fontFamily: "monospace"
                    }}>
                      {formatTime(timeSpent[task.taskId])}
                    </span>
                  </div>
                </div>

                <div className="mt-auto d-flex flex-wrap gap-2">
                  {!isCompleted && (
                    <>
                      {isRunning ? (
                        <button className="modern-btn modern-btn-warning btn-sm py-1 px-2" onClick={() => pauseTimer(task)}>
                          <FiPause /> Pause
                        </button>
                      ) : (
                        <button className="modern-btn modern-btn-success btn-sm py-1 px-2" onClick={() => startTimer(task)}>
                          <FiPlay /> Start
                        </button>
                      )}
                      <button className="modern-btn modern-btn-secondary btn-sm py-1 px-2" onClick={() => resetTimer(task)}>
                        <FiRotateCcw />
                      </button>
                      <button className="modern-btn modern-btn-primary btn-sm py-1 px-2 flex-grow-1" onClick={() => handleCompleteTask(task.taskId)}>
                        <FiCheck /> Complete
                      </button>
                    </>
                  )}
                  
                  {isCompleted && task.description && (
                    <div className="w-100 p-2 rounded" style={{ 
                      background: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      fontSize: "0.85rem" 
                    }}>
                      <div className="d-flex align-items-center gap-1 mb-1 fw-bold text-success">
                        <FiAlignLeft /> Note
                      </div>
                      {task.description}
                    </div>
                  )}

                  <button className="modern-btn modern-btn-danger btn-sm py-1 px-2 ms-auto mt-2" onClick={() => handleDeleteTask(task.taskId)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className="col-12 text-center py-5" style={{ color: mode === "dark" ? "#64748b" : "#94a3b8" }}>
            <FiCheckSquare size={48} className="mb-3 opacity-50" />
            <h5>No tasks yet</h5>
            <p>Add a task above to start tracking your time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
