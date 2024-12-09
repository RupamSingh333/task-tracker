import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast

export default function TaskTimer({ mode }) {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [timeSpent, setTimeSpent] = useState({});
  const [timers, setTimers] = useState({});

  // Load tasks from localStorage when the component mounts
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

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to start timer for a task
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

  // Function to pause the timer
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

  // Function to reset the timer with confirmation
  const resetTimer = (task) => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the timer?"
    );
    if (!confirmReset) return;

    setTimeSpent((prev) => ({
      ...prev,
      [task.taskId]: 0,
    }));
    toast.success("Timer has been reset!"); // Success toast for reset
  };

  // Add new task with unique taskId
  const handleAddTask = () => {
    if (!currentTask.trim()) {
      toast.error("Enter a valid task name."); // Error toast for invalid task name
      return;
    }

    const newTask = {
      taskId: Date.now(), // Use timestamp as a unique ID
      name: currentTask,
      createdAt: new Date().toLocaleString(),
      timeSpent: 0,
      status: "pending",
      description: "",
    };

    setTasks([newTask, ...tasks]);
    setCurrentTask(""); // Clear the input field after adding the task
    toast.success("Task added successfully!"); // Success toast for adding task
  };

  // Mark task as completed
  const handleCompleteTask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
    if (taskIndex === -1) return;

    pauseTimer(tasks[taskIndex]);

    const description = prompt(
      "Please enter a description for the completed task:"
    );
    if (description !== null && description.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: "completed",
        description: description.trim(),
        timeSpent: timeSpent[taskId], // Assign total time spent
      };
      setTasks(updatedTasks);
      toast.success("Task completed successfully!"); // Success toast for completion
    } else {
      toast.error("Task description is required when marking as completed."); // Error toast for missing description
    }
  };

  // Delete task with confirmation
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
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
    toast.success("Task deleted successfully!"); // Success toast for deletion
  };

  // Calculate task statistics
  const totalTasks = tasks.length;
  const totalPending = tasks.filter((task) => task.status === "pending").length;
  const totalCompleted = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const productivity = totalTasks
    ? ((totalCompleted / totalTasks) * 100).toFixed(2)
    : 0;

  return (
    <div
      className="container my-4"
      style={{
        color: mode === "dark" ? "white" : "black",
        backgroundColor: mode === "dark" ? "#333" : "#fff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 className="text-center mb-4">Task Timer and Tracker</h2>

      <div className="mb-3">
        <label htmlFor="taskInput" className="form-label">
          Add a Task
        </label>
        <input
          type="text"
          className="form-control"
          id="taskInput"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="Enter task name"
        />
        <button className="btn btn-primary mt-2" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* Task Stats */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <strong>Total Tasks: </strong>
          {totalTasks}
        </div>
        <div>
          <strong>Total Pending: </strong>
          {totalPending}
        </div>
        <div>
          <strong>Total Completed: </strong>
          {totalCompleted}
        </div>
        <div>
          <strong>Productivity: </strong>
          {productivity}%
        </div>
      </div>

      <div>
        <h4>All Tasks</h4>
        <div className="row">
          {tasks.map((task, index) => (
            <div key={task.taskId} className="col-md-6 mb-3">
              <div
                className={`card ${
                  task.status === "completed"
                    ? "bg-success text-white"
                    : "bg-warning"
                }`}
                style={{
                  backgroundColor: mode === "dark" ? "#444" : "#fff",
                  color: mode === "dark" ? "white" : "black",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <div className="card-body">
                  <strong>{task.name}</strong>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="text-dark mb-0" style={{ fontSize: "14px" }}>
                      <strong>Created:</strong> {task.createdAt}
                    </p>
                    <p className="text-dark mb-0" style={{ fontSize: "14px" }}>
                      <strong>Time Spent:</strong>{" "}
                      {Math.floor(timeSpent[task.taskId] / 60)}m{" "}
                      {timeSpent[task.taskId] % 60}s
                    </p>
                  </div>

                  {/* Task Controls - Aligned in a single row */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDeleteTask(task.taskId)}
                      >
                        Delete
                      </button>
                      {task.status === "pending" && (
                        <>
                          <button
                            className="btn btn-success btn-sm mx-1"
                            onClick={() => startTimer(task)}
                          >
                            Start
                          </button>
                          <button
                            className="btn btn-warning btn-sm mx-1"
                            onClick={() => pauseTimer(task)}
                          >
                            Pause
                          </button>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => resetTimer(task)}
                          >
                            Reset
                          </button>
                          <button
                            className="btn btn-info btn-sm mx-1"
                            onClick={() => handleCompleteTask(task.taskId)}
                          >
                            Mark as Completed
                          </button>
                        </>
                      )}
                    </div>
                    {task.status === "completed" && (
                      <div>
                        {/* Collapse for completed task details */}
                        <button
                          className="btn btn-light btn-sm"
                          data-bs-toggle="collapse"
                          data-bs-target={`#completedDesc-${task.taskId}`}
                          aria-expanded="false"
                          aria-controls={`completedDesc-${task.taskId}`}
                        >
                          Show Details
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Completed task description - collapsed by default */}
                  {task.status === "completed" && (
                    <div
                      id={`completedDesc-${task.taskId}`}
                      className="collapse mt-2"
                    >
                      <h5>Task Completed</h5>
                      <p>{task.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
